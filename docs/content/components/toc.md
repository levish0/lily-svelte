---
title: Table of Contents
description: A scroll-spy outline with a proximity-focus animation — the active heading blooms.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/toc
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="toc-demo">
<div></div>
</ComponentPreview>

As you scroll, the heading you're reading grows and brightens while neighbours shrink and fade —
the same focus motion used in this site's own "On this page" sidebar.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="toc" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the toc source from the registry into <code>$lib/components/ui/toc</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>
