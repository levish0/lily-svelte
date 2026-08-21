<script lang="ts" module>
	export type AvatarGroupSpacing = 'tight' | 'default' | 'loose';
</script>

<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		spacing = 'default',
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		spacing?: AvatarGroupSpacing;
	} = $props();

	const spacings: Record<AvatarGroupSpacing, string> = {
		tight: '-space-x-3',
		default: '-space-x-2',
		loose: '-space-x-1'
	};
</script>

<div
	bind:this={ref}
	data-slot="avatar-group"
	class={cn(
		// the ring separates overlapping avatars, so it has to match whatever surface
		// they sit on — override with class="[--avatar-ring:var(--bg-elevated)]" inside cards
		'flex items-center [--avatar-ring:var(--bg)]',
		'*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-(--avatar-ring)',
		'*:data-[slot=avatar-group-count]:ring-2 *:data-[slot=avatar-group-count]:ring-(--avatar-ring)',
		spacings[spacing],
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
