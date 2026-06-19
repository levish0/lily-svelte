import { json } from '@sveltejs/kit';

export const prerender = true;

/**
 * The `lily init` command fetches this base item from the registry root (`/init`).
 * It carries the base npm dependencies and the shared `utils` registry dependency.
 * The lily design system itself is written straight into the user's stylesheet by
 * the CLI (so they own and can edit every token) — single style, no presets.
 */
export function GET() {
	return json({
		name: 'lily',
		type: 'registry:base',
		devDependencies: ['tw-animate-css'],
		registryDependencies: ['utils'],
		css: {
			'@import "tw-animate-css"': {}
		}
	});
}
