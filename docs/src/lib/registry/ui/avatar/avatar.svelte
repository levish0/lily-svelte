<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		src?: string;
		alt?: string;
		size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
	};

	let {
		ref = $bindable(null),
		src,
		alt = '',
		size = 'default',
		class: className,
		...restProps
	}: Props = $props();

	let imgError = $state(false);

	const sizes = {
		xs: 'size-5',
		sm: 'size-7',
		default: 'size-9',
		lg: 'size-12',
		xl: 'size-16'
	};
</script>

<div
	bind:this={ref}
	data-slot="avatar"
	class={cn('relative shrink-0 overflow-hidden rounded-full bg-(--text)/8', sizes[size], className)}
	{...restProps}
>
	{#if src && !imgError}
		<img
			{src}
			{alt}
			loading="lazy"
			decoding="async"
			class="size-full object-cover"
			onerror={() => (imgError = true)}
		/>
	{:else}
		<div class="flex size-full items-center justify-center text-(--text)/40">
			<svg viewBox="0 0 24 24" fill="currentColor" class="size-[55%]" aria-hidden="true">
				<path
					d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z"
				/>
			</svg>
		</div>
	{/if}
</div>
