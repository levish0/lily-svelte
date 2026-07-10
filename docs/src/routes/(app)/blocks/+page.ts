import type { PageLoad } from './$types.js';
import type { HighlightedBlock } from '../../api/block/[block]/+server.js';
import { blocks } from '../../../__registry__/blocks.js';

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
	const items = await Promise.all(
		blocks.map(async (block: string) => {
			const resp = await fetch(`/api/block/${block}`);
			return (await resp.json()) as HighlightedBlock;
		})
	);

	return { blocks: items };
};
