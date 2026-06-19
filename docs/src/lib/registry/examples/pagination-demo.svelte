<script lang="ts">
	import {
		Pagination,
		PaginationContent,
		PaginationItem,
		PaginationLink,
		PaginationPrevButton,
		PaginationNextButton,
		PaginationEllipsis
	} from '$lib/registry/ui/pagination';
</script>

<Pagination count={100} perPage={10} page={1}>
	{#snippet children({ pages, currentPage })}
		<PaginationContent>
			<PaginationItem>
				<PaginationPrevButton />
			</PaginationItem>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				{:else}
					<PaginationItem>
						<PaginationLink {page} isActive={currentPage === page.value} />
					</PaginationItem>
				{/if}
			{/each}
			<PaginationItem>
				<PaginationNextButton />
			</PaginationItem>
		</PaginationContent>
	{/snippet}
</Pagination>
