<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		value = $bindable<string[]>([]),
		placeholder = 'Add a tag…',
		maxTags,
		disabled = false,
		class: className
	}: {
		value?: string[];
		placeholder?: string;
		maxTags?: number;
		disabled?: boolean;
		class?: string;
	} = $props();

	let input = $state('');
	let inputEl = $state<HTMLInputElement>();

	const atMax = $derived(maxTags !== undefined && value.length >= maxTags);

	function addTag() {
		const tag = input.trim();
		if (!tag || atMax || value.includes(tag)) {
			input = '';
			return;
		}
		value = [...value, tag];
		input = '';
	}

	function removeTag(index: number) {
		value = value.filter((_, i) => i !== index);
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			addTag();
		} else if (e.key === 'Backspace' && input === '' && value.length) {
			removeTag(value.length - 1);
		}
	}
</script>

<div
	data-slot="tags-input"
	class={cn(
		'flex w-full flex-wrap items-center gap-2 rounded-3xl bg-(--text)/5 px-3 py-2 text-sm transition-colors duration-150',
		!disabled && 'focus-within:bg-(--text)/8',
		disabled && 'pointer-events-none opacity-50',
		className
	)}
>
	{#each value as tag, i (tag)}
		<span
			class="inline-flex items-center gap-1 rounded-full bg-(--text)/10 py-1 ps-3 pe-1.5 text-xs tracking-[-0.3px] text-(--text)/72"
		>
			{tag}
			<button
				type="button"
				aria-label={`Remove ${tag}`}
				onclick={(e) => {
					e.stopPropagation();
					removeTag(i);
				}}
				class="inline-flex size-4 items-center justify-center rounded-full text-(--text)/48 transition-colors duration-100 hover:bg-(--text)/12 hover:text-(--text)"
			>
				<svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
					<path d="M6 6l12 12M18 6 6 18" />
				</svg>
			</button>
		</span>
	{/each}
	<input
		bind:this={inputEl}
		bind:value={input}
		{onkeydown}
		onblur={addTag}
		{disabled}
		placeholder={atMax ? '' : placeholder}
		class="h-7 min-w-24 flex-1 bg-transparent tracking-[-0.39px] outline-none placeholder:text-(--text)/40"
	/>
</div>
