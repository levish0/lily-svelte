<script lang="ts">
	import { Button, type ButtonProps } from '$lib/registry/ui/button';
	import { getDesignStyle } from '$lib/design-style';
	import { cn } from '$lib/utils.js';
	const style = getDesignStyle();
	let {
		class: className,
		diamondClass,
		...restProps
	}: ButtonProps & { diamondClass?: string } = $props();
</script>

<Button
	{...restProps}
	class={cn(
		style.current === 'diamond' &&
			'h-auto min-h-0 min-w-0 rounded-none bg-transparent p-0 font-normal hover:bg-transparent hover:text-inherit',
		className,
		style.current === 'diamond' && diamondClass
	)}
/>
