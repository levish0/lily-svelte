---
title: Phone Input
description: An international phone number input with country selector and validation.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/phone-input
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="phone-input-demo">
<div></div>
</ComponentPreview>

Parsing, formatting, and validation are handled by [`svelte-tel-input`](https://github.com/gyurielf/svelte-tel-input) (a libphonenumber wrapper) — lily only styles it.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="phone-input" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Add the dependencies, then copy the source into <code>$lib/components/ui/phone-input</code>.</Step>

```bash
npm install svelte-tel-input country-flag-icons
```

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { PhoneInput } from "$lib/components/ui/phone-input";

	let value = $state("");
	let valid = $state(true);
</script>

<PhoneInput defaultCountry="US" bind:value bind:valid />
```
