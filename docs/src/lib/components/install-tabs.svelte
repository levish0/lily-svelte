<script lang="ts">
	import { Tabs } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let { cli, manual }: { cli: Snippet; manual: Snippet } = $props();

	const triggerClass =
		'rounded-lg px-3 py-1.5 text-sm tracking-[-0.39px] text-(--text)/48 transition-colors duration-150 hover:text-(--text) data-[state=active]:bg-(--text)/6 data-[state=active]:text-(--text)';
</script>

<Tabs.Root value="cli" class="flex flex-col gap-3">
	<Tabs.List class="flex w-fit items-center gap-1 rounded-xl bg-(--text)/4 p-1">
		<Tabs.Trigger value="cli" class={triggerClass}>CLI</Tabs.Trigger>
		<Tabs.Trigger value="manual" class={triggerClass}>Manual</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="cli">
		{@render cli?.()}
	</Tabs.Content>
	<Tabs.Content value="manual" data-manual-install>
		{@render manual?.()}
	</Tabs.Content>
</Tabs.Root>
