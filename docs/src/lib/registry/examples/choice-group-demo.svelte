<script lang="ts">
	import { ChoiceGroup, ChoiceGroupItem } from '$lib/registry/ui/choice-group';
	let value = $state('daily');
</script>

<div class="flex flex-col gap-4">
	<ChoiceGroup bind:value aria-label="Period">
		<ChoiceGroupItem value="daily">Daily</ChoiceGroupItem>
		<ChoiceGroupItem value="weekly">Weekly</ChoiceGroupItem>
		<ChoiceGroupItem value="monthly">Monthly</ChoiceGroupItem>
	</ChoiceGroup>
</div>
