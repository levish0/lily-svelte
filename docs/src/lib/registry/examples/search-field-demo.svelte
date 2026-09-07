<script lang="ts">
	import { SearchField } from '$lib/registry/ui/search-field';
	let query = $state('');
</script>

<div class="w-full max-w-sm space-y-4">
	<SearchField aria-label="Search services" placeholder="Search services" bind:value={query} />
	<p role="status" class="text-sm text-(--text)/56">
		{query ? `Searching for ${query}` : 'Enter a service name'}
	</p>
</div>
