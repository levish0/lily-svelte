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

## Fieldset

Group related fields in a `FieldSet` with a `FieldLegend`. Both are plain HTML `<fieldset>` /
`<legend>` elements, so screen readers announce the legend before each control inside.

<ComponentPreview name="field-set-demo">
<div></div>
</ComponentPreview>

```svelte
<FieldSet>
	<FieldLegend>Shipping address</FieldLegend>
	<Field>
		<FieldLabel for="street">Street</FieldLabel>
		<Input id="street" />
	</Field>
</FieldSet>
```

## Separator

`FieldSeparator` draws a divider between fields, optionally with a short label on the line.

```svelte
<FieldSeparator />
<FieldSeparator>Or</FieldSeparator>
```

The label covers the line with the page background. Inside a card or dialog, repaint it with the
surface colour.

```svelte
<FieldSeparator class="[&>span]:bg-(--bg-elevated)">Or</FieldSeparator>
```
