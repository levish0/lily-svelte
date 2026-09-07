import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import { isStyle } from '$lib/design-style';
import type { PageLoad } from './$types';

const examples = import.meta.glob<{ default: Component }>([
	'/src/lib/registry-styles/*/examples/*.svelte',
	'/src/lib/registry-styles/*/blocks/*.svelte',
	'/src/lib/registry-styles/*/blocks/*/+page.svelte'
]);
export const prerender = false;
export const load: PageLoad = async ({ params }) => {
	if (!isStyle(params.style)) error(404, 'Unknown design style');
	const base = `/src/lib/registry-styles/${params.style}`;
	const loader =
		examples[`${base}/examples/${params.name}.svelte`] ??
		examples[`${base}/blocks/${params.name}.svelte`] ??
		examples[`${base}/blocks/${params.name}/+page.svelte`];
	if (!loader) error(404, 'Unknown component example');
	return { component: (await loader()).default, style: params.style, name: params.name };
};
