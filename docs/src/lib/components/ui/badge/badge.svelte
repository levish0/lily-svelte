<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span
	class={cn(
		"inline-flex w-fit shrink-0 items-center rounded-full bg-(--text)/8 px-3 py-1 text-xs leading-normal tracking-[-0.3px] text-(--text)/60",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</span>
