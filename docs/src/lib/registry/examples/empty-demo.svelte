<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Empty, EmptyMedia, EmptyTitle, EmptyDescription } from '$lib/registry/ui/empty';
	import { Button } from '$lib/registry/ui/button';
</script>

<Empty class="max-w-sm">
	<EmptyMedia>
		<Icon icon="heroicons:inbox-solid" aria-hidden="true" />
	</EmptyMedia>
	<EmptyTitle>No messages</EmptyTitle>
	<EmptyDescription>You're all caught up. New messages will show up here.</EmptyDescription>
	<Button size="sm" variant="ghost" class="mt-2">Refresh</Button>
</Empty>
