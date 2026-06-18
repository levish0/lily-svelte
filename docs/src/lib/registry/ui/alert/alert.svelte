<script lang="ts" module>
	import { cn } from '$lib/utils.js';

	export type AlertVariant = 'default' | 'destructive';

	export function alertVariants(variant: AlertVariant = 'default'): string {
		const base =
			'relative grid w-full grid-cols-[0_1fr] items-start gap-x-3 gap-y-1 rounded-3xl px-4 py-3.5 text-sm tracking-[-0.39px] has-[>svg]:grid-cols-[1.25rem_1fr] [&>svg]:size-5 [&>svg]:translate-y-0.5';
		const variants: Record<AlertVariant, string> = {
			default: 'bg-(--text)/5 text-(--text)',
			destructive: 'bg-red-500/8 text-red-600 dark:text-red-400'
		};
		return cn(base, variants[variant]);
	}
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { type WithElementRef } from '$lib/utils.js';
	import { cn as cnInline } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'default',
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: AlertVariant;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="alert"
	role="alert"
	class={cnInline(alertVariants(variant), className)}
	{...restProps}
>
	{@render children?.()}
</div>
