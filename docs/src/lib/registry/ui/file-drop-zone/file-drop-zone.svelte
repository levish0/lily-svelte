<script lang="ts" module>
	export type FileRejectedReason =
		| 'Maximum file size exceeded'
		| 'Maximum files uploaded'
		| 'File type not allowed';

	export type FileDropZoneProps = {
		ref?: HTMLLabelElement | null;
		class?: string;
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

	/** Human-readable byte size, e.g. 1536 → "1.5 KB". */
	export function displaySize(bytes: number): string {
		const units = ['B', 'KB', 'MB', 'GB'];
		let size = bytes;
		let unit = 0;
		while (size >= 1024 && unit < units.length - 1) {
			size /= 1024;
			unit++;
		}
		return `${Math.round(size * 10) / 10} ${units[unit]}`;
	}
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
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

	const canUpload = $derived(
		!disabled &&
			!uploading &&
			!(maxFiles !== undefined && fileCount !== undefined && fileCount >= maxFiles)
	);

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
		const files = e.currentTarget.files;
		if (files) await process(Array.from(files));
		e.currentTarget.value = '';
	}

	async function ondrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		if (!canUpload) return;
		await process(Array.from(e.dataTransfer?.files ?? []));
	}
</script>

<label
	bind:this={ref}
	aria-disabled={disabled}
	ondragover={(e) => {
		e.preventDefault();
		if (canUpload) dragOver = true;
	}}
	ondragleave={() => (dragOver = false)}
	{ondrop}
	class={cn('group block', disabled && 'pointer-events-none opacity-50', className)}
>
	<input type="file" class="sr-only" multiple={maxFiles !== 1} {accept} {disabled} {onchange} />

	{#if children}
		{@render children()}
	{:else}
		<div
			class={cn(
				'flex h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl bg-(--text)/5 p-6 text-center transition-colors duration-150 hover:bg-(--text)/8',
				dragOver && 'bg-(--text)/8'
			)}
		>
			<div
				class="flex size-12 items-center justify-center rounded-full bg-(--text)/8 text-(--text)/56"
			>
				<Icon icon="heroicons:arrow-up-tray-solid" class="size-6" aria-hidden="true" />
			</div>
			<div class="flex flex-col gap-0.5">
				<span class="text-sm font-medium tracking-[-0.39px]">
					Drag &amp; drop files here, or click to select
				</span>
				{#if maxFiles || maxFileSize}
					<span class="text-xs tracking-[-0.3px] text-(--text)/48">
						{#if maxFiles}Up to {maxFiles} files{/if}
						{#if maxFiles && maxFileSize}&nbsp;({displaySize(maxFileSize)} each){/if}
						{#if maxFileSize && !maxFiles}Maximum {displaySize(maxFileSize)}{/if}
					</span>
				{/if}
			</div>
		</div>
	{/if}
</label>
