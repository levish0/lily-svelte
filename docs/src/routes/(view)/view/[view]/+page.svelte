<script lang="ts">
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.meta.name} · lily</title>
	{#if data.meta.description}
		<meta name="description" content={data.meta.description} />
	{/if}
</svelte:head>

<div class="bg-(--bg) {data.meta?.className ?? ''}">
	<data.component />
</div>
