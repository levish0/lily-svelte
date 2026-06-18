---
title: Card
description: A rounded, elevated surface for grouping related content.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/card
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="card-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="card" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the card source from the registry into <code>$lib/components/ui/card</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent,
		CardFooter
	} from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
</script>

<Card>
	<CardHeader>
		<CardTitle>Upgrade to Pro</CardTitle>
		<CardDescription>Unlock every component and priority support.</CardDescription>
	</CardHeader>
	<CardContent>
		<p class="text-sm tracking-[-0.39px] text-(--text)/72">
			Your trial ends in 7 days. Upgrade now to keep going.
		</p>
	</CardContent>
	<CardFooter>
		<Button>Upgrade</Button>
		<Button variant="ghost">Maybe later</Button>
	</CardFooter>
</Card>
```

## Composition

Every part is optional and accepts a `class` prop, so you can compose only what you need.

```svelte
<Card class="rounded-3xl">
	<CardHeader>
		<CardTitle>Notifications</CardTitle>
	</CardHeader>
	<CardContent>You have 3 unread messages.</CardContent>
</Card>
```
