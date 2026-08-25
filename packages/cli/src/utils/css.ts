import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

/** Opening marker of the region the CLI manages inside the user's stylesheet. */
export const LILY_CSS_MARKER = '/* lily design system';
/** Closing marker. Absent in stylesheets written before managed regions existed. */
export const LILY_CSS_END_MARKER = '/* end lily design system */';

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
	const found = findAlongside('tailwind.css');
	if (found) return fs.readFileSync(found, 'utf8');
	throw new Error('lily: could not locate the design system (tailwind.css).');
}

/**
 * Looks for a file next to this module, then one and two levels up. The executing
 * module sits at the dist root when bundled and in `src/utils` in development, so
 * neither layout can be assumed.
 */
function findAlongside(name: string): string | undefined {
	const dir = fileURLToPath(new URL('.', import.meta.url));
	for (const rel of [name, `../${name}`, `../../${name}`]) {
		const candidate = path.resolve(dir, rel);
		if (fs.existsSync(candidate)) return candidate;
	}
}

/** The CLI's own version, stamped into the marker so a stylesheet says what wrote it. */
function cliVersion(): string {
	const packageJson = findAlongside('package.json');
	if (!packageJson) return '0.0.0';
	try {
		return JSON.parse(fs.readFileSync(packageJson, 'utf8')).version ?? '0.0.0';
	} catch {
		return '0.0.0';
	}
}

/**
 * Digest of the region's body, stamped into the opening marker. Comparing it against
 * the body actually on disk is what tells an untouched region (safe to replace) apart
 * from one the user has edited (theirs to keep).
 */
function fingerprint(body: string): string {
	return crypto.createHash('sha256').update(body.trim()).digest('hex');
}

/** The design system wrapped in its markers, ready to drop into a stylesheet. */
export function buildDesignSystemRegion(): string {
	const body = getDesignSystemCss()
		// the shipped file opens with its own marker line; the wrapper replaces it
		.replace(/^\/\* lily design system[^\n]*\n/, '')
		.trim();
	const version = cliVersion();

	return [
		`${LILY_CSS_MARKER} v${version} — managed by the lily CLI; yours to edit.`,
		`   Edit freely: \`lily update\` leaves an edited region alone and shows you what changed.`,
		`   ${fingerprint(body)} */`,
		body,
		LILY_CSS_END_MARKER
	].join('\n');
}

export type DesignSystemRegion = {
	start: number;
	end: number;
	/** The region including both markers. */
	text: string;
	/** Just the CSS between the markers. */
	body: string;
	/** Digest recorded when the CLI wrote it, if the region carries one. */
	recordedHash?: string;
	/** True when the body still matches the digest — i.e. nobody has edited it. */
	pristine: boolean;
};

/** Locates the managed region, tolerating stylesheets written before it had an end marker. */
export function findDesignSystemRegion(cssSource: string): DesignSystemRegion | undefined {
	const start = cssSource.indexOf(LILY_CSS_MARKER);
	if (start === -1) return;

	const endMarkerAt = cssSource.indexOf(LILY_CSS_END_MARKER, start);
	// Before end markers existed the CLI appended to the end of the file, so an
	// unterminated region runs to EOF.
	const end = endMarkerAt === -1 ? cssSource.length : endMarkerAt + LILY_CSS_END_MARKER.length;

	const text = cssSource.slice(start, end);
	const headerEnd = text.indexOf('*/');
	const header = headerEnd === -1 ? '' : text.slice(0, headerEnd);
	const body = text
		.slice(
			headerEnd === -1 ? 0 : headerEnd + 2,
			endMarkerAt === -1 ? undefined : -LILY_CSS_END_MARKER.length
		)
		.trim();

	const recordedHash = header.match(/\b([0-9a-f]{64})\b/)?.[1];

	return {
		start,
		end,
		text,
		body,
		recordedHash,
		// No digest means the block predates the marker format, which only ever held the CLI's
		// own output — so it is replaceable, same as one whose digest still matches.
		pristine: recordedHash === undefined || recordedHash === fingerprint(body)
	};
}

/** Append the lily design system to the user's stylesheet, once. */
export function ensureDesignSystem(cssSource: string): string {
	if (findDesignSystemRegion(cssSource)) return cssSource;
	return `${cssSource.trimEnd()}\n\n${buildDesignSystemRegion()}\n`;
}

export type DesignSystemUpdate =
	| { status: 'added'; css: string }
	| { status: 'unchanged'; css: string }
	| { status: 'updated'; css: string }
	/** The recorded digest no longer matches: the user has edited the block. */
	| { status: 'edited'; css: string; current: string; next: string };

/**
 * Bring the managed region up to this CLI's design system.
 *
 * A region the user has edited is never overwritten — the caller gets both versions
 * back so it can show the difference and let the user decide.
 */
export function updateDesignSystem(cssSource: string): DesignSystemUpdate {
	const region = findDesignSystemRegion(cssSource);
	const next = buildDesignSystemRegion();

	if (!region) {
		return { status: 'added', css: `${cssSource.trimEnd()}\n\n${next}\n` };
	}

	const replaced = cssSource.slice(0, region.start) + next + cssSource.slice(region.end);

	// an unterminated region swallowed everything to EOF, so rewriting it is also what
	// gives it an end marker — worth doing even when the body has not changed
	if (region.pristine && region.body === extractBody(next)) {
		return region.text.includes(LILY_CSS_END_MARKER)
			? { status: 'unchanged', css: cssSource }
			: { status: 'updated', css: replaced };
	}

	if (!region.pristine) {
		return { status: 'edited', css: cssSource, current: region.body, next: extractBody(next) };
	}

	return { status: 'updated', css: replaced };
}

function extractBody(region: string): string {
	const headerEnd = region.indexOf('*/');
	return region.slice(headerEnd + 2, region.length - LILY_CSS_END_MARKER.length).trim();
}
