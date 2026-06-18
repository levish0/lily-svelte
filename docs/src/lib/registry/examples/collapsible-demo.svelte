<script lang="ts">
	import Icon from '@iconify/svelte';
	import {
		Collapsible,
		CollapsibleTrigger,
		CollapsibleContent
	} from '$lib/registry/ui/collapsible';
</script>

<Collapsible class="flex w-full max-w-sm flex-col gap-2">
	<div class="flex items-center justify-between gap-4">
		<span class="text-sm font-medium tracking-[-0.39px]">@levish starred 3 repositories</span>
		<CollapsibleTrigger
			class="inline-flex size-8 items-center justify-center rounded-xl text-(--text)/48 transition-colors duration-150 hover:bg-(--text)/8 hover:text-(--text)"
		>
			<Icon icon="heroicons:chevron-up-down-solid" class="size-4" aria-hidden="true" />
		</CollapsibleTrigger>
	</div>
	<div class="rounded-2xl bg-(--text)/5 px-4 py-2.5 text-sm tracking-[-0.39px]">@lily/ui</div>
	<CollapsibleContent class="flex flex-col gap-2">
		<div class="rounded-2xl bg-(--text)/5 px-4 py-2.5 text-sm tracking-[-0.39px]">
			sveltejs/svelte
		</div>
		<div class="rounded-2xl bg-(--text)/5 px-4 py-2.5 text-sm tracking-[-0.39px]">
			huntabyte/bits-ui
		</div>
	</CollapsibleContent>
</Collapsible>
