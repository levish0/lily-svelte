import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types.js';
import type { HighlightedBlock } from '../../../api/block/[block]/+server.js';
import { blocks } from '../../../../__registry__/blocks.js';
import { registryCategories } from '$lib/registry/registry-categories.js';

export const prerender = true;

export const entries: EntryGenerator = () =>
	registryCategories.filter((c) => !c.hidden).map((c) => ({ category: c.slug }));

export const load: PageLoad = async ({ params, fetch }) => {
	const category = registryCategories.find((c) => c.slug === params.category);
	if (!category) error(404, 'Category not found');

	const names = blocks
		.filter((block: string) => block.startsWith(`${params.category}-`))
		.sort((a: string, b: string) => a.localeCompare(b));

	const items = await Promise.all(
		names.map(async (block: string) => {
			const resp = await fetch(`/api/block/${block}`);
			return (await resp.json()) as HighlightedBlock;
		})
	);

	return { category, blocks: items };
};
