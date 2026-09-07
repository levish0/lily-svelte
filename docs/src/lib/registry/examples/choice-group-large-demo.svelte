<script lang="ts">
	import { ChoiceGroup, ChoiceGroupItem } from '$lib/registry/ui/choice-group';
	let value = $state('photo');
</script>

<ChoiceGroup size="lg" bind:value aria-label="Media type">
	<ChoiceGroupItem value="photo">Photos</ChoiceGroupItem>
	<ChoiceGroupItem value="video">Videos</ChoiceGroupItem>
</ChoiceGroup>
