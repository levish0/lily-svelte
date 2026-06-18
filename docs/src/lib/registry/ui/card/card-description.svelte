<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<p
	class={cn('text-sm leading-[1.6] tracking-[-0.39px] text-(--text)/72', className)}
	{...restProps}
>
	{@render children?.()}
</p>
