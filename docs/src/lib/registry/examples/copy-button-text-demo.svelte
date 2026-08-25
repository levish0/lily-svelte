<script lang="ts">
	import Icon from '@iconify/svelte';
	import { CopyButton } from '$lib/registry/ui/copy-button';

	const command = 'npx lily-svelte@latest add copy-button';
</script>

<CopyButton text={command} size="sm">
	{#snippet icon()}
		<Icon icon="heroicons:command-line-solid" aria-hidden="true" />
	{/snippet}
	<span class="font-mono text-xs">{command}</span>
</CopyButton>
