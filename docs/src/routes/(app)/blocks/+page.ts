import type { PageLoad } from './$types.js';
import type { HighlightedBlock } from '../../api/block/[block]/+server.js';

export const prerender = true;

const FEATURED_BLOCKS = ['sidebar-05', 'login-01', 'signup-01'];

export const load: PageLoad = async ({ fetch }) => {
	const items = await Promise.all(
		FEATURED_BLOCKS.map(async (block) => {
			const resp = await fetch(`/api/block/${block}`);
			return (await resp.json()) as HighlightedBlock;
		})
	);

	return {
		blocks: items.sort(
			(a, b) => FEATURED_BLOCKS.indexOf(a.name) - FEATURED_BLOCKS.indexOf(b.name)
		)
	};
};
