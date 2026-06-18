import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsx } from 'mdsx';
import MagicString from 'magic-string';
import { mdsxConfig } from './mdsx.config.js';

/**
 * Detects the `name` of a previewing component in `.md` files, imports the demo
 * directly from `$lib/registry/examples/<name>.svelte`, and passes it to the
 * `<ComponentPreview>` as a `component` prop.
 */
function componentPreviews() {
	const TARGET = '<ComponentPreview';
	const camelize = (s: string) => s.replace(/-./g, (w) => w[1].toUpperCase());

	return {
		name: 'inject-component-preview',
		markup: ({ content, filename }: { content: string; filename?: string }) => {
			if (!filename?.endsWith('.md') || !content.includes(TARGET)) return;

			const ms = new MagicString(content);
			const results = content.matchAll(/<ComponentPreview name=["|']([^\s]*)["|']/g);
			const components = new Set<string>();
			for (const exec of results) {
				const [, name] = exec;
				const insertIndex = (exec.index as number) + TARGET.length;
				const identifier = camelize(name);
				const prop = ` component={${identifier}}`;
				ms.appendRight(insertIndex, prop);
				components.add(name);
			}

			const importIndex = content.search('import ComponentPreview');
			for (const name of components) {
				const identifier = camelize(name);
				const importStatement = `import ${identifier} from "$lib/registry/examples/${name}.svelte";`;
				ms.appendLeft(importIndex, importStatement);
			}

			return { code: ms.toString(), map: ms.generateMap() };
		}
	};
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			extensions: ['.svelte', '.md'],
			preprocess: [mdsx(mdsxConfig), componentPreviews()],
			compilerOptions: {
				// Force runes for our own code. Skip node_modules and let mdsx-generated
				// `.md` components auto-detect (whatever codegen mdsx emits).
				runes: ({ filename }: { filename: string }) => {
					const parts = filename.split(/[/\\]/);
					if (parts.includes('node_modules')) return undefined;
					if (filename.endsWith('.md')) return undefined;
					return true;
				}
			},
			adapter: adapter(),
			alias: {
				'$content/*': '.velite/*'
			},
			prerender: {
				handleMissingId: (details: { id: string; message: string }) => {
					if (details.id === '#') return;
					console.warn(details.message);
				}
			}
		})
	],
	server: {
		fs: {
			allow: ['.velite', 'content']
		}
	},
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
