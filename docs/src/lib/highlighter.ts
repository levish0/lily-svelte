import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

let promise: Promise<HighlighterCore> | undefined;

/**
 * A tiny client-side shiki highlighter (bash only) using the same github
 * themes as the build-time code blocks, so dynamic commands match exactly.
 */
export function getHighlighter(): Promise<HighlighterCore> {
	if (!promise) {
		promise = createHighlighterCore({
			themes: [
				import('@shikijs/themes/github-dark'),
				import('@shikijs/themes/github-light-default')
			],
			langs: [import('@shikijs/langs/bash')],
			engine: createJavaScriptRegexEngine()
		});
	}
	return promise;
}
