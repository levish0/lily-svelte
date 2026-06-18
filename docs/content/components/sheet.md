---
title: Sheet
description: A panel that slides in from the edge of the screen.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/sheet
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="sheet-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="sheet" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the sheet source from the registry into <code>$lib/components/ui/sheet</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import {
		Sheet,
		SheetTrigger,
		SheetContent,
		SheetHeader,
		SheetTitle,
		SheetDescription
	} from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
</script>

<Sheet>
	<SheetTrigger>
		{#snippet child({ props })}
			<Button {...props}>Open</Button>
		{/snippet}
	</SheetTrigger>
	<SheetContent side="right">
		<SheetHeader>
			<SheetTitle>Edit profile</SheetTitle>
			<SheetDescription>Make changes here.</SheetDescription>
		</SheetHeader>
	</SheetContent>
</Sheet>
```

`side` can be `"top"`, `"right"` (default), `"bottom"`, or `"left"`.
