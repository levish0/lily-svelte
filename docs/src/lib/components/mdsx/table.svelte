<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLTableElement> = $props();
</script>

<!-- mirrors ui/table: hairline rows on a rounded surface, no outer border -->
<div class="my-6 no-scrollbar w-full overflow-x-auto rounded-3xl bg-(--bg-elevated)">
	<table
		class={cn('w-full text-sm tracking-[-0.39px] [&_tbody_tr:last-child]:border-b-0', className)}
		{...restProps}
	>
		{@render children?.()}
	</table>
</div>
