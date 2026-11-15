<script lang="ts">
	import { TagsInput } from '#lib/registry/ui/tags-input/index.js';

	let value = $state(['svelte', 'tailwind']);
</script>

<TagsInput bind:value placeholder="Add a tag…" class="max-w-sm" />
