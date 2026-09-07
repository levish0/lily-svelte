---
title: Action Footer
description: Composable action footer with the selected Lily design style.
component: true
---

<script>
 import ComponentPreview from "$lib/components/component-preview.svelte";
 import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="action-footer-demo" class="p-4 sm:p-6" />

## Two actions

Use a secondary action alongside the primary action.

<ComponentPreview name="action-footer-double-demo" class="p-4 sm:p-6" />

## Installation

<PMAddComp name="action-footer" />

## Usage

```svelte
<ActionFooter><Button>Continue</Button></ActionFooter>
```

The installed source follows the style in `lily.json`. The composition preview includes other Lily components; install those separately when building the complete example.
