---
title: Dropdown Menu
description: A menu of actions or options triggered by a button.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/dropdown-menu
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="dropdown-menu-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="dropdown-menu" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the dropdown-menu source from the registry into <code>$lib/components/ui/dropdown-menu</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuLabel
	} from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		{#snippet child({ props })}
			<Button variant="ghost" {...props}>Open</Button>
		{/snippet}
	</DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuLabel>My Account</DropdownMenuLabel>
		<DropdownMenuItem>Profile</DropdownMenuItem>
		<DropdownMenuSeparator />
		<DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>
```
