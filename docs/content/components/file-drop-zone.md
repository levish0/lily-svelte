---
title: File Drop Zone
description: A drag-and-drop area for uploading files, with size and type validation.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/file-drop-zone
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="file-drop-zone-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="file-drop-zone" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily init
```

<Step>Copy the file-drop-zone source from the registry into <code>$lib/components/ui/file-drop-zone</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { FileDropZone } from "$lib/components/ui/file-drop-zone";

	let files = $state<string[]>([]);
</script>

<FileDropZone
	accept="image/*"
	maxFiles={5}
	fileCount={files.length}
	maxFileSize={5 * 1024 * 1024}
	onUpload={(uploaded) => (files = [...files, ...uploaded.map((f) => f.name)])}
	onFileRejected={({ file, reason }) => console.warn(reason, file.name)}
/>
```

## Props

- `accept` — comma-separated list, e.g. `"image/*,.pdf"`.
- `maxFiles` / `fileCount` — limit the total number of files (pass the current count).
- `maxFileSize` — maximum bytes per file.
- `onUpload(files)` — receives the accepted files.
- `onFileRejected({ file, reason })` — called per rejected file.
