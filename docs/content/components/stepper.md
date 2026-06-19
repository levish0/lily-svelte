---
title: Stepper
description: A horizontal progress indicator for multi-step flows.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/stepper
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="stepper-demo">
<div></div>
</ComponentPreview>

## Usage

Compose `Stepper.Root` (bind the active `step`), a `Stepper.Nav`, and a `Stepper.Item` per step.
`Stepper.Next` / `Stepper.Previous` drive navigation and disable themselves at the ends.

```svelte
<script lang="ts">
	import * as Stepper from '$lib/components/ui/stepper';

	let step = $state(1);
	const steps = ['Account', 'Profile', 'Finish'];
</script>

<Stepper.Root bind:step>
	<Stepper.Nav>
		{#each steps as title, i (title)}
			<Stepper.Item>
				<Stepper.Trigger>
					<Stepper.Indicator>{i + 1}</Stepper.Indicator>
					<Stepper.Title>{title}</Stepper.Title>
				</Stepper.Trigger>
				<Stepper.Separator />
			</Stepper.Item>
		{/each}
	</Stepper.Nav>

	<div class="mt-8 flex justify-between">
		<Stepper.Previous size="sm">Back</Stepper.Previous>
		<Stepper.Next size="sm">Next</Stepper.Next>
	</div>
</Stepper.Root>
```

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="stepper" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the stepper source from the registry into <code>$lib/components/ui/stepper</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>
