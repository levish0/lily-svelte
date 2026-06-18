<script lang="ts">
	import CopyButton from '$lib/components/copy-button.svelte';

	let { command }: { command: string } = $props();
</script>

<div class="relative">
	<pre
		class="no-scrollbar overflow-x-auto rounded-2xl bg-(--text)/4 px-4 py-3.5 pe-12 text-sm text-(--text)/88"><code
			>{command}</code
		></pre>
	<CopyButton text={command} />
</div>
