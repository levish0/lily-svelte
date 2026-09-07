import fs from 'node:fs';
import path from 'node:path';
import { STYLE_NAMES, type StyleName } from '../../packages/cli/src/styles.js';
import { getDesignSystemCss } from '../../packages/cli/src/utils/css.js';
import postcss from 'postcss';

const sourceRoot = path.resolve('src/lib/registry');
export const generatedRoot = path.resolve('src/lib/registry-styles');

/** Resolve named presentation slots at build time. Installed components have no style engine. */
export function resolveStyle(
	source: string,
	style: StyleName,
	definitions: Record<string, string>,
	knownSlots: ReadonlySet<string> = new Set(Object.keys(definitions))
) {
	return source.replace(
		/(['"])([^\n'"`]*\blily-[\w-]+[^\n'"`]*)\1/g,
		(match, quote, classes: string) => {
			const slot = classes.split(/\s+/).find((token) => /^lily-[\w-]+$/.test(token));
			if (!slot || (classes.trim() === slot && !knownSlots.has(slot))) return match;
			const diamond = classes
				.split(/\s+/)
				.filter((token) => token && token !== slot)
				.join(' ');
			if (style === 'diamond') return `${quote}${diamond}${quote}`;
			if (!(slot in definitions)) throw new Error(`Missing ${style} presentation slot: ${slot}`);
			return `${quote}${definitions[slot]}${quote}`;
		}
	);
}

/** Shared behavior, per-style presentation, optional source overrides for real structural differences. */
function writeIfChanged(file: string, content: string) {
	if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== content)
		fs.writeFileSync(file, content);
}

export function buildStyleSources() {
	const knownSlots = new Set<string>();
	for (const name of STYLE_NAMES) {
		const directory = path.join(sourceRoot, 'styles', name);
		if (!fs.existsSync(directory)) continue;
		for (const file of fs.readdirSync(directory).filter((file) => file.endsWith('.json'))) {
			for (const key of Object.keys(
				JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8'))
			))
				knownSlots.add(key);
		}
	}

	// Remove retired generated styles so renamed styles cannot remain routable.
	for (const parent of [generatedRoot, path.resolve('static/registry/styles')]) {
		if (!fs.existsSync(parent)) continue;
		for (const entry of fs.readdirSync(parent, { withFileTypes: true })) {
			if (!entry.isDirectory() || STYLE_NAMES.some((name) => name === entry.name)) continue;
			const retired = path.resolve(parent, entry.name);
			if (path.dirname(retired) !== parent) throw new Error('Invalid generated style directory');
			fs.rmSync(retired, { recursive: true, force: true });
		}
	}
	const previewCss: string[] = [];
	const presentations: Record<string, { source: string; styles: Record<string, string> }> = {};
	for (const style of STYLE_NAMES) {
		previewCss.push(scopePreviewCss(getDesignSystemCss(style), style));
		const root = path.join(generatedRoot, style);
		const outputs = new Set<string>();
		const definitions: Record<string, string> = {};
		const definitionRoot = path.join(sourceRoot, 'styles', style);
		if (fs.existsSync(definitionRoot)) {
			for (const file of fs.readdirSync(definitionRoot).filter((file) => file.endsWith('.json'))) {
				Object.assign(
					definitions,
					JSON.parse(fs.readFileSync(path.join(definitionRoot, file), 'utf8'))
				);
			}
		}
		for (const group of ['ui', 'lib', 'hooks', 'examples', 'blocks']) {
			const shared = path.join(sourceRoot, group);
			if (!fs.existsSync(shared)) continue;
			for (const file of fs.readdirSync(shared, { recursive: true, withFileTypes: true })) {
				if (!file.isFile()) continue;
				const original = path.join(file.parentPath, file.name);
				const relative = path.relative(sourceRoot, original);
				const override = path.join(definitionRoot, 'sources', relative);
				const input = fs.existsSync(override) ? override : original;
				const output = path.join(root, relative);
				outputs.add(path.resolve(output));
				fs.mkdirSync(path.dirname(output), { recursive: true });
				const content = fs.readFileSync(input, 'utf8');
				for (const match of content.matchAll(/(['"])([^\n'"`]*\blily-[\w-]+[^\n'"`]*)\1/g)) {
					const classes = match[2];
					const slot = classes.split(/\s+/).find((token) => /^lily-[\w-]+$/.test(token));
					if (!slot || (classes.trim() === slot && !knownSlots.has(slot))) continue;
					const original = classes
						.split(/\s+/)
						.filter((token) => token && token !== slot)
						.join(' ');
					const entry = (presentations[slot] ??= { source: classes, styles: {} });
					entry.styles[style] = style === 'diamond' ? original : definitions[slot];
				}
				const resolved = resolveStyle(content, style, definitions, knownSlots).replaceAll(
					'$lib/registry/',
					`$lib/registry-styles/${style}/`
				);
				writeIfChanged(output, resolved);
			}
		}
		// Removed or moved examples must not remain available through generated routes.
		for (const file of fs.readdirSync(root, { recursive: true, withFileTypes: true })) {
			if (!file.isFile()) continue;
			const output = path.resolve(file.parentPath, file.name);
			const relative = path.relative(root, output);
			if (relative.startsWith('..') || path.isAbsolute(relative))
				throw new Error('Invalid generated file path');
			if (!outputs.has(output)) fs.unlinkSync(output);
		}
		for (const file of fs.readdirSync(root, { recursive: true, withFileTypes: true }).reverse()) {
			if (!file.isDirectory()) continue;
			const directory = path.resolve(file.parentPath, file.name);
			const relative = path.relative(root, directory);
			if (relative.startsWith('..') || path.isAbsolute(relative))
				throw new Error('Invalid generated directory');
			if (fs.readdirSync(directory).length === 0) fs.rmdirSync(directory);
		}
	}
	writeIfChanged(path.resolve('src/lib/styles/preview-styles.css'), previewCss.join('\n'));
	writeIfChanged(
		path.resolve('src/lib/styles/preview-presentations.json'),
		JSON.stringify(presentations)
	);
}

/** Keep document-level rules inside their preview document, including portal content. */
export function scopePreviewCss(css: string, style: StyleName): string {
	const root = postcss.parse(css);
	const scopes =
		style === 'diamond'
			? [':root:not([data-lily-style])', ':root[data-lily-style="diamond"]']
			: [`:root[data-lily-style="${style}"]`];
	root.walkRules((rule) => {
		let parent = rule.parent;
		while (parent) {
			if (
				parent.type === 'atrule' &&
				['keyframes', 'theme', 'custom-variant', 'utility'].includes(parent.name)
			)
				return;
			parent = parent.parent;
		}
		rule.selectors = rule.selectors.flatMap((selector) =>
			scopes.map((scope) =>
				selector.includes(':root')
					? selector.replaceAll(':root', scope)
					: selector === 'html'
						? scope
						: `${scope} ${selector}`
			)
		);
	});
	return root.toString();
}
