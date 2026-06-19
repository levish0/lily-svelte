import { components, gettingStarted } from '$content/index.js';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

const allDocs = [...gettingStarted, ...components];

export type DocMetadata = (typeof allDocs)[number];

type DocResolver = () => Promise<{ default: Component }>;

function transformPath(path: string): string {
	return path.replace('/content/', '').replace('.md', '').replace('/index', '').trim();
}

function getDocMetadata(slug: string): DocMetadata | undefined {
	return allDocs.find((doc) => doc.path === slug);
}

export async function getDoc(
	_slug: string
): Promise<{ component: Component; metadata: DocMetadata }> {
	const modules = import.meta.glob('/content/**/*.md');
	const slug = _slug === '' ? 'index' : _slug;

	let resolver: DocResolver | undefined;
	for (const [path, resolve] of Object.entries(modules)) {
		if (transformPath(path) === slug) {
			resolver = resolve as unknown as DocResolver;
			break;
		}
	}

	const doc = await resolver?.();
	const metadata = getDocMetadata(slug);

	if (!doc || !metadata) {
		error(404, 'Could not find the documentation page.');
	}

	return {
		component: doc.default,
		metadata
	};
}
