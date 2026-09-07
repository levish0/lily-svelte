<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Country } from 'svelte-tel-input/types';
	import { getFlag } from './flags.js';

	let { country = null }: { country?: Country | null } = $props();
</script>

<span
	class={cn(
		'lily-flag-1 flex h-4 w-6 shrink-0 overflow-clip rounded-sm bg-(--text)/12 [&>svg]:h-4! [&>svg]:w-6!'
	)}
>
	{#await getFlag(country) then flag}
		{#if flag}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html flag}
		{/if}
	{/await}
</span>
