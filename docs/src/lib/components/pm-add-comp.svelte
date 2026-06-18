<script lang="ts">
	import CodeCommand from '$lib/components/code-command.svelte';

	let { name }: { name: string } = $props();
</script>

<CodeCommand command={`npx lily add ${name}`} />
