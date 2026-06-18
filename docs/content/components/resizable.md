---
title: Resizable
description: Resizable panel groups with draggable handles.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/resizable
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="resizable-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="resizable" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Add the PaneForge dependency, then copy the source into <code>$lib/components/ui/resizable</code>.</Step>

```bash
npm install paneforge
```

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
</script>

<Resizable.PaneGroup direction="horizontal">
	<Resizable.Pane defaultSize={50}>One</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={50}>Two</Resizable.Pane>
</Resizable.PaneGroup>
```
