---
title: Code Block
description: A syntax-highlighted code block with copy-to-clipboard, powered by shiki.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/code-block
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="code-block-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="code-block" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Install the `shiki` dependencies.</Step>

```bash
npm install -D shiki @shikijs/langs @shikijs/themes
```

<Step>Copy the code-block source from the registry into <code>$lib/components/ui/code-block</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { CodeBlock } from '$lib/components/ui/code-block';

	const code = `console.log('Hello, lily!');`;
</script>

<CodeBlock {code} lang="ts" />
```

The code is highlighted client-side with [shiki](https://shiki.style) in both light and dark themes; until the highlighter loads (and for languages that aren't loaded), the block renders as plain text, so nothing jumps or breaks.

## Languages

To keep the bundle small, only the languages listed in `code-block/shiki.ts` are shipped — `js`, `ts`, `svelte`, `html`, `css`, `json`, and `bash` by default. Add or remove entries to fit your app:

```ts
const langs = [
	() => import('@shikijs/langs/typescript'),
	() => import('@shikijs/langs/rust') // add any shiki grammar
];
```

## Variants

```svelte
<CodeBlock variant="secondary" code="pnpm add shiki" lang="bash" />
```

## Props

- `code` — the raw code to display and copy.
- `lang` — a [shiki language id](https://shiki.style/languages) loaded in `shiki.ts` (defaults to `svelte`).
- `variant` — `default` or `secondary`.
- `class` — extra classes for the outer container.
