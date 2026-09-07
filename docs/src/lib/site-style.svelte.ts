import { DEFAULT_STYLE, type StyleName } from 'lily-svelte/styles';
import presentations from './styles/preview-presentations.json';

// Document-local preview state. Only the browser layout changes it; SSR keeps Diamond.
// Installed components use registry/lib/utils instead of this documentation helper.
export const siteStyle = $state<{ current: StyleName }>({ current: DEFAULT_STYLE });

const slots: Record<string, { source: string; styles: Record<string, string> }> = presentations;

export function resolveSiteClasses(classes: string): string {
	const style = siteStyle.current;
	let resolved = classes;
	for (const [slot] of classes.matchAll(/\blily-[\w-]+\b/g)) {
		const entry = slots[slot];
		if (!entry) throw new Error(`Unknown presentation slot: ${slot}`);
		resolved = resolved.replace(entry.source, entry.styles[style]);
	}
	return resolved;
}
