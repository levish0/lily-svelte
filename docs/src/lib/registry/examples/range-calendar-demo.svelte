<script lang="ts">
	import { RangeCalendar } from '$lib/registry/ui/range-calendar';
	import { today, getLocalTimeZone } from '@internationalized/date';

	const start = today(getLocalTimeZone());
	let value = $state({ start, end: start.add({ days: 4 }) });
</script>

<RangeCalendar bind:value />
