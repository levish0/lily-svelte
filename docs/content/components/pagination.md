---
title: Pagination
description: Navigation for splitting content across pages.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/pagination
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="pagination-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="pagination" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the pagination source from the registry into <code>$lib/components/ui/pagination</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import {
		Pagination,
		PaginationContent,
		PaginationItem,
		PaginationLink,
		PaginationPrevButton,
		PaginationNextButton,
		PaginationEllipsis
	} from "$lib/components/ui/pagination";
</script>

<Pagination count={100} perPage={10} page={1}>
	{#snippet children({ pages, currentPage })}
		<PaginationContent>
			<PaginationItem><PaginationPrevButton /></PaginationItem>
			{#each pages as page (page.key)}
				{#if page.type === "ellipsis"}
					<PaginationItem><PaginationEllipsis /></PaginationItem>
				{:else}
					<PaginationItem>
						<PaginationLink {page} isActive={currentPage === page.value} />
					</PaginationItem>
				{/if}
			{/each}
			<PaginationItem><PaginationNextButton /></PaginationItem>
		</PaginationContent>
	{/snippet}
</Pagination>
```
