import type { Handle } from '@sveltejs/kit';
import { STYLE_NAMES } from 'lily-svelte/styles';

export const handle: Handle = ({ event, resolve }) => {
	const style = event.url.pathname.startsWith('/preview/') ? event.params.style : undefined;
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			style && STYLE_NAMES.some((name) => name === style)
				? html.replace('<html ', `<html data-lily-style="${style}" `)
				: html
	});
};
