<script lang="ts">
	import { Calendar } from '$lib/registry/ui/calendar';
	import { today, getLocalTimeZone } from '@internationalized/date';

	let value = $state(today(getLocalTimeZone()));
</script>

<Calendar type="single" bind:value />
