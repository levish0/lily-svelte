---
title: Input OTP
description: An accessible one-time-password input with copy-paste support.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/input-otp
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="input-otp-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="input-otp" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the input-otp source from the registry into <code>$lib/components/ui/input-otp</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import {
		InputOTP,
		InputOTPGroup,
		InputOTPSlot,
		InputOTPSeparator
	} from '$lib/components/ui/input-otp';
</script>

<InputOTP maxlength={6}>
	{#snippet children({ cells })}
		<InputOTPGroup>
			{#each cells.slice(0, 3) as cell (cell)}
				<InputOTPSlot {cell} />
			{/each}
		</InputOTPGroup>
		<InputOTPSeparator />
		<InputOTPGroup>
			{#each cells.slice(3, 6) as cell (cell)}
				<InputOTPSlot {cell} />
			{/each}
		</InputOTPGroup>
	{/snippet}
</InputOTP>
```
