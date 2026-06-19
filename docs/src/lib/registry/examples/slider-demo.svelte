<script lang="ts">
	import { Slider } from '$lib/registry/ui/slider';

	let value = $state(50);
</script>

<Slider type="single" bind:value max={100} step={1} class="max-w-xs" />
