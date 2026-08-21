---
title: Avatar
description: A circular image with a graceful fallback, stackable into groups.
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
npx lily-svelte@latest init
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

When `src` is missing or fails to load, the `fallback` is shown instead. Pass a string for
initials, or a snippet for anything else.

```svelte
<Avatar fallback="LL" alt="Levi Laine" />

<Avatar alt="Acme Inc.">
	{#snippet fallback()}
		<Icon icon="heroicons:building-office-solid" class="size-1/2" />
	{/snippet}
</Avatar>
```

With no `fallback` at all, a neutral placeholder icon is used.

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

## Group

`AvatarGroup` overlaps its children and rings each one so they stay separable.

<ComponentPreview name="avatar-group-demo">
<div></div>
</ComponentPreview>

```svelte
<script lang="ts">
	import { Avatar, AvatarGroup, AvatarGroupCount } from '$lib/components/ui/avatar';
</script>

<AvatarGroup>
	<Avatar src="/avatars/lily.png" alt="lily" />
	<Avatar fallback="LL" alt="Levi Laine" />
	<Avatar fallback="MJ" alt="Mia Jung" />
	<AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>
```

Use `spacing` to tune the overlap.

```svelte
<AvatarGroup spacing="tight">...</AvatarGroup>
<AvatarGroup spacing="loose">...</AvatarGroup>
```

The ring is painted with the `--avatar-ring` variable, which defaults to the page background.
On an elevated surface — inside a card, dialog or popover — point it at the surface instead.

```svelte
<AvatarGroup class="[--avatar-ring:var(--bg-elevated)]">...</AvatarGroup>
```

Set `size` on every avatar **and** on `AvatarGroupCount` to keep them aligned.

```svelte
<AvatarGroup>
	<Avatar size="sm" src="/avatars/lily.png" alt="lily" />
	<Avatar size="sm" fallback="LL" alt="Levi Laine" />
	<AvatarGroupCount size="sm">+3</AvatarGroupCount>
</AvatarGroup>
```

## Badge

`AvatarBadge` pins a status dot to the avatar and scales itself to the parent's `size`. It takes
its color from whatever class you give it.

<ComponentPreview name="avatar-badge-demo">
<div></div>
</ComponentPreview>

```svelte
<script lang="ts">
	import { Avatar, AvatarBadge } from '$lib/components/ui/avatar';
</script>

<Avatar src="/avatars/lily.png" alt="lily">
	<AvatarBadge class="bg-emerald-500" />
</Avatar>
```

At `xs` and `sm` the badge renders as a plain dot — any `svg` child is hidden, since there is no
room for a glyph.

The badge is ringed in the same `--avatar-ring` colour the group uses, defaulting to the page
background. Repoint it when the avatar sits on an elevated surface.

```svelte
<Avatar src="/avatars/lily.png" alt="lily" class="[--avatar-ring:var(--bg-elevated)]">
	<AvatarBadge class="bg-emerald-500" />
</Avatar>
```
