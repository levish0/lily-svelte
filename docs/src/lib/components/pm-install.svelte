<script lang="ts">
	import CodeCommand from '$lib/components/code-command.svelte';

	let { command }: { command: string } = $props();
</script>

<CodeCommand command={`npm install ${command}`} />
