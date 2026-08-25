---
title: Image Cropper
description: Pick an image, crop it in a dialog, and get the result back as a URL or File.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/image-cropper
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="image-cropper-demo">
<div></div>
</ComponentPreview>

Built on [svelte-easy-crop](https://github.com/ValentinH/svelte-easy-crop). The trigger opens
the file picker, the dialog hosts the cropper, and `Crop` writes the result back to `src`.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="image-cropper" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Install <code>svelte-easy-crop</code>, then copy the image-cropper source into <code>$lib/components/ui/image-cropper</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
	import * as ImageCropper from '$lib/components/ui/image-cropper';

	let src = $state('/avatar.png');
</script>

<ImageCropper.Root bind:src>
	<ImageCropper.UploadTrigger>
		<ImageCropper.Preview />
	</ImageCropper.UploadTrigger>
	<ImageCropper.Dialog>
		<ImageCropper.Cropper />
		<ImageCropper.Zoom />
		<ImageCropper.Controls>
			<ImageCropper.Cancel />
			<ImageCropper.Crop />
		</ImageCropper.Controls>
	</ImageCropper.Dialog>
</ImageCropper.Root>
```

```text
ImageCropper.Root
├── ImageCropper.UploadTrigger
│   └── ImageCropper.Preview
└── ImageCropper.Dialog
    ├── ImageCropper.Cropper
    ├── ImageCropper.Zoom
    └── ImageCropper.Controls
        ├── ImageCropper.Cancel
        └── ImageCropper.Crop
```

`Root` renders the hidden `<input type="file">`; extra attributes such as `accept` or `name`
go straight onto it. `UploadTrigger` is a `<label>` for that input, so anything inside it opens
the picker.

## Getting the result

`src` is updated with an object URL after each crop, and `onCropped` fires with the same URL.
To submit it, turn the URL into a `File`.

```svelte
<script lang="ts">
	import * as ImageCropper from '$lib/components/ui/image-cropper';
	import { getFileFromUrl } from '$lib/components/ui/image-cropper';

	async function upload(url: string) {
		const file = await getFileFromUrl(url, 'avatar.png');
		const body = new FormData();
		body.append('avatar', file);
		await fetch('/api/avatar', { method: 'POST', body });
	}
</script>

<ImageCropper.Root onCropped={upload}>…</ImageCropper.Root>
```

Files whose type is not a browser-renderable image are rejected through `onUnsupportedFile`.

## Shape and preview

`Cropper` takes every `svelte-easy-crop` prop — `cropShape`, `aspect`, `showGrid`, `minZoom`,
`maxZoom`… `Preview` accepts a `child` snippet to draw the current `src` however you like.

<ComponentPreview name="image-cropper-square-demo">
<div></div>
</ComponentPreview>

## Zoom

`Zoom` is a `Slider` bound to the cropper's zoom, alongside pinch and wheel. Leave it out if you
only want gestures.

`min` and `max` default to 1 and 3 to match `svelte-easy-crop`'s own `minZoom` / `maxZoom`. If you
change those on `Cropper`, change them here too, or the slider will stop short of the range the
cropper allows.

```svelte
<ImageCropper.Cropper maxZoom={5} />
<ImageCropper.Zoom max={5} />
```

## Object URLs

Cropping produces an object URL and assigns it to `src`. The cropper revokes the file it was
working from, and revokes an earlier cropped url when a new crop replaces it — but the **latest**
one is left alive, because `src` still points at it. Revoke it yourself once you are done, e.g.
after uploading.
