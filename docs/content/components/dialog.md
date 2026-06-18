---
title: Dialog
description: A modal window overlaid on the page, built on Bits UI.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/dialog
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="dialog-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="dialog" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the dialog source from the registry into <code>$lib/components/ui/dialog</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import {
		Dialog,
		DialogTrigger,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription
	} from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
</script>

<Dialog>
	<DialogTrigger>
		{#snippet child({ props })}
			<Button {...props}>Open</Button>
		{/snippet}
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Are you sure?</DialogTitle>
			<DialogDescription>This action cannot be undone.</DialogDescription>
		</DialogHeader>
	</DialogContent>
</Dialog>
```
