<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { ClassValue } from 'clsx';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	/** Weight, from loudest to quietest. `destructive` is a meaning, not a weight. */
	export type ButtonVariant = 'solid' | 'soft' | 'ghost' | 'destructive';
	export type ButtonTone = 'brand' | 'neutral' | 'danger' | 'inverse';
	const tones: Record<ButtonTone, string> = {
		brand: ' lily-button-tone-brand',
		neutral: ' lily-button-tone-neutral',
		danger: 'bg-red-500/10 text-red-600 lily-button-tone-danger',
		inverse: 'bg-white text-black lily-button-tone-inverse'
	};
	export type ButtonSize = 'sm' | 'md' | 'default' | 'lg' | 'xl' | 'icon-sm' | 'icon' | 'icon-lg';

	const base =
		'relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap transition-all duration-150 outline-none select-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 lily-button-1';

	const variants: Record<ButtonVariant, string> = {
		solid: 'bg-(--text) text-(--bg) font-medium hover:bg-(--text)/90 lily-button-2',
		soft: 'bg-(--text)/5 text-(--text)/72 hover:bg-(--text)/8 hover:text-(--text) lily-button-3',
		ghost: 'text-(--text)/72 hover:bg-(--text)/5 hover:text-(--text) lily-button-4',
		destructive:
			'bg-red-500/10 text-red-600 font-medium hover:bg-red-500/20 dark:text-red-400 lily-button-5'
	};

	const sizes: Record<ButtonSize, string> = {
		md: 'h-10 rounded-3xl px-4 text-sm lily-button-medium',
		sm: 'h-9 rounded-3xl px-3.5 text-sm lily-button-6',
		default: 'h-10 rounded-3xl px-4 text-sm lily-button-7',
		lg: 'h-11 rounded-3xl px-5 text-base lily-button-8',
		xl: 'h-14 rounded-3xl px-7 text-base lily-button-9',
		'icon-sm': 'size-9 shrink-0 rounded-3xl lily-button-10',
		icon: 'size-10 shrink-0 rounded-3xl lily-button-11',
		'icon-lg': 'size-11 shrink-0 rounded-3xl lily-button-12'
	};

	const spinnerSizes: Record<ButtonSize, string> = {
		md: 'size-4',
		sm: 'size-4',
		default: 'size-4',
		lg: 'size-5',
		xl: 'size-5',
		'icon-sm': 'size-4',
		icon: 'size-4',
		'icon-lg': 'size-5'
	};

	/** The button's classes, for styling something that is not a `Button`. */
	export function buttonVariants(
		opts: { variant?: ButtonVariant; size?: ButtonSize; tone?: ButtonTone; class?: ClassValue } = {}
	): string {
		const { variant = 'solid', size = 'default', tone = 'brand', class: className } = opts;
		return cn(base, variants[variant], sizes[size], tones[tone], className);
	}

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			tone?: ButtonTone;
			size?: ButtonSize;
			/** Show a spinner and swallow clicks while an action is in flight. */
			loading?: boolean;
			/** ms `loading` must last before the spinner appears, so quick actions do not flash. */
			loadingDelay?: number;
		};
</script>

<script lang="ts">
	import { Spinner } from '$lib/registry/ui/spinner/index.js';

	let {
		class: className,
		variant = 'solid',
		tone = 'brand',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		loading = false,
		loadingDelay = 150,
		onclick,
		children,
		...restProps
	}: ButtonProps = $props();

	// Anything under `loadingDelay` resolves before the spinner is worth showing; a spinner
	// that appears and leaves inside ~150ms reads as a flicker, not as feedback.
	let spinning = $state(false);
	$effect(() => {
		if (!loading) {
			spinning = false;
			return;
		}
		const timer = setTimeout(() => (spinning = true), loadingDelay);
		return () => clearTimeout(timer);
	});

	const classes = $derived(buttonVariants({ variant, size, tone, class: className }));

	// `disabled` leaves the tab order; `loading` stays in it so focus survives the action.
	// Dropping `href` makes an anchor unfocusable, so it needs the tabindex back.
	const tabindex = $derived(disabled ? -1 : loading ? 0 : undefined);

	// `disabled` would drop focus the moment the action starts, so a keyboard user loses their
	// place. `aria-disabled` keeps the button focusable and announced; the click is swallowed here.
	type ButtonClick = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

	function handleClick(e: MouseEvent & { currentTarget: EventTarget & HTMLElement }) {
		if (loading) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		(onclick as ((ev: ButtonClick) => void) | undefined)?.(e as ButtonClick);
	}
</script>

{#snippet content()}
	{#if spinning}
		<span class={cn('lily-button-13 absolute inset-0 flex items-center justify-center')}>
			<Spinner class={spinnerSizes[size]} />
		</span>
	{/if}
	<!-- `display: contents` keeps the children as direct flex items, so the button's width and
		 gaps never change; `visibility` is inherited, so they just stop painting. -->
	<span class={cn('contents', spinning && 'invisible')}>
		{@render children?.()}
	</span>
{/snippet}

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={classes}
		href={disabled || loading ? undefined : href}
		aria-disabled={disabled || loading || undefined}
		aria-busy={loading || undefined}
		role={disabled || loading ? 'link' : undefined}
		{tabindex}
		onclick={handleClick}
		{...restProps}
	>
		{@render content()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={classes}
		{type}
		{disabled}
		aria-disabled={loading || undefined}
		aria-busy={loading || undefined}
		onclick={handleClick}
		{...restProps}
	>
		{@render content()}
	</button>
{/if}
