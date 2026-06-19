---
title: Drawer
description: A panel that slides in from the edge of the screen, with drag-to-dismiss.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/drawer
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="drawer-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="drawer" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Add the `vaul-svelte` dependency.</Step>

```bash
npm install vaul-svelte@next
```

<Step>Copy the drawer source from the registry into <code>$lib/components/ui/drawer</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>
