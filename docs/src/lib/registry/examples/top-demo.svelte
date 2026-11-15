<script lang="ts">
	import { cn } from '#lib/utils.js';
	import { Top } from '#lib/registry/ui/top/index.js';
	import { Badge } from '#lib/registry/ui/badge/index.js';
	import { ListRow } from '#lib/registry/ui/list-row/index.js';
	import { Button } from '#lib/registry/ui/button/index.js';
	let saved = $state(false);
</script>

<div class="w-full max-w-md">
	<section class="overflow-hidden rounded-[20px] bg-(--bg-elevated)">
		<Top
			eyebrow="Weekend workshop"
			title="Make your own pottery"
			description="Shape, glaze, and make something of your own."
		>
			{#snippet accessory()}<Badge variant="soft">Beginner</Badge>{/snippet}
		</Top>
		<ListRow title="Saturday at 2 PM" description="Clay Studio · 2 hours" density="default" />
		<div class={cn('lily-top-demo-actions p-4')}>
			<Button variant="soft" class="w-full" onclick={() => (saved = !saved)}
				>{saved ? 'Added to favorites' : 'Add to favorites'}</Button
			>
		</div>
	</section>
</div>
