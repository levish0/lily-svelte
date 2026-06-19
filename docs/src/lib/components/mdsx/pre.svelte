<script lang="ts">
	import { onMount } from 'svelte';
	import CopyButton from '$lib/components/copy-button.svelte';
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLPreElement> = $props();

	let preNode = $state<HTMLPreElement>();
	let code = $state('');

	onMount(() => {
		if (preNode) {
			code = preNode.innerText.trim();
		}
	});
</script>

<div class="code-block relative my-5 overflow-hidden rounded-3xl bg-(--text)/5">
	<!--
	We cannot have a newline between the pre and children or we will get a newline in the code block
	-->
	<pre
		bind:this={preNode}
		class={cn(
			'no-scrollbar min-w-0 overflow-x-auto px-5 py-4 pe-14 text-sm leading-[1.7] outline-none',
			className
		)}
		{...restProps}>{@render children?.()}</pre>
	<CopyButton text={code} />
</div>
