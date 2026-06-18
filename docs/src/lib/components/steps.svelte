<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { children, class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<div
	class={cn('mb-12 ms-4 border-s border-(--text)/8 ps-8 [counter-reset:step]', className)}
	{...restProps}
>
	{@render children?.()}
</div>
