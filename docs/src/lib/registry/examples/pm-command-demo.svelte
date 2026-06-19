<script lang="ts">
	import { PMCommand } from '$lib/registry/ui/pm-command/index.js';
</script>

<div class="flex w-full max-w-md flex-col gap-4">
	<PMCommand command="execute" args={['lily-svelte@latest', 'add', 'button']} />
	<PMCommand variant="secondary" command="install" args={['bits-ui']} />
</div>
