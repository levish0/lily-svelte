---
title: Command
description: A fast, composable command palette / searchable list.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/command
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="command-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="command" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the command source from the registry into <code>$lib/components/ui/command</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

Focus the search field and type to filter commands. Use **↑ / ↓** to move through matching items and **Enter** to select. Set `loop` on `Command.Root` to wrap at the ends. Attach `onSelect` to each `Command.Item` to run its action; pointer and keyboard selection use the same callback.

```svelte
<script lang="ts">
	import * as Command from '$lib/components/ui/command';
</script>

<Command.Root>
	<Command.Input placeholder="Type a command…" />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			<Command.Item>Calendar</Command.Item>
			<Command.Item>Search</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Root>
```
