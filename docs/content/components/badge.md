---
title: Badge
description: A small pill for labels, counts, and statuses.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/badge
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="badge-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="badge" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the badge source from the registry into <code>$lib/components/ui/badge</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
</script>

<Badge>New</Badge>
```

## Variants

Badges are usually status labels, and status has weight — `deleted` and `draft` should not read
the same. `solid`, `soft` and `quiet` step down in weight; `destructive` is a meaning, not a
weight.

```svelte
<Badge variant="solid">Live</Badge>
<Badge>Draft</Badge>
<Badge variant="quiet">Archived</Badge>
<Badge variant="destructive">Deleted</Badge>
```

`soft` is the default, so a badge you drop in without thinking stays out of the way.

Every level keeps a fill, including `quiet`. Unlike a [Button](/docs/components/button), a badge
has no hover state to fall back on, so a fill-less pill is just text with unexplained padding —
in a table cell it stops reading as a status. That is also why `quiet` dims the label as well as
the fill: moving both axes keeps the step legible when the fills are only three points apart.

## Link

Pass an `href` to render the badge as an anchor. Only then does it pick up a hover treatment, so
a static status label never looks clickable.

```svelte
<Badge href="/changelog">v1.0</Badge>
```

## badgeVariants

To style something that is not a `Badge`, use `badgeVariants()`.

```svelte
<script lang="ts">
	import { badgeVariants } from '$lib/components/ui/badge';
</script>

<span class={badgeVariants({ variant: 'quiet' })}>Archived</span>
```
