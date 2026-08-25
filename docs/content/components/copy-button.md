---
title: Copy Button
description: A button that copies text to the clipboard and confirms with a check.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/copy-button
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="copy-button-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="copy-button" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the copy-button source into <code>$lib/components/ui/copy-button</code>, and the <code>use-clipboard</code> hook into <code>$lib/hooks</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { CopyButton } from '$lib/components/ui/copy-button';
</script>

<CopyButton text="Hello, lily!" />
```

`CopyButton` is a `Button` — `variant`, `size` and every button attribute pass through. It
defaults to the `ghost` variant and the `icon` size.

## With a label

Pass children to show text next to the icon; the size switches to `default` so there is room.

<ComponentPreview name="copy-button-text-demo">
<div></div>
</ComponentPreview>

```svelte
<CopyButton text={command} size="sm">
	{#snippet icon()}
		<Icon icon="heroicons:command-line-solid" />
	{/snippet}
	<span class="font-mono text-xs">{command}</span>
</CopyButton>
```

## Feedback

After a copy the icon swaps to a check (or a cross if the clipboard was unavailable) for `delay`
milliseconds — 1500 by default. `onCopy` receives the same `'success' | 'failure'` status.

```svelte
<CopyButton text={token} delay={800} onCopy={(status) => console.log(status)} />
```

## The hook

The button is built on `UseClipboard`, which you can use on its own.

```svelte
<script lang="ts">
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';

	const clipboard = new UseClipboard();
</script>

<button onclick={() => clipboard.copy('hello')}>
	{clipboard.copied ? 'Copied' : 'Copy'}
</button>
```
