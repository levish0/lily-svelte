import Sugar from './password.svelte';
import Root from './password-root.svelte';
import Input from './password-input.svelte';
import ToggleVisibility from './password-toggle-visibility.svelte';
import Strength from './password-strength.svelte';

export {
	PASSWORD_STRENGTH_LABELS,
	PASSWORD_STRENGTH_COLORS,
	type PasswordScore
} from './password.svelte.js';

export {
	Sugar as Password,
	Root,
	Input,
	ToggleVisibility,
	Strength,
	//
	Root as PasswordRoot,
	Input as PasswordInput,
	ToggleVisibility as PasswordToggleVisibility,
	Strength as PasswordStrength
};

export type { PasswordProps } from './password.svelte';
export type { PasswordRootProps } from './password-root.svelte';
export type { PasswordStrengthProps } from './password-strength.svelte';
