<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { ClassValue } from 'clsx';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	/** Weight, from loudest to quietest. `destructive` is a meaning, not a weight. */
	export type BadgeVariant = 'solid' | 'soft' | 'ghost' | 'destructive';

	const base =
		'inline-flex w-fit shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs leading-normal tracking-[-0.3px]';

	const variants: Record<BadgeVariant, string> = {
		solid: 'bg-(--text) font-medium text-(--bg)',
		soft: 'bg-(--text)/8 text-(--text)/56',
		ghost: 'text-(--text)/56',
		destructive: 'bg-red-500/10 font-medium text-red-600 dark:text-red-400'
	};

	/** Only applied when the badge is a link, so a static status label never looks clickable. */
	const linkVariants: Record<BadgeVariant, string> = {
		solid: 'transition-colors duration-150 hover:bg-(--text)/90',
		soft: 'transition-colors duration-150 hover:bg-(--text)/12 hover:text-(--text)/72',
		ghost: 'transition-colors duration-150 hover:bg-(--text)/5 hover:text-(--text)/72',
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
