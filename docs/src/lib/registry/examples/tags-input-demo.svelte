<script lang="ts">
	import { TagsInput } from '$lib/registry/ui/tags-input';

	let value = $state(['svelte', 'tailwind']);
</script>

<TagsInput bind:value placeholder="Add a tag…" class="max-w-sm" />
