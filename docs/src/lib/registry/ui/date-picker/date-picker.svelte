<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as Popover from '$lib/registry/ui/popover/index.js';
	import { Calendar } from '$lib/registry/ui/calendar/index.js';
	import { cn } from '$lib/utils.js';
	import { type DateValue, DateFormatter, getLocalTimeZone } from '@internationalized/date';

	let {
		value = $bindable<DateValue | undefined>(undefined),
		placeholder = 'Pick a date',
		disabled = false,
		class: className
	}: {
		value?: DateValue;
		placeholder?: string;
		disabled?: boolean;
		class?: string;
	} = $props();

	let open = $state(false);
	const df = new DateFormatter('en-US', { dateStyle: 'long' });
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<button
				{...props}
				type="button"
				{disabled}
				data-slot="date-picker"
				class={cn(
					'inline-flex h-10 w-60 items-center gap-2.5 rounded-3xl bg-(--text)/5 px-4 text-left text-sm tracking-[-0.39px] outline-none transition-colors duration-150 hover:bg-(--text)/8 disabled:pointer-events-none disabled:opacity-50',
					!value && 'text-(--text)/48',
					className
				)}
			>
				<Icon icon="heroicons:calendar-days-solid" class="size-4 shrink-0 text-(--text)/48" aria-hidden="true" />
				{value ? df.format(value.toDate(getLocalTimeZone())) : placeholder}
			</button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" align="start">
		<Calendar type="single" bind:value onValueChange={() => (open = false)} class="bg-transparent" />
	</Popover.Content>
</Popover.Root>
