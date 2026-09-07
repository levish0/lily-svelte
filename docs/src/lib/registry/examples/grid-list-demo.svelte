<script lang="ts">
	import { GridList, GridListItem } from '$lib/registry/ui/grid-list';
	import Icon from '@iconify/svelte';
	let selected = $state('');
	const services = [
		{ label: 'Payments', icon: 'heroicons:credit-card-solid' },
		{ label: 'Savings', icon: 'heroicons:banknotes-solid' },
		{ label: 'Transfers', icon: 'heroicons:arrows-right-left-solid' }
	];
</script>

<div class="w-full max-w-md">
	<GridList>
		{#each services as service (service.label)}
			<GridListItem onclick={() => (selected = service.label)}>
				{#snippet media()}<Icon icon={service.icon} class="size-6 text-(--accent)" />{/snippet}
				{service.label}
			</GridListItem>
		{/each}
	</GridList>
	<p role="status" class="px-6 pt-3 text-sm">{selected ? `${selected} selected` : ''}</p>
</div>
