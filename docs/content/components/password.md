---
title: Password
description: A password input with a show / hide toggle.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/password
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="password-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="password" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the password source from the registry into <code>$lib/components/ui/password</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { Password } from '$lib/components/ui/password';

	let value = $state('');
</script>

<Password bind:value placeholder="Enter your password" />
```

## Strength meter

Pass `showStrength` to render a strength bar. Scoring uses [`@zxcvbn-ts`](https://github.com/zxcvbn-ts/zxcvbn) (a vetted estimator), not a homemade heuristic.

```svelte
<Password bind:value showStrength />
```

```bash
npm install @zxcvbn-ts/core @zxcvbn-ts/language-common
```

## Reading the score

`result` binds the full [zxcvbn](https://github.com/zxcvbn-ts/zxcvbn) result out, so form
validation can read `score` (0–4) or any of the crack-time estimates. `minScore` marks the input
invalid until the password reaches it.

```svelte
<script lang="ts">
	import type { ZxcvbnResult } from '@zxcvbn-ts/core';

	let value = $state('');
	let result = $state<ZxcvbnResult | null>(null);

	const strongEnough = $derived((result?.score ?? -1) >= 3);
</script>

<Password bind:value bind:result minScore={3} showStrength />
```

Scoring is lazy — zxcvbn only runs when something actually reads the score, so a plain
`<Password />` never pays for it.

## Parts

`<Password />` is the composed happy path. When that layout does not fit — a label with your own
copy, the strength meter somewhere else, a different toggle — build it from the parts instead.

<ComponentPreview name="password-parts-demo">
<div></div>
</ComponentPreview>

```svelte
<script lang="ts">
	import {
		PasswordRoot,
		PasswordInput,
		PasswordToggleVisibility,
		PasswordStrength
	} from '$lib/components/ui/password';

	let value = $state('');
</script>

<PasswordRoot bind:value minScore={2}>
	<div class="relative">
		<PasswordInput placeholder="Enter your password" />
		<PasswordToggleVisibility class="absolute end-1.5 top-1/2 -translate-y-1/2" />
	</div>
	<PasswordStrength labels={['Poor', 'Weak', 'Average', 'Strong', 'Secure']} />
</PasswordRoot>
```

| Part                       | Does                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `PasswordRoot`             | holds `value`, visibility and the score; everything else reads from it                                              |
| `PasswordInput`            | the input, switching between `password` and `text`                                                                  |
| `PasswordToggleVisibility` | the eye button — place it wherever you like, or pass children to replace the icon                                   |
| `PasswordStrength`         | the bar and label; `labels` replaces the copy, `showLabel={false}` drops it, or pass a snippet for your own readout |

Only one field needs the meter? Give that one a `PasswordStrength` and leave it off the other —
each `PasswordRoot` is independent.
