<script lang="ts" module>
	export {
		displaySize,
		BYTE,
		KILOBYTE,
		MEGABYTE,
		GIGABYTE,
		ACCEPT_IMAGE,
		ACCEPT_VIDEO,
		ACCEPT_AUDIO
	} from './file-drop-zone-utils.js';

	export type FileRejectedReason =
		'Maximum file size exceeded' | 'Maximum files uploaded' | 'File type not allowed';

	export type FileDropZoneProps = {
		ref?: HTMLElement | null;
		class?: string;
		/** When false, only nested `FileDropZone.Trigger` components open the file picker. */
		clickToSelect?: boolean;
		/** Max number of files allowed (across uploads — pass `fileCount`). */
		maxFiles?: number;
		/** Number of files already uploaded (for `maxFiles` accounting). */
		fileCount?: number;
		/** Max size per file, in bytes. */
		maxFileSize?: number;
		/** Comma-separated accept list, e.g. "image/*,.pdf". */
		accept?: string;
		disabled?: boolean;
		onUpload?: (files: File[]) => void | Promise<void>;
		onFileRejected?: (opts: { file: File; reason: FileRejectedReason }) => void;
		children?: import('svelte').Snippet;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { setFileDropZoneContext } from './file-drop-zone-context.svelte.js';
	import Trigger from './file-drop-zone-trigger.svelte';

	let {
		ref = $bindable(null),
		class: className,
		clickToSelect = true,
		maxFiles,
		fileCount,
		maxFileSize,
		accept,
		disabled = false,
		onUpload,
		onFileRejected,
		children
	}: FileDropZoneProps = $props();

	let dragOver = $state(false);
	let uploading = $state(false);
	const uid = $props.id();
	const inputId = `file-drop-zone-${uid}`;

	const canUpload = $derived(
		!disabled &&
			!uploading &&
			!(maxFiles !== undefined && fileCount !== undefined && fileCount >= maxFiles)
	);

	setFileDropZoneContext({
		inputId,
		get clickToSelect() {
			return clickToSelect;
		},
		get canUpload() {
			return canUpload;
		},
		get dragOver() {
			return dragOver;
		},
		get maxFiles() {
			return maxFiles;
		},
		get maxFileSize() {
			return maxFileSize;
		}
	});

	function shouldAccept(file: File, index: number): FileRejectedReason | undefined {
		if (maxFileSize !== undefined && file.size > maxFileSize) return 'Maximum file size exceeded';
		if (maxFiles !== undefined && (fileCount ?? 0) + index + 1 > maxFiles)
			return 'Maximum files uploaded';
		if (!accept) return undefined;

		const patterns = accept.split(',').map((a) => a.trim().toLowerCase());
		const type = file.type.toLowerCase();
		const name = file.name.toLowerCase();
		const ok = patterns.some((p) => {
			// Extension pattern (e.g. ".png") — always available, even when the
			// browser reports an empty MIME type.
			if (p.startsWith('.')) return name.endsWith(p);
			// MIME patterns require a reported type.
			if (type === '') return false;
			if (p.endsWith('/*')) return type.startsWith(p.slice(0, -1)); // "image/*" -> "image/"
			return type === p;
		});
		return ok ? undefined : 'File type not allowed';
	}

	async function process(files: File[]) {
		uploading = true;
		try {
			const valid: File[] = [];
			files.forEach((file, i) => {
				const reason = shouldAccept(file, i);
				if (reason) onFileRejected?.({ file, reason });
				else valid.push(file);
			});
			if (valid.length) await onUpload?.(valid);
		} finally {
			uploading = false;
		}
	}

	async function onchange(e: Event & { currentTarget: HTMLInputElement }) {
		if (disabled) return;
		const input = e.currentTarget;
		const files = input.files;
		if (files) await process(Array.from(files));
		input.value = '';
	}

	async function ondrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		if (!canUpload) return;
		await process(Array.from(e.dataTransfer?.files ?? []));
	}
</script>

<svelte:element
	this={clickToSelect ? 'label' : 'div'}
	bind:this={ref}
	role="group"
	aria-disabled={!canUpload}
	data-slot="file-drop-zone"
	ondragover={(e: DragEvent) => {
		e.preventDefault();
		if (canUpload) dragOver = true;
	}}
	ondragleave={() => (dragOver = false)}
	{ondrop}
	class={cn('group block', disabled && 'pointer-events-none opacity-50', className)}
>
	<input
		id={inputId}
		type="file"
		class="sr-only"
		multiple={maxFiles !== 1}
		{accept}
		disabled={!canUpload}
		{onchange}
	/>

	{#if children}
		{@render children()}
	{:else}
		<Trigger />
	{/if}
</svelte:element>
