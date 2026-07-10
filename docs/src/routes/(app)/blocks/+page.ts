import type { PageLoad } from './$types.js';
import type { HighlightedBlock } from '../../api/block/[block]/+server.js';
import { blocks } from '../../../__registry__/blocks.js';

export const prerender = true;

// Display order — anything not listed sorts alphabetically at the end.
const ORDER = ['sidebar-01', 'login-01', 'signup-01', 'otp-01', 'calendar-01'];

export const load: PageLoad = async ({ fetch }) => {
	const items = await Promise.all(
		blocks.map(async (block: string) => {
			const resp = await fetch(`/api/block/${block}`);
			return (await resp.json()) as HighlightedBlock;
		})
	);

	const rank = (name: string) => {
		const index = ORDER.indexOf(name);
		return index === -1 ? ORDER.length : index;
	};
	items.sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name));

	return { blocks: items };
};
