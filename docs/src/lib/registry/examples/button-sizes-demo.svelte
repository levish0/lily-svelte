<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/registry/ui/button';
</script>

<div class="flex flex-col items-center gap-4">
	<div class="flex flex-wrap items-center gap-3">
		<Button size="sm" variant="soft">Small</Button>
		<Button variant="soft">Default</Button>
		<Button size="lg" variant="soft">Large</Button>
	</div>
	<div class="flex flex-wrap items-center gap-3">
		<Button size="icon-sm" variant="ghost" aria-label="Add">
			<Icon icon="heroicons:plus-solid" class="size-4" />
		</Button>
		<Button size="icon" variant="ghost" aria-label="Add">
			<Icon icon="heroicons:plus-solid" class="size-5" />
		</Button>
		<Button size="icon-lg" variant="ghost" aria-label="Add">
			<Icon icon="heroicons:plus-solid" class="size-5" />
		</Button>
	</div>
</div>
