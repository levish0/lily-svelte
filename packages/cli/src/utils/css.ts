import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Marker comment at the top of the inlined design system (used for idempotency). */
export const LILY_CSS_MARKER = '/* lily design system';

export function createGlobalCssFile(): string {
	return `
@import "tailwindcss";
`;
}

/**
 * The full lily design system, read from the CSS shipped alongside this CLI
 * (`dist/tailwind.css`). Unlike shadcn's `@import "<pkg>/tailwind.css"`, lily
 * writes this straight into the user's stylesheet so they fully own and can
 * edit every token.
 */
export function getDesignSystemCss(): string {
	const dir = fileURLToPath(new URL('.', import.meta.url));
	// Robust across the bundle (dist/tailwind.css) and dev (src/tailwind.css):
	// the executing module can sit at the dist root or in a nested folder.
	for (const rel of ['tailwind.css', '../tailwind.css', '../../tailwind.css']) {
		const candidate = path.resolve(dir, rel);
		if (fs.existsSync(candidate)) return fs.readFileSync(candidate, 'utf8');
	}
	throw new Error('lily: could not locate the design system (tailwind.css).');
}

/** Append the lily design system to the user's stylesheet, once. */
export function ensureDesignSystem(cssSource: string): string {
	if (cssSource.includes(LILY_CSS_MARKER)) return cssSource;
	return `${cssSource.trimEnd()}\n\n${getDesignSystemCss().trimStart()}\n`;
}
