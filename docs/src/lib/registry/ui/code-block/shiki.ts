import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

/** Languages available to `<CodeBlock>` — add or remove entries to fit your app. */
const langs = [
	() => import('@shikijs/langs/javascript'),
	() => import('@shikijs/langs/typescript'),
	() => import('@shikijs/langs/svelte'),
	() => import('@shikijs/langs/html'),
	() => import('@shikijs/langs/css'),
	() => import('@shikijs/langs/json'),
	() => import('@shikijs/langs/bash')
];

let promise: Promise<HighlighterCore> | undefined;

/**
 * Lazy shared shiki highlighter for `<CodeBlock>` — fine-grained language and
 * theme imports with the JS regex engine, so only what's listed here ends up
 * in the bundle (and only once, no matter how many code blocks render).
 */
export function getHighlighter(): Promise<HighlighterCore> {
	if (!promise) {
		promise = createHighlighterCore({
			themes: [
				() => import('@shikijs/themes/github-light-default'),
				() => import('@shikijs/themes/github-dark')
			],
			langs,
			engine: createJavaScriptRegexEngine()
		});
	}
	return promise;
}
