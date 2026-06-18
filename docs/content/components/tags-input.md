---
title: Tags Input
description: Enter a list of tags as removable chips.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/tags-input
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="tags-input-demo">
<div></div>
</ComponentPreview>

Press <kbd>Enter</kbd> or <kbd>,</kbd> to add a tag, and <kbd>Backspace</kbd> (on an empty field) to remove the last one.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="tags-input" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the tags-input source from the registry into <code>$lib/components/ui/tags-input</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { TagsInput } from "$lib/components/ui/tags-input";

	let value = $state(["svelte", "tailwind"]);
</script>

<TagsInput bind:value placeholder="Add a tag…" />
```
