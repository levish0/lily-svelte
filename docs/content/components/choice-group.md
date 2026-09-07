---
title: Choice Group
description: Composable choice group with the selected Lily design style.
component: true
---

<script>
 import ComponentPreview from "$lib/components/component-preview.svelte";
 import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="choice-group-demo" />

## Large

<ComponentPreview name="choice-group-large-demo" />

## Installation

<PMAddComp name="choice-group" />

## Usage

```svelte
<ChoiceGroup bind:value
	><ChoiceGroupItem value="all">All</ChoiceGroupItem><ChoiceGroupItem value="saved"
		>Saved</ChoiceGroupItem
	></ChoiceGroup
>
```

The installed source follows the style in `lily.json`. The composition preview includes other Lily components; install those separately when building the complete example.
