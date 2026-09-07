---
title: Search Field
description: Composable search field with the selected Lily design style.
component: true
---

<script>
 import ComponentPreview from "$lib/components/component-preview.svelte";
 import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="search-field-demo" />

## Disabled

<ComponentPreview name="search-field-disabled-demo" />

## Installation

<PMAddComp name="search-field" />

## Usage

```svelte
<SearchField aria-label="Search" bind:value={query} />
```

The installed source follows the style in `lily.json`. The composition preview includes other Lily components; install those separately when building the complete example.
