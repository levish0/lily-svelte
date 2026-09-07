<script lang="ts" module>
	export type AvatarSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

	export const avatarSizes: Record<AvatarSize, string> = {
		xs: 'size-5 text-[10px] lily-avatar-1',
		sm: 'size-7 text-xs lily-avatar-2',
		default: 'size-9 text-sm lily-avatar-3',
		lg: 'size-12 text-base lily-avatar-4',
		xl: 'size-16 text-xl lily-avatar-5'
	};
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes, HTMLImgAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> &
		// `restProps` lands on the wrapper, so the handful of image attributes worth reaching for
		// are named here instead. An avatar is the most repeated image on a page, which is exactly
		// where `srcset` and an eager first row matter.
		Pick<HTMLImgAttributes, 'srcset' | 'sizes' | 'loading' | 'crossorigin' | 'referrerpolicy'> & {
			src?: string;
			alt?: string;
			size?: AvatarSize;
			fallback?: Snippet | string;
		};

	let {
		ref = $bindable(null),
		src,
		srcset,
		sizes,
		alt = '',
		size = 'default',
		loading = 'lazy',
		crossorigin,
		referrerpolicy,
		fallback,
		class: className,
		children,
		...restProps
	}: Props = $props();

	// track the failing url rather than a boolean so a new `src` retries on its own
	let failedSrc = $state<string | undefined>(undefined);
	const showImage = $derived(!!src && failedSrc !== src);
</script>

<div
	bind:this={ref}
	data-slot="avatar"
	data-size={size}
	class={cn(
		'group/avatar lily-avatar-12 relative shrink-0 rounded-full',
		avatarSizes[size],
		className
	)}
	{...restProps}
>
	<div class={cn('lily-avatar-6 size-full overflow-hidden rounded-full bg-(--text)/8')}>
		{#if showImage}
			<img
				{src}
				{srcset}
				{sizes}
				{alt}
				{loading}
				{crossorigin}
				{referrerpolicy}
				decoding="async"
				class={cn('lily-avatar-7 size-full object-cover')}
				onerror={() => (failedSrc = src)}
			/>
		{:else if typeof fallback === 'string'}
			<div
				class={cn(
					'lily-avatar-8 flex size-full items-center justify-center font-medium tracking-[-0.39px] text-(--text)/56 select-none'
				)}
			>
				{fallback}
			</div>
		{:else if fallback}
			<div class={cn('lily-avatar-9 flex size-full items-center justify-center text-(--text)/40')}>
				{@render fallback()}
			</div>
		{:else}
			<div class={cn('lily-avatar-10 flex size-full items-center justify-center text-(--text)/40')}>
				<Icon
					icon="heroicons:user-solid"
					class={cn('lily-avatar-11 size-[55%]')}
					aria-hidden="true"
				/>
			</div>
		{/if}
	</div>
	{@render children?.()}
</div>
