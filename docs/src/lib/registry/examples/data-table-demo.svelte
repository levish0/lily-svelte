<script lang="ts">
	import {
		type ColumnDef,
		type SortingState,
		getCoreRowModel,
		getSortedRowModel
	} from '@tanstack/table-core';
	import { createSvelteTable, FlexRender, renderSnippet } from '$lib/registry/ui/data-table';
	import * as Table from '$lib/registry/ui/table';
	import Icon from '@iconify/svelte';

	type Invoice = { invoice: string; status: string; amount: number };

	const data: Invoice[] = [
		{ invoice: 'INV001', status: 'Paid', amount: 250 },
		{ invoice: 'INV002', status: 'Pending', amount: 150 },
		{ invoice: 'INV003', status: 'Unpaid', amount: 350 },
		{ invoice: 'INV004', status: 'Paid', amount: 450 },
		{ invoice: 'INV005', status: 'Pending', amount: 550 }
	];

	let sorting = $state<SortingState>([]);

	const columns: ColumnDef<Invoice>[] = [
		{ accessorKey: 'invoice', header: 'Invoice' },
		{ accessorKey: 'status', header: 'Status' },
		{
			accessorKey: 'amount',
			header: 'Amount',
			cell: ({ row }) => renderSnippet(amountCell, { value: row.original.amount })
		}
	];

	const table = createSvelteTable<Invoice>({
		get data() {
			return data;
		},
		columns,
		state: {
			get sorting() {
				return sorting;
			}
		},
		onSortingChange: (updater) => {
			sorting = typeof updater === 'function' ? updater(sorting) : updater;
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	});
</script>

{#snippet amountCell({ value }: { value: number })}
	<span class="block text-right font-medium">${value.toFixed(2)}</span>
{/snippet}

<div class="w-full max-w-lg">
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row>
					{#each headerGroup.headers as header (header.id)}
						<Table.Head class={header.column.id === 'amount' ? 'text-right' : ''}>
							{#if !header.isPlaceholder}
								<button
									type="button"
									onclick={header.column.getToggleSortingHandler()}
									class="inline-flex items-center gap-1 outline-none transition-colors duration-150 hover:text-(--text)"
								>
									<FlexRender
										content={header.column.columnDef.header}
										context={header.getContext()}
									/>
									{#if header.column.getIsSorted() === 'asc'}
										<Icon icon="heroicons:chevron-up-solid" class="size-3" aria-hidden="true" />
									{:else if header.column.getIsSorted() === 'desc'}
										<Icon icon="heroicons:chevron-down-solid" class="size-3" aria-hidden="true" />
									{:else}
										<Icon
											icon="heroicons:chevron-up-down-solid"
											class="size-3 text-(--text)/40"
											aria-hidden="true"
										/>
									{/if}
								</button>
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				<Table.Row>
					{#each row.getVisibleCells() as cell (cell.id)}
						<Table.Cell class={cell.column.id === 'invoice' ? 'font-medium' : ''}>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</Table.Cell>
					{/each}
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
