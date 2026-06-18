---
title: Alert
description: A callout for drawing attention to important messages.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/alert
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="alert-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="alert" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the alert source from the registry into <code>$lib/components/ui/alert</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { Alert, AlertTitle, AlertDescription } from "$lib/components/ui/alert";
</script>

<Alert>
	<AlertTitle>Heads up!</AlertTitle>
	<AlertDescription>You can add components using the CLI.</AlertDescription>
</Alert>
```

Use `variant="destructive"` for errors. An optional `<svg>` as the first child renders as the leading icon.
