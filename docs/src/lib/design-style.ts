import { createContext } from 'svelte';
import { STYLE_NAMES, DESIGN_STYLES, DEFAULT_STYLE, type StyleName } from 'lily-svelte/styles';

export { STYLE_NAMES, DESIGN_STYLES, DEFAULT_STYLE, type StyleName };
export const [getDesignStyle, setDesignStyle] = createContext<{ current: StyleName }>();
export function isStyle(value: unknown): value is StyleName {
	return STYLE_NAMES.some((style) => style === value);
}
