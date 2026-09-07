/** Register a design here; its registry is built from shared sources plus style definitions. */
export const STYLE_NAMES = ['diamond', 'aquamarine'] as const;
export type StyleName = (typeof STYLE_NAMES)[number];
export const DESIGN_STYLES = {
	diamond: { label: 'Diamond', description: 'Original Lily: monochrome, rounded controls' },
	aquamarine: {
		label: 'Aquamarine',
		description: 'Soft surfaces, blue actions, mobile proportions'
	}
} satisfies Record<StyleName, { label: string; description: string }>;
export const DEFAULT_STYLE: StyleName = 'diamond';
