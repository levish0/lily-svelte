import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

const highlightCodeCache = new Map<string, string>();

const highlighterPromise = createHighlighterCore({
	themes: [import('@shikijs/themes/github-dark'), import('@shikijs/themes/github-light-default')],
	langs: [
		import('@shikijs/langs/typescript'),
		import('@shikijs/langs/svelte'),
		import('@shikijs/langs/json')
	],
	engine: createJavaScriptRegexEngine()
});

/**
 * Server-side (prerender) highlighter for block source files.
 * Emits `--shiki-light`/`--shiki-dark` vars (`defaultColor: false`) so the
 * output plugs into the same `.code-block` dual-theme CSS as mdsx code blocks.
 */
export async function highlightCode(code: string, language = 'svelte'): Promise<string> {
	const cacheKey = `${language}:${code}`;
	const cached = highlightCodeCache.get(cacheKey);
	if (cached) return cached;

	const highlighter = await highlighterPromise;

	const html = highlighter.codeToHtml(code.replace(/\t/g, '  '), {
		lang: language,
		themes: {
			dark: 'github-dark',
			light: 'github-light-default'
		},
		defaultColor: false
	});

	highlightCodeCache.set(cacheKey, html);

	return html;
}
