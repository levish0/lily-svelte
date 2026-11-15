import tailwindcss from '@tailwindcss/vite';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsx } from 'mdsx';
import MagicString from 'magic-string';
import { mdsxConfig } from './mdsx.config.js';

/**
 * Detects the `name` of a previewing component in `.md` files, imports the demo
 * directly from `#lib/registry/examples/<name>.svelte`, and passes it to the
 * `<ComponentPreview>` as a `component` prop. The Code tab fetches the built
 * registry JSON by name inside RegistrySource.
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
				ms.appendRight(insertIndex, ` component={${identifier}}`);
				components.add(name);
			}

			const importIndex = content.search('import ComponentPreview');
			for (const name of components) {
				const identifier = camelize(name);
				ms.appendLeft(
					importIndex,
					`import ${identifier} from "#lib/registry/examples/${name}.svelte";`
				);
			}

			return { code: ms.toString(), map: ms.generateMap() };
		}
	};
}

/**
 * Vite's dependency scan regex-extracts import paths from TypeScript `<script>` text, so code
 * samples held in strings (e.g. `import { Button } from '$lib/components/ui/button'`) reach
 * resolution. SvelteKit 3 throws for every `$lib` specifier, which aborts the whole scan and
 * leaves dependencies to be optimized mid-session. Samples describe consumer projects, so keep
 * `$lib` out of the scan; a real `$lib` import still fails when its module is transformed.
 */
function skipLibSamplesInDependencyScan(): Plugin {
	return {
		name: 'skip-lib-samples-in-dependency-scan',
		enforce: 'pre',
		resolveId(source, _importer, options) {
			// Vite sets `scan` for its dependency scanner; the public hook type omits it.
			const { scan } = options as { scan?: boolean };
			if (scan && /^\$lib(?:\/|$)/.test(source)) return { id: source, external: true };
		}
	};
}

export default defineConfig({
	plugins: [
		skipLibSamplesInDependencyScan(),
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
	optimizeDeps: {
		// Markdown previews inject their imports after Vite's route scan. Scan the
		// registry too so visiting another component does not rebuild shared dependencies.
		entries: ['src/routes/**/*.{svelte,ts}', 'src/lib/registry/**/*.svelte'],
		include: [
			'@zxcvbn-ts/core',
			'@zxcvbn-ts/language-common',
			'bits-ui',
			'runed',
			'@internationalized/date'
		]
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
