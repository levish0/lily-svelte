<script lang="ts">
	import { getDesignStyle } from '$lib/design-style';
	import { registryItemSchema } from 'lily-svelte/schema';
	import { CodeBlock } from '$lib/registry/ui/code-block';
	import { Skeleton } from '$lib/registry/ui/skeleton';
	import { transformImportPaths } from '$lib/registry/registry-utils';
	let { name }: { name: string } = $props();
	const style = getDesignStyle();
	let files = $state<Array<{ target: string; content: string }>>([]);
	let failure = $state('');
	$effect(() => {
		const controller = new AbortController();
		const path = style.current === 'diamond' ? '/registry' : `/registry/styles/${style.current}`;
		files = [];
		failure = '';
		fetch(`${path}/${encodeURIComponent(name)}.json`, { signal: controller.signal })
			.then(async (response) => {
				if (!response.ok) throw new Error('Source could not be loaded.');
				return registryItemSchema.parse(await response.json());
			})
			.then((item) => {
				if (!controller.signal.aborted)
					files = (item.files ?? []).flatMap((file) =>
						typeof file.content === 'string' && typeof file.target === 'string'
							? [{ content: file.content, target: file.target }]
							: []
					);
			})
			.catch((error: Error) => {
				if (!controller.signal.aborted) failure = error.message;
			});
		return () => controller.abort();
	});
</script>

{#if failure}<p role="status">{failure}</p>
{:else if !files.length}<Skeleton class="h-32 w-full" />
{:else}
	{#each files as file (file.target)}
		<CodeBlock
			code={transformImportPaths(file.content)}
			lang={file.target.endsWith('.svelte') ? 'svelte' : 'ts'}
		/>
	{/each}
{/if}
