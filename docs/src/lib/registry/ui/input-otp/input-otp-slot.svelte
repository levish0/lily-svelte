<script lang="ts">
	import { PinInput as InputOTPPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		cell,
		class: className,
		...restProps
	}: InputOTPPrimitive.CellProps = $props();
</script>

<InputOTPPrimitive.Cell
	{cell}
	bind:ref
	data-slot="input-otp-slot"
	class={cn(
		'relative flex size-12 items-center justify-center rounded-2xl bg-(--text)/5 text-base font-medium tracking-[-0.39px] transition-colors duration-150 outline-none data-[active=true]:z-10 data-[active=true]:bg-(--text)/10',
		className
	)}
	{...restProps}
>
	{cell.char}
	{#if cell.hasFakeCaret}
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
			<div class="h-5 w-px animate-caret-blink bg-(--text) duration-1000"></div>
		</div>
	{/if}
</InputOTPPrimitive.Cell>
