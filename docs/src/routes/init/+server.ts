import { json } from '@sveltejs/kit';

export const prerender = true;

/**
 * The `lily init` command fetches this base item from the registry root (`/init`).
 * It carries the lily design system (`@import "lily/tailwind.css"`), the base
 * npm dependencies, and the shared `utils` registry dependency. Single style —
 * no presets, no base-color palette generation.
 */
export function GET() {
	return json({
		name: 'lily',
		type: 'registry:base',
		devDependencies: ['lily@latest'],
		registryDependencies: ['utils'],
		css: {
			'@import "lily/tailwind.css"': {}
		}
	});
}
