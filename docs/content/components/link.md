---
title: Link
description: An inline anchor with the lily underline animation and safe external-link defaults.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/link
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="link-demo">
<div></div>
</ComponentPreview>

`Link` is a plain `<a>` styled with the `.link` utility from the lily base stylesheet — the
underline grows in from the left on hover instead of appearing at once.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="link" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the link source from the registry into <code>$lib/components/ui/link</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { Link } from '$lib/components/ui/link';
</script>

<Link href="/docs">Read the docs</Link>
```

## External links

Any `href` with a scheme (`https://`, `mailto:`, …) or a protocol-relative prefix is treated as
external: it opens in a new tab with `rel="noopener noreferrer"`. Pass `external` to force either
way, or set `target` / `rel` yourself to override.

```svelte
<Link href="https://github.com/levish0/lily-svelte">GitHub</Link>
<Link href="/report" external>Open the report in a new tab</Link>
<Link href="https://example.com" target="_self">Stay in this tab</Link>
```

## Colour

`Link` inherits the surrounding text colour. For lists of links, dim them and brighten on hover.

```svelte
<Link href="/docs/components/button" class="text-(--text)/72 hover:text-(--text)">Button</Link>
```
