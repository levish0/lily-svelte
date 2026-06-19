<script lang="ts">
	import * as Tooltip from '$lib/registry/ui/tooltip';
	import { Button } from '$lib/registry/ui/button';
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button variant="ghost" {...props}>Hover me</Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>Add to library</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
