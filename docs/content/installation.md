---
title: Installation
description: Set up lily in your SvelteKit project and add your first component.
---

<script>
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import PmCommand from "$lib/components/pm-command.svelte";
	import Callout from "$lib/components/callout.svelte";
</script>

lily is a copy-and-own component library: the CLI scaffolds the design tokens and drops component source directly into your project, so you own and can edit every file.

## Prerequisites

lily builds on **Tailwind CSS v4** and **Svelte 5**, so make sure your project has both before you run the CLI.

- **Svelte 5**, since the components are written with runes (`$props`, `$state`, `$derived`).
- **Tailwind CSS v4**, since the design tokens rely on the v4 engine and CSS-first config.

<Callout title="Missing one of these?">

Running `init` on a Tailwind v3 or Svelte 4 project stops with a `requires Tailwind CSS v4 and Svelte v5` error. Upgrade first, or start from the fresh SvelteKit setup below, which includes both.

</Callout>

<Steps>

<Step>Create a project (if you don't have one).</Step>

Spin up a new SvelteKit project with Tailwind CSS v4 already wired up using the [`sv`](https://svelte.dev/docs/cli/overview) CLI. Skip this step if you're adding lily to an existing Svelte 5 + Tailwind v4 project.

<PmCommand type="execute" command="sv create my-app --add tailwindcss" />

<Step>Initialize lily in your project.</Step>

Run the init command once per project. It creates a `components.json` file, wires up the `cn` utility, and writes the lily design tokens directly into your global stylesheet — so you own and can edit every token.

<PmCommand type="execute" command="lily-svelte@latest init" />

<Step>Add components.</Step>

Add any component with the `add` command. The source is copied into `$lib/components/ui/<name>` so you can read and customize it.

<PmCommand type="execute" command="lily-svelte@latest add button" />

You can add several at once:

<PmCommand type="execute" command="lily-svelte@latest add card badge avatar" />

<Step>Use the component.</Step>

Import it from your local `ui` directory and start building.

```svelte
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<Button>Click me</Button>
```

</Steps>

## components.json

`components.json` records your project settings (aliases and the path lily writes components to) so the CLI knows where to place new files on every `add`. You normally do not need to edit it by hand.

## Design tokens

The lily aesthetic comes from a small set of CSS variables (such as `--text`, `--bg`, and `--bg-elevated`) written into your global stylesheet on init, so you can edit them freely. Components reference them with Tailwind's arbitrary-value syntax, like `text-(--text)/72` and `bg-(--bg-elevated)`, so theming stays consistent across every component.
