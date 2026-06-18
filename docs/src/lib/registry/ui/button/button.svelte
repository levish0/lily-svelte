<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	export type ButtonVariant = 'default' | 'ghost' | 'destructive';
	export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};

	const variants: Record<ButtonVariant, string> = {
		default: 'bg-(--text) text-(--bg) hover:opacity-80 font-medium',
		ghost: 'bg-(--text)/5 text-(--text)/72 hover:bg-(--text)/8 hover:text-(--text)',
		destructive: 'bg-red-500/10 text-red-600 hover:bg-red-500/20 font-medium dark:text-red-400'
	};

	const sizes: Record<ButtonSize, string> = {
		default: 'h-10 rounded-3xl px-4 text-sm',
		sm: 'h-9 rounded-3xl px-3.5 text-sm',
		lg: 'h-11 rounded-3xl px-5 text-base',
		icon: 'size-10 rounded-3xl shrink-0'
	};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(
			'inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap outline-none transition-all duration-150 [&_svg]:pointer-events-none [&_svg]:shrink-0 disabled:pointer-events-none disabled:opacity-40',
			variants[variant],
			sizes[size],
			className
		)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(
			'inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap outline-none transition-all duration-150 [&_svg]:pointer-events-none [&_svg]:shrink-0 disabled:pointer-events-none disabled:opacity-40',
			variants[variant],
			sizes[size],
			className
		)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
