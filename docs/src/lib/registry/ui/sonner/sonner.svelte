<script lang="ts">
	import { Toaster as Sonner, type ToasterProps } from 'svelte-sonner';
	import { mode } from 'mode-watcher';

	let { ...restProps }: ToasterProps = $props();
</script>

<Sonner
	theme={mode.current}
	class="toaster group"
	style="--normal-bg: var(--bg-elevated); --normal-text: var(--text); --normal-border: transparent; --border-radius: 1.5rem; font-family: inherit;"
	{...restProps}
/>
