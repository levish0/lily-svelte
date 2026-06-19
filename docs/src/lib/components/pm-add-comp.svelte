<script lang="ts">
	import PmCommand from '$lib/components/pm-command.svelte';

	let { name }: { name: string } = $props();
</script>

<PmCommand type="execute" command={`lily-svelte@latest add ${name}`} />
