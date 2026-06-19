<script lang="ts">
	import { Button } from '$lib/registry/ui/button';
	import { toast } from 'svelte-sonner';
</script>

<Button
	variant="ghost"
	onclick={() =>
		toast('Event created', {
			description: 'Sunday, December 03 at 9:00 AM'
		})}
>
	Show toast
</Button>
