---
title: Field
description: A form field wrapper — label, control, description, and error message.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/field
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="field-demo">
<div></div>
</ComponentPreview>

Compose `Field` with `FieldLabel`, your control, and either `FieldDescription` or `FieldError`.
Wrap several fields in a `FieldGroup` for consistent spacing.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="field" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the field source from the registry into <code>$lib/components/ui/field</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>
