<script lang="ts">
	import { Progress } from '$lib/registry/ui/progress';
	import { onMount } from 'svelte';

	let value = $state(13);

	onMount(() => {
		const timer = setTimeout(() => (value = 66), 400);
		return () => clearTimeout(timer);
	});
</script>

<Progress {value} class="max-w-sm" />
