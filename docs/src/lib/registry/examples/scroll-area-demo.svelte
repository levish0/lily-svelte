<script lang="ts">
	import { ScrollArea } from '$lib/registry/ui/scroll-area';

	const tags = Array.from({ length: 24 }, (_, i) => `Item ${i + 1}`);
</script>

<ScrollArea class="h-56 w-full max-w-xs rounded-3xl bg-(--bg-elevated)">
	<div class="flex flex-col gap-2.5 px-4 py-4 text-sm tracking-[-0.39px] text-(--text)/72">
		{#each tags as tag (tag)}
			<div>{tag}</div>
		{/each}
	</div>
</ScrollArea>
