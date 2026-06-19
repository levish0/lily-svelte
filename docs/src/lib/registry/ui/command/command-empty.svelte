<script lang="ts">
	import { Command as CommandPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CommandPrimitive.EmptyProps = $props();
</script>

<CommandPrimitive.Empty
	bind:ref
	data-slot="command-empty"
	class={cn('py-6 text-center text-sm tracking-[-0.39px] text-(--text)/40', className)}
	{...restProps}
/>
