<script lang="ts">
	import { CodeBlock } from '$lib/registry/ui/code-block/index.js';

	const code = `<script lang="ts">
	let count = $state(0);
<\/script>

<button onclick={() => count++}>
	clicks: {count}
</button>`;
</script>

<div class="flex w-full max-w-md flex-col gap-4">
	<CodeBlock {code} lang="svelte" />
	<CodeBlock variant="secondary" code="npx lily-svelte@latest add code-block" lang="bash" />
</div>
