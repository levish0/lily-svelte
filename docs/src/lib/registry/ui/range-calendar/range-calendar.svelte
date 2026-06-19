<script lang="ts">
	import Icon from '@iconify/svelte';
	import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		value = $bindable(),
		placeholder = $bindable(),
		class: className,
		weekdayFormat = 'short',
		locale = 'en-US',
		...restProps
	}: WithoutChildrenOrChild<RangeCalendarPrimitive.RootProps> = $props();
</script>

<RangeCalendarPrimitive.Root
	bind:value={value as never}
	bind:ref
	bind:placeholder
	{weekdayFormat}
	{locale}
	data-slot="range-calendar"
	class={cn('w-fit rounded-3xl bg-(--bg-elevated) p-4', className)}
	{...restProps}
>
	{#snippet children({ months, weekdays })}
		<RangeCalendarPrimitive.Header class="relative flex w-full items-center justify-between pb-3">
			<RangeCalendarPrimitive.PrevButton
				class="inline-flex size-9 items-center justify-center rounded-2xl text-(--text)/72 outline-none transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)"
			>
				<Icon icon="heroicons:chevron-left-solid" class="size-4" aria-hidden="true" />
			</RangeCalendarPrimitive.PrevButton>
			<RangeCalendarPrimitive.Heading class="text-sm font-medium tracking-[-0.42px]" />
			<RangeCalendarPrimitive.NextButton
				class="inline-flex size-9 items-center justify-center rounded-2xl text-(--text)/72 outline-none transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)"
			>
				<Icon icon="heroicons:chevron-right-solid" class="size-4" aria-hidden="true" />
			</RangeCalendarPrimitive.NextButton>
		</RangeCalendarPrimitive.Header>
		<div class="flex flex-col gap-4 sm:flex-row">
			{#each months as month (month.value)}
				<RangeCalendarPrimitive.Grid class="w-full border-collapse select-none">
					<RangeCalendarPrimitive.GridHead>
						<RangeCalendarPrimitive.GridRow class="flex">
							{#each weekdays as weekday (weekday)}
								<RangeCalendarPrimitive.HeadCell
									class="w-9 pb-1 text-xs font-normal tracking-[-0.3px] text-(--text)/40"
								>
									{weekday.slice(0, 2)}
								</RangeCalendarPrimitive.HeadCell>
							{/each}
						</RangeCalendarPrimitive.GridRow>
					</RangeCalendarPrimitive.GridHead>
					<RangeCalendarPrimitive.GridBody>
						{#each month.weeks as weekDates (weekDates)}
							<RangeCalendarPrimitive.GridRow class="mt-0.5 flex w-full">
								{#each weekDates as date (date)}
									<RangeCalendarPrimitive.Cell
										{date}
										month={month.value}
										class="relative size-9 p-0 text-center [&:has([data-selected])]:bg-(--text)/8 [&:has([data-selection-end])]:rounded-r-2xl [&:has([data-selection-start])]:rounded-l-2xl"
									>
										<RangeCalendarPrimitive.Day
											class="inline-flex size-9 items-center justify-center rounded-2xl text-sm tracking-[-0.39px] text-(--text)/72 outline-none transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text) data-today:font-semibold not-data-selected:data-today:bg-(--text)/8 not-data-selected:data-today:text-(--text) data-selection-end:bg-(--text) data-selection-end:font-medium data-selection-end:text-(--bg) data-selection-start:bg-(--text) data-selection-start:font-medium data-selection-start:text-(--bg) data-disabled:pointer-events-none data-disabled:opacity-30 data-unavailable:line-through data-outside-month:opacity-30"
										/>
									</RangeCalendarPrimitive.Cell>
								{/each}
							</RangeCalendarPrimitive.GridRow>
						{/each}
					</RangeCalendarPrimitive.GridBody>
				</RangeCalendarPrimitive.Grid>
			{/each}
		</div>
	{/snippet}
</RangeCalendarPrimitive.Root>
