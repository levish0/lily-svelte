<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="input-otp-separator"
	role="separator"
	class={cn('lily-input-otp-separator-1 flex items-center text-(--text)/40', className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		<div class={cn('lily-input-otp-separator-2 h-px w-2.5 bg-(--text)/24')}></div>
	{/if}
</div>
