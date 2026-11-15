<script lang="ts">
	import * as Tooltip from '#lib/registry/ui/tooltip/index.js';
	import { Button } from '#lib/registry/ui/button/index.js';
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button variant="soft" {...props}>Hover me</Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>Add to library</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
