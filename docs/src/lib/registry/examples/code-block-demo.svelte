<script lang="ts">
	import { CodeBlock } from '$lib/registry/ui/code-block/index.js';

	const code = `<script lang="ts">
 import { Button } from '$lib/components/ui/button';
	let count = $state(0);
<\/script>

<Button onclick={() => count++}>
	clicks: {count}
</Button>`;
</script>

<div class="flex w-full max-w-md flex-col gap-4">
	<CodeBlock {code} lang="svelte" />
	<CodeBlock variant="secondary" code="npx lily-svelte@latest add code-block" lang="bash" />
</div>
