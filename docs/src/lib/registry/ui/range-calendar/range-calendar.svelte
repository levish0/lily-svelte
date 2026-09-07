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
	class={cn('lily-range-calendar-1 w-fit rounded-3xl bg-(--bg-elevated) p-4', className)}
	{...restProps}
>
	{#snippet children({ months, weekdays })}
		<RangeCalendarPrimitive.Header
			class={cn('lily-range-calendar-2 relative flex w-full items-center justify-between pb-3')}
		>
			<RangeCalendarPrimitive.PrevButton
				class={cn(
					'lily-range-calendar-3 inline-flex size-9 items-center justify-center rounded-2xl text-(--text)/72 transition-colors duration-150 outline-none hover:bg-(--text)/8 hover:text-(--text)'
				)}
			>
				<Icon
					icon="heroicons:chevron-left-solid"
					class={cn('lily-range-calendar-4 size-4')}
					aria-hidden="true"
				/>
			</RangeCalendarPrimitive.PrevButton>
			<RangeCalendarPrimitive.Heading
				class={cn('lily-range-calendar-5 text-sm font-medium tracking-[-0.42px]')}
			/>
			<RangeCalendarPrimitive.NextButton
				class={cn(
					'lily-range-calendar-6 inline-flex size-9 items-center justify-center rounded-2xl text-(--text)/72 transition-colors duration-150 outline-none hover:bg-(--text)/8 hover:text-(--text)'
				)}
			>
				<Icon
					icon="heroicons:chevron-right-solid"
					class={cn('lily-range-calendar-7 size-4')}
					aria-hidden="true"
				/>
			</RangeCalendarPrimitive.NextButton>
		</RangeCalendarPrimitive.Header>
		<div class={cn('lily-range-calendar-8 flex flex-col gap-4 sm:flex-row')}>
			{#each months as month (month.value)}
				<RangeCalendarPrimitive.Grid
					class={cn('lily-range-calendar-9 w-full border-collapse select-none')}
				>
					<RangeCalendarPrimitive.GridHead>
						<RangeCalendarPrimitive.GridRow class={cn('lily-range-calendar-10 flex')}>
							{#each weekdays as weekday (weekday)}
								<RangeCalendarPrimitive.HeadCell
									class={cn(
										'lily-range-calendar-11 w-9 pb-1 text-xs font-normal tracking-[-0.3px] text-(--text)/40'
									)}
								>
									{weekday.slice(0, 2)}
								</RangeCalendarPrimitive.HeadCell>
							{/each}
						</RangeCalendarPrimitive.GridRow>
					</RangeCalendarPrimitive.GridHead>
					<RangeCalendarPrimitive.GridBody>
						{#each month.weeks as weekDates (weekDates)}
							<RangeCalendarPrimitive.GridRow
								class={cn('lily-range-calendar-12 mt-0.5 flex w-full')}
							>
								{#each weekDates as date (date)}
									<RangeCalendarPrimitive.Cell
										{date}
										month={month.value}
										class={cn(
											'lily-range-calendar-13 relative size-9 p-0 text-center [&:has([data-selected])]:bg-(--text)/8 [&:has([data-selection-end])]:rounded-r-2xl [&:has([data-selection-start])]:rounded-l-2xl'
										)}
									>
										<RangeCalendarPrimitive.Day
											class={cn(
												'lily-range-calendar-14 inline-flex size-9 items-center justify-center rounded-2xl text-sm tracking-[-0.39px] text-(--text)/72 transition-colors duration-150 outline-none hover:bg-(--text)/8 hover:text-(--text) data-outside-month:opacity-30 data-selection-end:bg-(--text) data-selection-end:font-medium data-selection-end:text-(--bg) data-selection-start:bg-(--text) data-selection-start:font-medium data-selection-start:text-(--bg) data-today:font-semibold not-data-selected:data-today:bg-(--text)/8 not-data-selected:data-today:text-(--text) data-unavailable:line-through data-disabled:pointer-events-none data-disabled:opacity-30'
											)}
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
