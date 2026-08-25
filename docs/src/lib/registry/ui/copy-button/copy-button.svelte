<script lang="ts" module>
	import type { ButtonProps } from '$lib/registry/ui/button/index.js';
	import type { Snippet } from 'svelte';
	import type { ClipboardStatus } from '$lib/registry/hooks/use-clipboard.svelte.js';

	export type CopyButtonProps = Omit<ButtonProps, 'href' | 'type'> & {
		/** The text written to the clipboard. */
		text: string;
		/** Replaces the default copy icon in the idle state. */
		icon?: Snippet;
		/** ms the check / cross stays before returning to the idle icon. Defaults to 2000. */
		delay?: number;
		onCopy?: (status: ClipboardStatus) => void;
	};
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/registry/ui/button/index.js';
	import { UseClipboard } from '$lib/registry/hooks/use-clipboard.svelte.js';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		text,
		icon,
		delay,
		variant = 'ghost',
		size,
		onCopy,
		onclick,
		class: className,
		children,
		...restProps
	}: CopyButtonProps = $props();

	type ButtonClick = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

	const clipboard = new UseClipboard({
		get delay() {
			return delay;
		}
	});

	// icon-only unless there is a label to sit next to the icon
	const resolvedSize = $derived(size ?? (children ? 'default' : 'icon'));
	const label = $derived(
		clipboard.status === 'success'
			? 'Copied'
			: clipboard.status === 'failure'
				? 'Failed to copy'
				: 'Copy'
	);
</script>

<Button
	bind:ref
	{variant}
	size={resolvedSize}
	data-slot="copy-button"
	data-status={clipboard.status}
	aria-label={children ? undefined : label}
	class={cn('gap-2 [&_svg]:size-4', className)}
	onclick={async (e) => {
		onclick?.(e as ButtonClick);
		onCopy?.(await clipboard.copy(text));
	}}
	{...restProps}
>
	{#if clipboard.status === 'success'}
		<Icon icon="heroicons:check-solid" aria-hidden="true" />
	{:else if clipboard.status === 'failure'}
		<Icon icon="heroicons:x-mark-solid" aria-hidden="true" />
	{:else if icon}
		{@render icon()}
	{:else}
		<Icon icon="heroicons:clipboard-document-solid" aria-hidden="true" />
	{/if}
	{@render children?.()}
</Button>
