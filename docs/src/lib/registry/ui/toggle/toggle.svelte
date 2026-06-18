<script lang="ts" module>
	import { cn } from '$lib/utils.js';

	export type ToggleVariant = 'default' | 'outline';
	export type ToggleSize = 'default' | 'sm' | 'lg';

	export function toggleVariants({
		variant = 'default',
		size = 'default'
	}: { variant?: ToggleVariant; size?: ToggleSize } = {}): string {
		const base =
			'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium tracking-[-0.39px] text-(--text)/72 outline-none transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text) data-[state=on]:bg-(--text)/10 data-[state=on]:text-(--text) disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0';
		const variants: Record<ToggleVariant, string> = {
			default: '',
			outline: 'border border-(--text)/12'
		};
		const sizes: Record<ToggleSize, string> = {
			default: 'h-9 min-w-9 px-2.5',
			sm: 'h-8 min-w-8 px-2',
			lg: 'h-10 min-w-10 px-3'
		};
		return cn(base, variants[variant], sizes[size]);
	}
</script>

<script lang="ts">
	import { Toggle as TogglePrimitive } from 'bits-ui';
	import { cn as cnInline } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		pressed = $bindable(false),
		class: className,
		size = 'default',
		variant = 'default',
		...restProps
	}: TogglePrimitive.RootProps & {
		variant?: ToggleVariant;
		size?: ToggleSize;
	} = $props();
</script>

<TogglePrimitive.Root
	bind:ref
	bind:pressed
	data-slot="toggle"
	class={cnInline(toggleVariants({ variant, size }), className)}
	{...restProps}
/>
