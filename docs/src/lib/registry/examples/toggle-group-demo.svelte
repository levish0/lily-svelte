<script lang="ts">
	import { ToggleGroup, ToggleGroupItem } from '$lib/registry/ui/toggle-group';

	let value = $state('center');
</script>

<ToggleGroup type="single" bind:value>
	<ToggleGroupItem value="left">Left</ToggleGroupItem>
	<ToggleGroupItem value="center">Center</ToggleGroupItem>
	<ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>
