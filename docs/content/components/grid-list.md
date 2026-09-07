---
title: Grid List
description: Composable grid list with the selected Lily design style.
component: true
---

<script>
 import ComponentPreview from "$lib/components/component-preview.svelte";
 import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="grid-list-demo" />

## Installation

<PMAddComp name="grid-list" />

## Usage

```svelte
<GridList columns={3}><GridListItem onclick={select}>Service</GridListItem></GridList>
```

The installed source follows the style in `lily.json`. The composition preview includes other Lily components; install those separately when building the complete example.
