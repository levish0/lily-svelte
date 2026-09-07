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
	class={cn('lily-calendar-1 w-fit rounded-3xl bg-(--bg-elevated) p-4', className)}
	{...restProps}
>
	{#snippet children({ months, weekdays })}
		<CalendarPrimitive.Header
			class={cn('lily-calendar-2 relative flex w-full items-center justify-between pb-3')}
		>
			<CalendarPrimitive.PrevButton
				class={cn(
					'lily-calendar-3 inline-flex size-9 items-center justify-center rounded-2xl text-(--text)/72 transition-colors duration-150 outline-none hover:bg-(--text)/8 hover:text-(--text)'
				)}
			>
				<Icon
					icon="heroicons:chevron-left-solid"
					class={cn('lily-calendar-4 size-4')}
					aria-hidden="true"
				/>
			</CalendarPrimitive.PrevButton>
			<CalendarPrimitive.Heading
				class={cn('lily-calendar-5 text-sm font-medium tracking-[-0.42px]')}
			/>
			<CalendarPrimitive.NextButton
				class={cn(
					'lily-calendar-6 inline-flex size-9 items-center justify-center rounded-2xl text-(--text)/72 transition-colors duration-150 outline-none hover:bg-(--text)/8 hover:text-(--text)'
				)}
			>
				<Icon
					icon="heroicons:chevron-right-solid"
					class={cn('lily-calendar-7 size-4')}
					aria-hidden="true"
				/>
			</CalendarPrimitive.NextButton>
		</CalendarPrimitive.Header>
		<div class={cn('lily-calendar-8 flex flex-col gap-4 sm:flex-row')}>
			{#each months as month (month.value)}
				<CalendarPrimitive.Grid class={cn('lily-calendar-9 w-full border-collapse select-none')}>
					<CalendarPrimitive.GridHead>
						<CalendarPrimitive.GridRow class={cn('lily-calendar-10 flex')}>
							{#each weekdays as weekday (weekday)}
								<CalendarPrimitive.HeadCell
									class={cn(
										'lily-calendar-11 w-9 pb-1 text-xs font-normal tracking-[-0.3px] text-(--text)/40'
									)}
								>
									{weekday.slice(0, 2)}
								</CalendarPrimitive.HeadCell>
							{/each}
						</CalendarPrimitive.GridRow>
					</CalendarPrimitive.GridHead>
					<CalendarPrimitive.GridBody>
						{#each month.weeks as weekDates (weekDates)}
							<CalendarPrimitive.GridRow class={cn('lily-calendar-12 mt-0.5 flex w-full')}>
								{#each weekDates as date (date)}
									<CalendarPrimitive.Cell
										{date}
										month={month.value}
										class={cn('lily-calendar-13 relative size-9 p-0 text-center')}
									>
										<CalendarPrimitive.Day
											class={cn(
												'lily-calendar-14 inline-flex size-9 items-center justify-center rounded-2xl text-sm tracking-[-0.39px] text-(--text)/72 transition-colors duration-150 outline-none hover:bg-(--text)/8 hover:text-(--text) data-outside-month:opacity-30 data-selected:bg-(--text) data-selected:font-medium data-selected:text-(--bg) data-today:bg-(--text)/8 data-today:font-semibold data-today:text-(--text) data-unavailable:line-through data-disabled:pointer-events-none data-disabled:opacity-30'
											)}
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
