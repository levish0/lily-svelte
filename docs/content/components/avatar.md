---
title: Avatar
description: A circular image with a graceful fallback across five sizes.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/avatar
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="avatar-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="avatar" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the avatar source from the registry into <code>$lib/components/ui/avatar</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { Avatar } from '$lib/components/ui/avatar';
</script>

<Avatar src="/avatars/lily.png" alt="lily" />
```

## Fallback

When `src` is missing or fails to load, a neutral placeholder icon is shown.

```svelte
<Avatar alt="Unknown user" />
```

## Sizes

```svelte
<Avatar size="xs" alt="xs" />
<Avatar size="sm" alt="sm" />
<Avatar alt="default" />
<Avatar size="lg" alt="lg" />
<Avatar size="xl" alt="xl" />
```
