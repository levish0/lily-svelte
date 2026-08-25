---
title: Form
description: Formsnap and Superforms bindings for lily's Field parts.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/form
  doc: https://formsnap.dev
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="form-demo">
<div></div>
</ComponentPreview>

`Form` wires [Formsnap](https://formsnap.dev) and [Superforms](https://superforms.rocks) to the
[Field](/docs/components/field) parts. The visual work is all done by `Field`; these components
only add the form state — `name`, `id`, `aria-*` and error styling — so a `Form.Label` looks
exactly like a `FieldLabel`.

If you have not used Superforms and Formsnap before, read their docs first — this page assumes
you know how a `superForm` and its `validators` work.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="form" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Install <code>formsnap</code> and <code>sveltekit-superforms</code>, then copy the form source into <code>$lib/components/ui/form</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Anatomy

```svelte
<form method="POST" use:enhance>
	<Form.Field {form} name="…">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label />
				<!-- any input, spread {...props} onto it -->
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button />
</form>
```

## Usage

<Steps>

<Step>Define the schema.</Step>

```ts
// src/routes/settings/schema.ts
import { z } from 'zod';

export const formSchema = z.object({
	username: z.string().min(2).max(50)
});

export type FormSchema = typeof formSchema;
```

<Step>Validate in <code>load</code> and in an action.</Step>

```ts
// src/routes/settings/+page.server.ts
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => ({
	form: await superValidate(zod4(formSchema))
});

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(formSchema));
		if (!form.valid) return fail(400, { form });
		return { form };
	}
};
```

<Step>Build the form.</Step>

```svelte
<!-- src/routes/settings/settings-form.svelte -->
<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { formSchema, type FormSchema } from './schema';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, { validators: zod4Client(formSchema) });
	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input {...props} bind:value={$formData.username} />
			{/snippet}
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Save</Form.Button>
</form>
```

</Steps>

`Form.Control` hands you `props` — `name`, `id` and the accessibility attributes — to spread on
whichever input you use. `Form.Label` is linked to it automatically.

## Fieldset

For a group of controls that share one field — checkboxes, radios — use `Form.Fieldset` with
`Form.Legend`. They render lily's `FieldSet` / `FieldLegend`, and the legend turns red with the
field's errors.

<ComponentPreview name="form-fieldset-demo">
<div></div>
</ComponentPreview>

## Parts

| Part                            | Renders                    | Adds                                      |
| ------------------------------- | -------------------------- | ----------------------------------------- |
| `Form.Field`                    | `Field`                    | field context for `name`                  |
| `Form.ElementField`             | `Field`                    | context for one item of an array field    |
| `Form.Fieldset` / `Form.Legend` | `FieldSet` / `FieldLegend` | group context, error colour on the legend |
| `Form.Control`                  | nothing                    | `props` for the input, `id` wiring        |
| `Form.Label`                    | `FieldLabel`               | `for`, error colour                       |
| `Form.Description`              | `FieldDescription`         | `aria-describedby`                        |
| `Form.FieldErrors`              | `FieldError` per message   | `aria-live`                               |
| `Form.Button`                   | `Button`                   | `type="submit"`                           |
