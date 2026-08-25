<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLTdAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLTdAttributes = $props();
</script>

<!-- the first column is usually a name — keep it on one line, let the rest wrap -->
<td
	class={cn(
		'px-4 py-3 text-start align-top leading-[1.6] text-(--text)/72 first:whitespace-nowrap [&_code]:whitespace-nowrap [&[align=center]]:text-center [&[align=right]]:text-end',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</td>
