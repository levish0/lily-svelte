// !! BROWSER SAFE !!

export const SITE_BASE_URL = 'https://lily-svelte.pages.dev';
export const OFFICIAL_REGISTRY_URL = `${SITE_BASE_URL}/registry`;

export const ALIASES = ['components', 'ui', 'hooks', 'utils', 'lib'] as const;

export const ALIAS_DEFAULTS = ALIASES.reduce(
	(acc, a) => {
		acc[a] = {
			placeholder: `$${a.toUpperCase()}$`,
			defaultPath: a === 'utils' ? '$lib/utils' : `$lib/registry/${a}`
		};
		return acc;
	},
	{} as Record<(typeof ALIASES)[number], { placeholder: string; defaultPath: string }>
);
