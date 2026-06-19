---
title: Context Menu
description: A menu shown on right-click, anchored to the pointer.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/context-menu
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="context-menu-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="context-menu" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the context-menu source from the registry into <code>$lib/components/ui/context-menu</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import {
		ContextMenu,
		ContextMenuTrigger,
		ContextMenuContent,
		ContextMenuItem,
		ContextMenuSeparator
	} from '$lib/components/ui/context-menu';
</script>

<ContextMenu>
	<ContextMenuTrigger>Right-click here</ContextMenuTrigger>
	<ContextMenuContent>
		<ContextMenuItem>Back</ContextMenuItem>
		<ContextMenuSeparator />
		<ContextMenuItem variant="destructive">Delete</ContextMenuItem>
	</ContextMenuContent>
</ContextMenu>
```
