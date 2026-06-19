---
title: PM Command
description: A package-manager-aware command block with npm, pnpm, yarn, and bun tabs and copy-to-clipboard.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/pm-command
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="pm-command-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="pm-command" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Install the `package-manager-detector` dependency.</Step>

```bash
npm install package-manager-detector
```

<Step>Copy the pm-command source from the registry into <code>$lib/components/ui/pm-command</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { PMCommand } from '$lib/components/ui/pm-command';
</script>

<PMCommand command="execute" args={['lily-svelte@latest', 'add', 'button']} />
```

The `command` and `args` are passed to [`package-manager-detector`](https://github.com/antfu-collective/package-manager-detector), so the right runner is shown for each tab — `pnpm dlx`, `npm install`, `yarn add`, and so on.

## Install command

Use `command="install"` to render a dependency-install command.

```svelte
<PMCommand command="install" args={['bits-ui']} />
```

## Variants

```svelte
<PMCommand variant="secondary" command="install" args={['bits-ui']} />
```

## Bound agent

The selected package manager is bindable, so you can keep several blocks in sync.

```svelte
<script lang="ts">
	import { PMCommand } from '$lib/components/ui/pm-command';
	import type { Agent } from 'package-manager-detector';

	let agent = $state<Agent>('pnpm');
</script>

<PMCommand bind:agent command="execute" args={['lily-svelte@latest', 'init']} />
<PMCommand bind:agent command="install" args={['bits-ui']} />
```

## Props

- `command` — the [package-manager-detector](https://github.com/antfu-collective/package-manager-detector) command kind, e.g. `execute` or `install`.
- `args` — everything after the runner, e.g. `['lily-svelte@latest', 'add', 'button']`.
- `agent` — the selected package manager (`bindable`, defaults to `npm`).
- `agents` — the package managers shown as tabs (defaults to `['npm', 'pnpm', 'yarn', 'bun']`).
- `variant` — `default` or `secondary`.
- `class` — extra classes for the outer container.
