import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { test } from 'node:test';
import { resolveStyle, scopePreviewCss } from './design-styles.js';
import { rawConfigSchema, DEFAULT_CONFIG } from '../../packages/cli/src/utils/config/schema.js';
import {
	getRegistryUrl,
	resolveRegistryItems
} from '../../packages/cli/src/utils/registry/index.js';
import {
	buildDesignSystemRegion,
	assertDesignSystemStyle,
	updateDesignSystem
} from 'lily-svelte/utils/css';

test('old configs preserve Diamond and new configs validate the style', () => {
	assert.equal(rawConfigSchema.parse({ ...DEFAULT_CONFIG, style: undefined }).style, 'diamond');
	assert.equal(
		rawConfigSchema.parse({ ...DEFAULT_CONFIG, style: 'aquamarine' }).style,
		'aquamarine'
	);
	assert.throws(() => rawConfigSchema.parse({ ...DEFAULT_CONFIG, style: 'typo' }));
});

test('style selection resolves dependencies from the same index', async () => {
	const previous = [process.env.REGISTRY_URL, process.env.COMPONENTS_REGISTRY_URL];
	delete process.env.REGISTRY_URL;
	delete process.env.COMPONENTS_REGISTRY_URL;
	try {
		assert.equal(
			getRegistryUrl({ registry: 'https://example.test/registry' }),
			'https://example.test/registry'
		);
		assert.equal(
			getRegistryUrl({ registry: 'https://example.test/registry/', style: 'aquamarine' }),
			'https://example.test/registry/styles/aquamarine'
		);
		const index = JSON.parse(
			fs.readFileSync('static/registry/styles/aquamarine/index.json', 'utf8')
		);
		const resolved = await resolveRegistryItems({
			registryUrl: 'https://example.test/registry/styles/aquamarine',
			registryIndex: index,
			items: ['button']
		});
		assert.ok(resolved.some((item) => item.name === 'spinner'));
		assert.ok(
			resolved.every((item) => index.some((entry: { name: string }) => entry.name === item.name))
		);
	} finally {
		for (const [key, value] of [
			['REGISTRY_URL', previous[0]],
			['COMPONENTS_REGISTRY_URL', previous[1]]
		]) {
			if (value === undefined) delete process.env[key!];
			else process.env[key!] = value;
		}
	}
});

test('installed sources resolve the selected presentation without runtime markers', () => {
	const read = (style: string) =>
		JSON.parse(
			fs.readFileSync(
				`static/registry/${style === 'diamond' ? '' : `styles/${style}/`}button.json`,
				'utf8'
			)
		).files[0].content as string;
	assert.match(read('diamond'), /h-10 rounded-3xl px-4 text-sm/);
	assert.match(read('aquamarine'), /min-h-\[38px\]/);
	assert.doesNotMatch(read('aquamarine'), / lily-button-/);
	assert.match(read('aquamarine'), /\$UI\$\/spinner/);
	assert.throws(() => resolveStyle("'rounded-full lily-example'", 'aquamarine', {}), /Missing/);
});

test('config-only switches and edited CSS are protected', () => {
	const diamond = buildDesignSystemRegion();
	const aquamarine = buildDesignSystemRegion('aquamarine');
	assert.throws(() => assertDesignSystemStyle(diamond, 'aquamarine'), /Changing the config alone/);
	assert.throws(() => assertDesignSystemStyle(aquamarine, 'diamond'), /Changing the config alone/);
	assert.equal(
		updateDesignSystem(aquamarine.replace('#3182f6', '#123456'), 'aquamarine').status,
		'edited'
	);
});

test('preview base rules cannot affect another document style', () => {
	const css = scopePreviewCss(
		':root { --bg: white } body { color: black } button:active { transform: none }',
		'aquamarine'
	);
	assert.match(css, /:root\[data-lily-style="aquamarine"\] body/);
	assert.match(css, /:root\[data-lily-style="aquamarine"\] button:active/);
	assert.doesNotMatch(css, /(?:^|\})\s*body\s*\{/);
});

test(
	'existing Diamond sources keep their behavior and classes outside the explicit API additions',
	{ skip: !process.env.LILY_BASELINE_REF },
	() => {
		const baseline = process.env.LILY_BASELINE_REF!;
		const root = path.resolve('..');
		const files = execFileSync(
			'git',
			['ls-tree', '-r', '--name-only', baseline, 'docs/src/lib/registry/ui'],
			{ cwd: root, encoding: 'utf8' }
		)
			.trim()
			.split('\n');
		for (const file of files.filter(
			(file) =>
				file.endsWith('.svelte') &&
				!['button/button.svelte', 'input/input.svelte'].some((name) => file.endsWith(name))
		)) {
			const original = execFileSync('git', ['show', `${baseline}:${file}`], {
				cwd: root,
				encoding: 'utf8'
			}).replaceAll('\r\n', '\n');
			const current = fs
				.readFileSync(path.join(root, file), 'utf8')
				.replaceAll('\r\n', '\n')
				.replace(/ lily-[\w-]+/g, '');
			assert.equal(current, original, file);
		}
	}
);

test('preview CSS is generated from current source tokens rather than an earlier CLI bundle', () => {
	const source = fs.readFileSync('../packages/cli/src/aquamarine.css', 'utf8');
	const preview = fs.readFileSync('src/lib/styles/preview-styles.css', 'utf8');
	assert.ok(preview.includes(scopePreviewCss(source, 'aquamarine')));
	assert.match(preview, /--surface-control: rgba\(2,\s*32,\s*71,\s*0\.05\)/);
	assert.match(preview, /--surface-grid: rgba\(0,\s*23,\s*51,\s*0\.02\)/);
});

test('presentation slots survive formatter class sorting', () => {
	for (const source of [
		"'lily-example p-4 gap-2'",
		"'p-4 lily-example gap-2'",
		"'p-4 gap-2 lily-example'"
	]) {
		assert.equal(resolveStyle(source, 'diamond', {}), "'p-4 gap-2'");
		assert.equal(
			resolveStyle(source, 'aquamarine', { 'lily-example': 'p-6 gap-3' }),
			"'p-6 gap-3'"
		);
	}
});

test('presentation resolution leaves unrelated identifiers unchanged', () => {
	for (const style of ['diamond', 'aquamarine'] as const) {
		assert.equal(resolveStyle("'lily-sidebar'", style, {}), "'lily-sidebar'");
		assert.equal(resolveStyle("'lily-empty'", style, { 'lily-empty': '' }), "''");
	}
});
