// @ts-nocheck
import { readFileSync } from 'node:fs';
import process from 'node:process';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from '@prettier/sync';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { u } from 'unist-builder';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { defineConfig } from 'mdsx';
import { Index } from './src/__registry__/index.js';

/** @type {import('prettier').Config} */
const codeBlockPrettierConfig = {
	useTabs: false,
	tabWidth: 2,
	singleQuote: false,
	trailingComma: 'none',
	printWidth: 80,
	endOfLine: 'lf',
	parser: 'svelte',
	plugins: ['prettier-plugin-svelte'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
	bracketSameLine: false
};

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const jsEngine = createJavaScriptRegexEngine();

export async function createHighlighter() {
	if (!globalThis.__shikiHighlighter) {
		globalThis.__shikiHighlighter = await createHighlighterCore({
			themes: [
				import('@shikijs/themes/github-dark'),
				import('@shikijs/themes/github-light-default')
			],
			langs: [
				import('@shikijs/langs/typescript'),
				import('@shikijs/langs/svelte'),
				import('@shikijs/langs/css'),
				import('@shikijs/langs/json'),
				import('@shikijs/langs/bash')
			],
			engine: jsEngine
		});
	}
	return globalThis.__shikiHighlighter;
}

/**
 * @typedef {import('mdast').Root} MdastRoot
 * @typedef {import('hast').Root} HastRoot
 * @typedef {import('unified').Transformer<HastRoot, HastRoot>} HastTransformer
 * @typedef {import('unified').Transformer<MdastRoot, MdastRoot>} MdastTransformer
 */

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
	theme: { dark: 'github-dark', light: 'github-light-default' },
	keepBackground: false,
	// @ts-expect-error - shh
	getHighlighter: createHighlighter,
	onVisitLine(node) {
		if (node.children.length === 0) {
			node.children = [{ type: 'text', value: ' ' }];
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className = ['line--highlighted'];
	},
	onVisitHighlightedChars(node) {
		node.properties.className = ['chars--highlighted'];
	}
};

export const mdsxConfig = defineConfig({
	extensions: ['.md'],
	remarkPlugins: [remarkGfm, remarkRemovePrettierIgnore],
	rehypePlugins: [
		rehypeSlug,
		rehypeComponentExample,
		rehypePreData,
		[rehypePrettyCode, prettyCodeOptions],
		rehypeHandleMetadata
	],
	blueprints: {
		default: {
			path: resolve(__dirname, './src/lib/components/mdsx/blueprint.svelte')
		}
	}
});

/**
 * Removes `<!-- prettier-ignore -->` and `// prettier-ignore` from code blocks
 * before they are converted to HTML for syntax highlighting.
 * @returns {MdastTransformer}
 */
function remarkRemovePrettierIgnore() {
	return async (tree) => {
		visit(tree, 'code', (node) => {
			node.value = node.value
				.replaceAll('<!-- prettier-ignore -->\n', '')
				.replaceAll('// prettier-ignore\n', '');
		});
	};
}

/** @returns {HastTransformer} */
function rehypePreData() {
	return (tree) => {
		visit(tree, (node) => {
			if (node?.type === 'element' && node?.tagName === 'pre') {
				const [codeEl] = node.children;
				if (codeEl.type !== 'element') return;
				if (codeEl.tagName !== 'code') return;

				if (
					codeEl.data &&
					'meta' in codeEl.data &&
					codeEl.data.meta &&
					typeof codeEl.data.meta === 'string'
				) {
					const regex = /event="([^"]*)"/;
					const match = codeEl.data?.meta.match(regex);
					if (match) {
						// @ts-expect-error - this is fine
						node.__event__ = match ? match[1] : null;
						codeEl.data.meta = codeEl.data.meta.replace(regex, '');
					}
				}

				// @ts-expect-error - this is fine
				node.__rawString__ = codeEl.children?.[0].value;
				// @ts-expect-error - this is fine
				node.__src__ = node.properties?.__src__;
				// @ts-expect-error - this is fine
				node.__style__ = node.properties?.__style__;
			}
		});
	};
}

/** @returns {HastTransformer} */
export function rehypeComponentExample() {
	return (tree) => {
		const nameRegex = /name="([^"]+)"/;
		const titleRegex = /title="([^"]+)"/;
		visit(tree, (node, index, parent) => {
			if (node?.type === 'raw' && node?.value?.startsWith('<ComponentSource')) {
				const match = node.value.match(nameRegex);
				const name = match ? match[1] : null;
				const titleMatch = node.value.match(titleRegex);
				const title = titleMatch ? titleMatch[1] : null;

				if (!name) return null;

				try {
					// @ts-expect-error - this is fine
					const component = Index[name];
					if (!component) return;

					const files = component.files;
					if (!files) return;
					const src = files[0]?.replace('/lib/', '/src/lib/');

					let sourceCode = getComponentSourceFileContent(src);
					if (!sourceCode || sourceCode === null) return;

					sourceCode = sourceCode.replaceAll('$lib/registry/', '$lib/components/');

					const meta = title
						? { meta: `title="${title}" showLineNumbers` }
						: { meta: `showLineNumbers` };

					const sourceCodeNode = u('element', {
						tagName: 'pre',
						properties: { __src__: src, className: ['code'] },
						children: [
							u('element', {
								tagName: 'code',
								properties: { className: [`language-svelte`] },
								attributes: {},
								data: meta,
								children: [{ type: 'text', value: sourceCode.replace(/^\n+/, '') }]
							})
						]
					});
					if (!index) return;
					// @ts-expect-error - this is fine
					parent?.children.splice(index + 1, 0, sourceCodeNode);
				} catch (e) {
					console.error(e);
				}
			}
		});
	};
}

/**
 * Adds `data-metadata` to `<figure>` elements that contain a `<figcaption>`.
 * @returns {HastTransformer}
 */
function rehypeHandleMetadata() {
	return async (tree) => {
		visit(tree, (node) => {
			if (node?.type === 'element' && node?.tagName === 'figure') {
				if (!('data-rehype-pretty-code-figure' in node.properties)) return;

				const preElement = node.children.at(-1);
				if (preElement && 'tagName' in preElement && preElement.tagName !== 'pre') {
					return;
				}

				const firstChild = node.children.at(0);

				if (firstChild && 'tagName' in firstChild && firstChild.tagName === 'figcaption') {
					node.properties['data-metadata'] = '';
					const lastChild = node.children.at(-1);
					if (lastChild && 'properties' in lastChild) {
						lastChild.properties['data-metadata'] = '';
					}
				}
			}
		});
	};
}

function getComponentSourceFileContent(src = '') {
	const newSrc = src.replace('../', './');
	if (!newSrc) return null;

	const filePath = join(process.cwd(), newSrc);

	const formattedSource = prettier.format(
		readFileSync(filePath, 'utf-8'),
		/** @type {any} */ (codeBlockPrettierConfig)
	);

	return formattedSource.trim();
}
