<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AlertDialogPrimitive.ActionProps = $props();
</script>

<AlertDialogPrimitive.Action
	bind:ref
	data-slot="alert-dialog-action"
	class={cn(
		'inline-flex h-10 items-center justify-center rounded-3xl bg-(--text) px-4 text-sm font-medium tracking-[-0.39px] text-(--bg) outline-none transition-colors duration-150 hover:bg-(--text)/90',
		className
	)}
	{...restProps}
/>
