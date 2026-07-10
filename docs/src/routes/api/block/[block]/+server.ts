import { error, json } from '@sveltejs/kit';
import { highlightCode } from '$lib/highlight-code.js';
import { blockMeta } from '$lib/registry/registry-block-meta.js';
import {
	transformBlockPath,
	transformImportPaths,
	type RegistryFileType
} from '$lib/registry/registry-utils.js';
import { blocks } from '../../../../__registry__/blocks.js';
import type { EntryGenerator, RequestHandler } from './$types.js';

export const prerender = true;

export const entries: EntryGenerator = () => blocks.map((block: string) => ({ block }));

export interface HighlightedBlock {
	name: string;
	description?: string;
	meta?: Record<string, unknown>;
	type: string;
	files: HighlightedFile[];
}

export interface HighlightedFile {
	type: RegistryFileType;
	target: string;
	highlightedContent: string;
}

type RegistryItemJson = {
	name: string;
	type: string;
	files: Array<{ content: string; type: RegistryFileType; target: string }>;
};

// The built registry JSON (static/registry/*.json) is the source of truth for
// block file contents — build:registry runs before dev/build, so it's present.
const registryJson = import.meta.glob<{ default: RegistryItemJson }>(
	'../../../../../static/registry/*.json'
);

async function loadItem(block: string): Promise<HighlightedBlock> {
	const loader = registryJson[`../../../../../static/registry/${block}.json`];
	if (!loader) error(404, 'Block not found');

	const { default: item } = await loader();
	const meta = blockMeta[item.name];

	const files = await Promise.all(
		item.files.map(async (file) => {
			const lang = file.target.split('.').at(-1) ?? 'svelte';
			const content = transformImportPaths(file.content);
			const highlightedContent = await highlightCode(content, lang);
			const target =
				item.type === 'registry:ui' ? file.target : transformBlockPath(file.target, file.type);
			return { type: file.type, target, highlightedContent };
		})
	);

	return {
		name: item.name,
		type: item.type,
		description: meta?.description,
		meta,
		files
	};
}

export const GET: RequestHandler = async ({ params }) => {
	return json(await loadItem(params.block));
};
