<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLThAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLThAttributes = $props();
</script>

<th
	class={cn(
		'h-11 px-4 text-start align-middle text-xs font-medium tracking-[-0.3px] whitespace-nowrap text-(--text)/56 [&[align=center]]:text-center [&[align=right]]:text-end',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</th>
