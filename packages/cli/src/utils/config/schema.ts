// !! BROWSER SAFE !!

import { z } from 'zod';
import { SITE_BASE_URL } from '../../constants.js';
import { keys } from '../utils.js';
import { iconLibraries } from '../../icons/libraries.js';

export const ICON_LIBRARIES = keys(iconLibraries);

export const BASE_COLORS = ['neutral', 'stone', 'zinc', 'mauve', 'olive', 'mist', 'taupe'] as const;
export type BaseColorName = (typeof BASE_COLORS)[number];
export const THEMES = [
	'neutral',
	'stone',
	'zinc',
	'amber',
	'blue',
	'cyan',
	'emerald',
	'fuchsia',
	'green',
	'indigo',
	'lime',
	'orange',
	'pink',
	'purple',
	'red',
	'rose',
	'sky',
	'teal',
	'violet',
	'yellow',
	'mauve',
	'olive',
	'mist',
	'taupe'
] as const;
export type ThemeName = (typeof THEMES)[number];
export const MENU_ACCENTS = ['subtle', 'bold'] as const;
export type MenuAccent = (typeof MENU_ACCENTS)[number];
export const MENU_COLORS = [
	'default',
	'inverted',
	'default-translucent',
	'inverted-translucent'
] as const;
export type MenuColor = (typeof MENU_COLORS)[number];

export const DEFAULT_CONFIG = {
	$schema: `${SITE_BASE_URL}/schema.json`,
	aliases: {
		lib: '$lib',
		utils: '$lib/utils',
		hooks: '$lib/hooks',
		components: '$lib/components',
		ui: '$lib/components/ui'
	},
	tailwind: {
		baseColor: 'slate',
		css: 'src/app.css'
	},
	typescript: true,
	registry: `${SITE_BASE_URL}/registry`,
	iconLibrary: 'lucide',
	menuColor: 'default',
	menuAccent: 'subtle'
} as const;

export const stripTrailingSlash = (s: string) => (s.endsWith('/') ? s.slice(0, -1) : s);

const aliasSchema = (alias: string) => z.string(`Missing aliases.${alias} alias`);

const baseConfigSchema = z.object({
	$schema: z.string().optional(),
	tailwind: z.object(
		{
			css: z.string(`Missing tailwind.css path`),
			baseColor: z.string(`Missing tailwind.baseColor field`)
		},
		`Missing tailwind object`
	),
	aliases: z.object(
		{
			components: aliasSchema('components'),
			utils: aliasSchema('utils')
		},
		`Missing aliases object`
	),
	typescript: z
		.union(
			[
				z.boolean(),
				z.object({
					// config: z.string(`Missing path to ${color.bold("tsconfig/jsconfig")}`),
					// Not sure why, but I can't get the above error msg to appear during zod parsing
					// when `typescript` is set to an empty object: `"typescript": {}`
					// Possibly a zod bug with unions?
					config: z.string()
				})
			],
			`Invalid typescript field. Must either be 'true', 'false', or '{ "config": "path/to/tsconfig.json" }'`
		)
		.default(DEFAULT_CONFIG.typescript)
});

const originalConfigSchema = baseConfigSchema;

export const newConfigSchema = baseConfigSchema.extend({
	aliases: baseConfigSchema.shape.aliases.extend({
		ui: aliasSchema('ui').default(DEFAULT_CONFIG.aliases.ui),
		hooks: aliasSchema('hooks').default(DEFAULT_CONFIG.aliases.hooks),
		lib: aliasSchema('lib').default(DEFAULT_CONFIG.aliases.lib)
	}),
	registry: z.string().default(DEFAULT_CONFIG.registry),
	// design system
	iconLibrary: z.enum(ICON_LIBRARIES).optional(),
	menuColor: z.enum(MENU_COLORS).optional(),
	menuAccent: z.enum(MENU_ACCENTS).optional()
});

export type RawConfig = z.infer<typeof rawConfigSchema>;
// combines the old with the new
export const rawConfigSchema = z.object({
	...originalConfigSchema.shape,
	...newConfigSchema.shape,
	aliases: z.object({
		...originalConfigSchema.shape.aliases.shape,
		...newConfigSchema.shape.aliases.shape
	})
});

export type ResolvedConfig = z.infer<typeof resolvedConfigSchema>;
export const resolvedConfigSchema = rawConfigSchema.extend({
	sveltekit: z.boolean(),
	resolvedPaths: z.object({
		cwd: z.string(),
		tailwindCss: z.string(),
		utils: z.string(),
		components: z.string(),
		hooks: z.string(),
		ui: z.string(),
		lib: z.string()
	}),
	iconLibrary: z.enum(ICON_LIBRARIES).default(DEFAULT_CONFIG.iconLibrary),
	menuColor: z.enum(MENU_COLORS).default(DEFAULT_CONFIG.menuColor),
	menuAccent: z.enum(MENU_ACCENTS).default(DEFAULT_CONFIG.menuAccent)
});
