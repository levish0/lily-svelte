<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Separator } from '$lib/registry/ui/separator/index.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<!-- `-my-2` pulls the rule back in against the parent Field/FieldGroup gap -->
<div
	bind:this={ref}
	data-slot="field-separator"
	data-content={children ? '' : undefined}
	class={cn('relative -my-2 flex h-5 items-center', className)}
	{...restProps}
>
	<Separator class="absolute inset-x-0 top-1/2" />
	{#if children}
		<span
			data-slot="field-separator-content"
			class="relative mx-auto bg-(--bg) px-2 text-xs tracking-[-0.3px] text-(--text)/56"
		>
			{@render children()}
		</span>
	{/if}
</div>
