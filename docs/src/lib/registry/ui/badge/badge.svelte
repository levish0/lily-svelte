<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { ClassValue } from 'clsx';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	/** Weight, from loudest to quietest. `destructive` is a meaning, not a weight. */
	export type BadgeVariant = 'solid' | 'soft' | 'quiet' | 'destructive';

	export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
	export type BadgeColor = 'blue' | 'teal' | 'green' | 'red' | 'yellow' | 'elephant';
	const sizes: Record<BadgeSize, string> = {
		xs: 'px-2 py-0.5 text-[10px] lily-badge-size-xs',
		sm: ' lily-badge-size-sm',
		md: 'px-3 py-1 text-[13px] lily-badge-size-md',
		lg: 'px-3 py-1.5 text-sm lily-badge-size-lg'
	};
	const colors: Record<BadgeColor, string> = {
		blue: '[--badge-fill:#3182f6] [--badge-label:white] [--badge-weak:var(--badge-blue-weak,rgba(49,130,246,0.16))] [--badge-ink:var(--badge-blue-ink,#1b64da)]',
		teal: '[--badge-fill:#109595] [--badge-label:white] [--badge-weak:var(--badge-teal-weak,rgba(0,129,138,0.16))] [--badge-ink:var(--badge-teal-ink,#0c8585)]',
		green:
			'[--badge-fill:#02a262] [--badge-label:white] [--badge-weak:var(--badge-green-weak,rgba(2,162,98,0.16))] [--badge-ink:var(--badge-green-ink,#029359)]',
		red: '[--badge-fill:#f04452] [--badge-label:white] [--badge-weak:var(--badge-red-weak,rgba(244,67,54,0.16))] [--badge-ink:var(--badge-red-ink,#d22030)]',
		yellow:
			'[--badge-fill:#ffc342] [--badge-label:#333d4b] [--badge-weak:var(--badge-yellow-weak,rgba(255,179,49,0.16))] [--badge-ink:var(--badge-yellow-ink,#dd7d02)]',
		elephant:
			'[--badge-fill:#4e5968] [--badge-label:white] [--badge-weak:var(--badge-elephant-weak,rgba(78,89,104,0.16))] [--badge-ink:var(--badge-elephant-ink,#4e5968)]'
	};
	const coloredWeights = {
		solid: 'bg-(--badge-fill) text-(--badge-label)',
		soft: 'bg-(--badge-weak) text-(--badge-ink)',
		quiet: 'bg-(--badge-weak) text-(--badge-ink)',
		destructive: ''
	};

	const base =
		'inline-flex w-fit shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs leading-normal tracking-[-0.3px] lily-badge-1';

	// A badge is not a target, so it has no hover to fall back on — take the fill away and the
	// pill stops reading as a status at all. Every level keeps one, and the weight is carried by
	// the fill and the label together so a 3-point fill step still reads as a distinct tier.
	const variants: Record<BadgeVariant, string> = {
		solid: 'bg-(--text) font-medium text-(--bg) lily-badge-2',
		soft: 'bg-(--text)/8 text-(--text)/56 lily-badge-3',
		quiet: 'bg-(--text)/5 text-(--text)/40 lily-badge-4',
		destructive: 'bg-red-500/10 font-medium text-red-600 dark:text-red-400 lily-badge-5'
	};

	/** Only applied when the badge is a link, so a static status label never looks clickable. */
	const linkVariants: Record<BadgeVariant, string> = {
		solid: 'transition-colors duration-150 hover:bg-(--text)/90 lily-badge-6',
		soft: 'transition-colors duration-150 hover:bg-(--text)/12 hover:text-(--text)/72 lily-badge-7',
		quiet: 'transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)/56 lily-badge-8',
		destructive: 'transition-colors duration-150 hover:bg-red-500/20 lily-badge-9'
	};

	/** The badge's classes, for styling something that is not a `Badge`. */
	export function badgeVariants(
		opts: { variant?: BadgeVariant; size?: BadgeSize; color?: BadgeColor; class?: ClassValue } = {}
	): string {
		const { variant = 'soft', size = 'sm', color, class: className } = opts;
		return cn(
			base,
			variants[variant],
			sizes[size],
			color && colors[color],
			color && coloredWeights[variant],
			className
		);
	}

	export type BadgeProps = WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
		size?: BadgeSize;
		color?: BadgeColor;
	};
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		variant = 'soft',
		size = 'sm',
		color,
		href,
		children,
		...restProps
	}: BadgeProps = $props();
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant, size, color }), href && linkVariants[variant], className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
