---
title: Tabs
description: Switch between related panels of content.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/tabs
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="tabs-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="tabs" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the tabs source from the registry into <code>$lib/components/ui/tabs</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { Tabs, TabsList, TabsTrigger, TabsContent } from "$lib/components/ui/tabs";
</script>

<Tabs value="account">
	<TabsList>
		<TabsTrigger value="account">Account</TabsTrigger>
		<TabsTrigger value="password">Password</TabsTrigger>
	</TabsList>
	<TabsContent value="account">Account settings.</TabsContent>
	<TabsContent value="password">Password settings.</TabsContent>
</Tabs>
```
