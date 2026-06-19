<script lang="ts">
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/registry/ui/tabs';
	import type { Snippet } from 'svelte';

	let { cli, manual }: { cli: Snippet; manual: Snippet } = $props();
</script>

<Tabs value="cli" class="my-4">
	<TabsList>
		<TabsTrigger value="cli">CLI</TabsTrigger>
		<TabsTrigger value="manual">Manual</TabsTrigger>
	</TabsList>
	<TabsContent value="cli">
		{@render cli?.()}
	</TabsContent>
	<TabsContent value="manual" data-manual-install>
		{@render manual?.()}
	</TabsContent>
</Tabs>
