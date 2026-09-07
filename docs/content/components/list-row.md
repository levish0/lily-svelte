---
title: List Row
description: Composable list row with the selected Lily design style.
component: true
---

<script>
 import ComponentPreview from "$lib/components/component-preview.svelte";
 import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="list-row-demo" class="p-4 sm:p-6" />

## Installation

<PMAddComp name="list-row" />

## Usage

```svelte
<ListRow title="Payment" description="Today" density="comfortable" />
```

The installed source follows the style in `lily.json`. The composition preview includes other Lily components; install those separately when building the complete example.

For a complete composed screen, see the [Workshop block](/blocks/workshop).
