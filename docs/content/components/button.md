---
title: Button
description: A clickable interactive element with the lily click-scale feel.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/button
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="button-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="button" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the button source from the registry into <code>$lib/components/ui/button</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<Button>Click me</Button>
```

## Variants

`solid`, `soft` and `ghost` are three weights of the same button — loudest to quietest. Give a
screen one `solid` button and let everything else step down from there. `destructive` is a
meaning, not a weight, so it sits outside the ladder.

```svelte
<Button>Solid</Button>
<Button variant="soft">Soft</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
```

`ghost` is transparent until hovered, which is what a row of icon buttons needs — with a resting
tint, a toolbar of eight reads as eight filled chips.

## Sizes

```svelte
<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>
```

Icon-only buttons are square and come in the same three steps, so they line up with the text
button beside them.

<ComponentPreview name="button-sizes-demo">
<div></div>
</ComponentPreview>

```svelte
<Button size="icon-sm" variant="ghost" aria-label="Add">…</Button>
<Button size="icon" variant="ghost" aria-label="Add">…</Button>
<Button size="icon-lg" variant="ghost" aria-label="Add">…</Button>
```

## Loading

`loading` shows a spinner and swallows clicks while an action is in flight.

<ComponentPreview name="button-loading-demo">
<div></div>
</ComponentPreview>

```svelte
<script lang="ts">
	let saving = $state(false);

	async function save() {
		saving = true;
		await fetch('/api/save', { method: 'POST' });
		saving = false;
	}
</script>

<Button loading={saving} onclick={save}>Save changes</Button>
```

Three things it handles that a hand-rolled `disabled={saving}` does not:

- **The button does not resize.** The label keeps its box and simply stops painting, so the
  spinner sits on top without the width jumping.
- **Focus is kept.** A `disabled` button loses focus the moment the action starts, stranding a
  keyboard user at the top of the page. `loading` uses `aria-disabled` + `aria-busy` instead and
  swallows the click, so focus stays put and screen readers announce the busy state.
- **Fast actions do not flash.** The spinner waits `loadingDelay` (150ms) before appearing, so
  anything that resolves quickly shows nothing at all.

```svelte
<!-- for an action you know is slow, show it immediately -->
<Button loading={uploading} loadingDelay={0}>Upload</Button>
```

## Link

A `Button` renders as an `<a>` when you pass an `href`.

```svelte
<Button href="/docs">Documentation</Button>
```

## buttonVariants

To make something that is not a `Button` look like one, use `buttonVariants()`.

```svelte
<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
</script>

<a href="/docs" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Docs</a>

<Dialog.Trigger class={buttonVariants({ variant: 'soft' })}>Open</Dialog.Trigger>
```

It takes the same `variant` and `size` values as the component, plus a `class` that is merged
last.
