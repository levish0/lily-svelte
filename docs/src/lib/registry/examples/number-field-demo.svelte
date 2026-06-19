<script lang="ts">
	import { NumberField } from '$lib/registry/ui/number-field';

	let value = $state(1);
</script>

<NumberField bind:value min={0} max={10} />
