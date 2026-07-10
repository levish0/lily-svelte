import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { EntryGenerator, PageLoad } from './$types.js';
import { blocks } from '../../../../__registry__/blocks.js';
import { blockMeta } from '$lib/registry/registry-block-meta.js';

export const prerender = true;

export const entries: EntryGenerator = () => blocks.map((view: string) => ({ view }));

export const load: PageLoad = async ({ params }) => {
	if (!blocks.includes(params.view)) error(404, 'Block not found');

	// Single-file blocks (chart-*) live directly in blocks/; the rest are folders.
	const comp: { default: Component } = params.view.startsWith('chart-')
		? await import(`../../../../lib/registry/blocks/${params.view}.svelte`)
		: await import(`../../../../lib/registry/blocks/${params.view}/+page.svelte`);

	const meta = blockMeta[params.view];

	return { component: comp.default, meta: { ...meta, name: params.view } };
};
