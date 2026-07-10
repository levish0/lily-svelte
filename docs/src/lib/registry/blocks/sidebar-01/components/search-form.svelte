<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Label } from '$lib/registry/ui/label/index.js';
	import * as Sidebar from '$lib/registry/ui/sidebar/index.js';

	const id = $props.id();
</script>

<form>
	<Sidebar.Group class="p-0">
		<Sidebar.GroupContent class="relative">
			<Label for="search-{id}" class="sr-only">Search</Label>
			<Sidebar.Input id="search-{id}" placeholder="Search the docs..." class="ps-9" />
			<Icon
				icon="heroicons:magnifying-glass-solid"
				class="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-(--text)/40 select-none"
				aria-hidden="true"
			/>
		</Sidebar.GroupContent>
	</Sidebar.Group>
</form>
