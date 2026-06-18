<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h3
	class={cn('text-base leading-[1.5] font-medium tracking-[-0.48px] text-(--text)', className)}
	{...restProps}
>
	{@render children?.()}
</h3>
