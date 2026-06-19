// @ts-check
import { defineCollection, defineConfig, s } from 'velite';

const docSchema = s
	.object({
		title: s.string(),
		description: s.string(),
		path: s.path(),
		navLabel: s.string().optional(),
		links: s
			.object({
				doc: s.string().optional(),
				api: s.string().optional(),
				source: s.string().optional()
			})
			.optional(),
		component: s.boolean().default(false),
		toc: s.toc()
	})
	.transform((data) => {
		// Normalize a folder index (e.g. `components/index`) to its folder path
		// (`components`) so the route slug and metadata lookup line up.
		const path = data.path.replace(/\/index$/, '');
		return {
			...data,
			path,
			slug: path.split('/').slice(1).join('/'),
			slugFull: `/${path}`
		};
	});

const gettingStarted = defineCollection({
	name: 'gettingStarted',
	pattern: './*.md',
	schema: docSchema
});

const components = defineCollection({
	name: 'components',
	pattern: './components/**/*.md',
	schema: docSchema
});

export default defineConfig({
	root: './content',
	collections: {
		gettingStarted,
		components
	},
	output: { assets: 'static' }
});
