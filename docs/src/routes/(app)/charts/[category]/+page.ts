import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { EntryGenerator, PageLoad } from './$types.js';
import type { HighlightedBlock } from '../../../api/block/[block]/+server.js';
import { blocks } from '../../../../__registry__/blocks.js';
import { chartCategories } from '$lib/registry/registry-categories.js';

export const prerender = true;

export const entries: EntryGenerator = () =>
	chartCategories.filter((c) => !c.hidden).map((c) => ({ category: c.slug }));

const modules = import.meta.glob<{ default: Component }>(
	'../../../../lib/registry/blocks/chart-*.svelte',
	{ eager: true }
);

export const load: PageLoad = async ({ params, fetch }) => {
	const category = chartCategories.find((c) => c.slug === params.category);
	if (!category) error(404, 'Category not found');

	const names = blocks
		.filter((block: string) => block.startsWith(`chart-${params.category}-`))
		.sort((a: string, b: string) => a.localeCompare(b));

	const charts = await Promise.all(
		names.map(async (name: string) => {
			const resp = await fetch(`/api/block/${name}`);
			const item = (await resp.json()) as HighlightedBlock;
			const component = modules[`../../../../lib/registry/blocks/${name}.svelte`]!.default;
			return { ...item, component };
		})
	);

	return { category, charts };
};
