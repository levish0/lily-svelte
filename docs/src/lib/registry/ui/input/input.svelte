<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> &
			({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined })
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		...restProps
	}: Props = $props();

	const base =
		'flex h-10 w-full min-w-0 rounded-3xl bg-(--text)/5 px-4 py-2 text-sm tracking-[-0.39px] outline-none transition-colors duration-150 placeholder:text-(--text)/40 hover:bg-(--text)/8 focus-visible:bg-(--text)/12 disabled:pointer-events-none disabled:opacity-50';
</script>

{#if type === 'file'}
	<input
		bind:this={ref}
		data-slot="input"
		class={cn(
			base,
			'file:mr-3 file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium',
			className
		)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<input
		bind:this={ref}
		data-slot="input"
		class={cn(base, className)}
		{type}
		bind:value
		{...restProps}
	/>
{/if}
