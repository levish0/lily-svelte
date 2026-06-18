<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		value = $bindable(),
		placeholder = $bindable(),
		class: className,
		weekdayFormat = 'short',
		locale = 'en-US',
		...restProps
	}: WithoutChildrenOrChild<CalendarPrimitive.RootProps> = $props();
</script>

<CalendarPrimitive.Root
	bind:value={value as never}
	bind:ref
	bind:placeholder
	{weekdayFormat}
	{locale}
	data-slot="calendar"
	class={cn('w-fit rounded-3xl bg-(--bg-elevated) p-4', className)}
	{...restProps}
>
	{#snippet children({ months, weekdays })}
		<CalendarPrimitive.Header class="relative flex w-full items-center justify-between pb-3">
			<CalendarPrimitive.PrevButton
				class="inline-flex size-9 items-center justify-center rounded-2xl text-(--text)/72 outline-none transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)"
			>
				<Icon icon="heroicons:chevron-left-solid" class="size-4" aria-hidden="true" />
			</CalendarPrimitive.PrevButton>
			<CalendarPrimitive.Heading class="text-sm font-medium tracking-[-0.42px]" />
			<CalendarPrimitive.NextButton
				class="inline-flex size-9 items-center justify-center rounded-2xl text-(--text)/72 outline-none transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)"
			>
				<Icon icon="heroicons:chevron-right-solid" class="size-4" aria-hidden="true" />
			</CalendarPrimitive.NextButton>
		</CalendarPrimitive.Header>
		<div class="flex flex-col gap-4 sm:flex-row">
			{#each months as month (month.value)}
				<CalendarPrimitive.Grid class="w-full border-collapse select-none">
					<CalendarPrimitive.GridHead>
						<CalendarPrimitive.GridRow class="flex">
							{#each weekdays as weekday (weekday)}
								<CalendarPrimitive.HeadCell
									class="w-9 pb-1 text-xs font-normal tracking-[-0.3px] text-(--text)/40"
								>
									{weekday.slice(0, 2)}
								</CalendarPrimitive.HeadCell>
							{/each}
						</CalendarPrimitive.GridRow>
					</CalendarPrimitive.GridHead>
					<CalendarPrimitive.GridBody>
						{#each month.weeks as weekDates (weekDates)}
							<CalendarPrimitive.GridRow class="mt-0.5 flex w-full">
								{#each weekDates as date (date)}
									<CalendarPrimitive.Cell {date} month={month.value} class="relative size-9 p-0 text-center">
										<CalendarPrimitive.Day
											class="inline-flex size-9 items-center justify-center rounded-2xl text-sm tracking-[-0.39px] text-(--text)/80 outline-none transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text) data-today:bg-(--text)/8 data-today:font-semibold data-today:text-(--text) data-selected:bg-(--text) data-selected:font-medium data-selected:text-(--bg) data-disabled:pointer-events-none data-disabled:opacity-30 data-unavailable:line-through data-outside-month:opacity-30"
										/>
									</CalendarPrimitive.Cell>
								{/each}
							</CalendarPrimitive.GridRow>
						{/each}
					</CalendarPrimitive.GridBody>
				</CalendarPrimitive.Grid>
			{/each}
		</div>
	{/snippet}
</CalendarPrimitive.Root>
