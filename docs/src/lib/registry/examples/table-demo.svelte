<script lang="ts">
	import * as Table from '$lib/registry/ui/table';

	const invoices = [
		{ invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
		{ invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
		{ invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' }
	];
</script>

<div class="w-full max-w-lg">
	<Table.Root>
		<Table.Caption>A list of your recent invoices.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head>Invoice</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head>Method</Table.Head>
				<Table.Head class="text-right">Amount</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each invoices as row (row.invoice)}
				<Table.Row>
					<Table.Cell class="font-medium">{row.invoice}</Table.Cell>
					<Table.Cell>{row.status}</Table.Cell>
					<Table.Cell>{row.method}</Table.Cell>
					<Table.Cell class="text-right">{row.amount}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
