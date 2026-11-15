<script lang="ts">
	import { DatePicker } from '#lib/registry/ui/date-picker/index.js';
	import type { DateValue } from '@internationalized/date';

	let value = $state<DateValue | undefined>(undefined);
</script>

<DatePicker bind:value />
