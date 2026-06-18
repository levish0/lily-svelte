<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn('flex flex-col gap-5 rounded-3xl bg-(--bg-elevated) p-5', className)} {...restProps}>
	{@render children?.()}
</div>
