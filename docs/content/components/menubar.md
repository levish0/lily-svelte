---
title: Menubar
description: A horizontal bar of dropdown menus, like a desktop app menu.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/menubar
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="menubar-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="menubar" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the menubar source from the registry into <code>$lib/components/ui/menubar</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar';
</script>

<Menubar.Root>
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut></Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>Share</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
```
