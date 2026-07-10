<script lang="ts">
	import { Calendar } from '$lib/registry/ui/calendar/index.js';
	import { today, getLocalTimeZone } from '@internationalized/date';

	let value = $state(today(getLocalTimeZone()));
</script>

<div class="rounded-3xl bg-(--bg-elevated) p-2 shadow-sm">
	<Calendar type="single" bind:value />
</div>
