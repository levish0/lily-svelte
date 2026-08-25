<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { ClassValue } from 'clsx';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	/** Weight, from loudest to quietest. `destructive` is a meaning, not a weight. */
	export type BadgeVariant = 'solid' | 'soft' | 'quiet' | 'destructive';

	const base =
		'inline-flex w-fit shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs leading-normal tracking-[-0.3px]';

	// A badge is not a target, so it has no hover to fall back on — take the fill away and the
	// pill stops reading as a status at all. Every level keeps one, and the weight is carried by
	// the fill and the label together so a 3-point fill step still reads as a distinct tier.
	const variants: Record<BadgeVariant, string> = {
		solid: 'bg-(--text) font-medium text-(--bg)',
		soft: 'bg-(--text)/8 text-(--text)/56',
		quiet: 'bg-(--text)/5 text-(--text)/40',
		destructive: 'bg-red-500/10 font-medium text-red-600 dark:text-red-400'
	};

	/** Only applied when the badge is a link, so a static status label never looks clickable. */
	const linkVariants: Record<BadgeVariant, string> = {
		solid: 'transition-colors duration-150 hover:bg-(--text)/90',
		soft: 'transition-colors duration-150 hover:bg-(--text)/12 hover:text-(--text)/72',
		quiet: 'transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)/56',
		destructive: 'transition-colors duration-150 hover:bg-red-500/20'
	};

	/** The badge's classes, for styling something that is not a `Badge`. */
	export function badgeVariants(opts: { variant?: BadgeVariant; class?: ClassValue } = {}): string {
		const { variant = 'soft', class: className } = opts;
		return cn(base, variants[variant], className);
	}

	export type BadgeProps = WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
	};
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		variant = 'soft',
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
	class={cn(base, variants[variant], href && linkVariants[variant], className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
