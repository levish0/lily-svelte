<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AlertDialogPrimitive.CancelProps = $props();
</script>

<AlertDialogPrimitive.Cancel
	bind:ref
	data-slot="alert-dialog-cancel"
	class={cn(
		'inline-flex h-10 items-center justify-center rounded-3xl px-4 text-sm font-medium tracking-[-0.39px] text-(--text)/72 transition-colors duration-150 outline-none hover:bg-(--text)/8 hover:text-(--text)',
		className
	)}
	{...restProps}
/>
