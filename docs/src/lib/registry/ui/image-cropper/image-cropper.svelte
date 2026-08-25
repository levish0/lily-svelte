<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	export type ImageCropperProps = Omit<HTMLInputAttributes, 'type' | 'children' | 'id'> & {
		id?: string;
		/** Current image url; set to the cropped result after each crop. */
		src?: string;
		onCropped?: (url: string) => void;
		onUnsupportedFile?: (file: File) => void;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import { onDestroy } from 'svelte';
	import { useId } from 'bits-ui';
	import { setImageCropperRoot } from './image-cropper.svelte.js';

	let {
		id = useId(),
		src = $bindable(''),
		onCropped = () => {},
		onUnsupportedFile = () => {},
		accept = 'image/*',
		children,
		...restProps
	}: ImageCropperProps = $props();

	const root = setImageCropperRoot({
		get id() {
			return id;
		},
		get src() {
			return src;
		},
		set src(v) {
			src = v;
		},
		get onCropped() {
			return onCropped;
		},
		get onUnsupportedFile() {
			return onUnsupportedFile;
		}
	});

	onDestroy(root.dispose);
</script>

{@render children?.()}
<!-- restProps first: `name`, `required`, `data-*` pass through, but the attributes the
	 cropper depends on cannot be overwritten from outside -->
<input
	{...restProps}
	{id}
	type="file"
	{accept}
	class="sr-only"
	onchange={(e) => {
		const input = e.currentTarget;
		const file = input.files?.[0];
		// clear so the same file can be picked again
		input.value = '';
		if (file) root.onUpload(file);
	}}
/>
