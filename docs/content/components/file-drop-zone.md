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

## Custom trigger

Choose a file using a dedicated trigger.

<ComponentPreview name="file-drop-zone-trigger-demo" />

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="file-drop-zone" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the file-drop-zone source from the registry into <code>$lib/components/ui/file-drop-zone</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import { FileDropZone } from '$lib/components/ui/file-drop-zone';

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

Use compound mode when only a specific control should open the file picker. This keeps adjacent
buttons, such as delete or retry actions, independent from file selection.

```svelte
<script lang="ts">
	import * as FileDropZone from '$lib/components/ui/file-drop-zone';
	import { Button } from '$lib/components/ui/button';
</script>

<FileDropZone.Root clickToSelect={false} maxFiles={1} onUpload={handleUpload}>
	<div class="flex items-center gap-3">
		<span class="flex-1">Current file.png</span>
		<FileDropZone.Trigger>
			{#snippet child({ props })}<Button {...props} size="md">Change</Button>{/snippet}
		</FileDropZone.Trigger>
		<Button variant="ghost" size="md" onclick={deleteFile}>Delete</Button>
	</div>
</FileDropZone.Root>
```

## Props

- `accept` — comma-separated list, e.g. `"image/*,.pdf"`.
- `maxFiles` / `fileCount` — limit the total number of files (pass the current count).
- `maxFileSize` — maximum bytes per file.
- `onUpload(files)` — receives the accepted files.
- `onFileRejected({ file, reason })` — called per rejected file.
- `clickToSelect` — when `true` (default), the whole root opens the picker; set it to `false` and
  use one or more `FileDropZone.Trigger` components for compound layouts.

`FileDropZone.Trigger` accepts a `child` snippet with button props for composing a Lily Button. The supplied disabled state and click handler preserve upload restrictions and keyboard activation.
