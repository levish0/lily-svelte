<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { avatarSizes, type AvatarSize } from './avatar.svelte';

	let {
		ref = $bindable(null),
		size = 'default',
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		size?: AvatarSize;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="avatar-group-count"
	data-size={size}
	class={cn(
		'relative flex shrink-0 items-center justify-center rounded-full bg-(--text)/8 font-medium tracking-[-0.39px] text-(--text)/56 select-none',
		avatarSizes[size],
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
