<script lang="ts">
	import {
		Dialog,
		DialogTrigger,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogFooter,
		DialogClose
	} from '$lib/registry/ui/dialog';
	import { Button } from '$lib/registry/ui/button';
</script>

<Dialog>
	<DialogTrigger>
		{#snippet child({ props })}
			<Button {...props}>Open dialog</Button>
		{/snippet}
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Delete project</DialogTitle>
			<DialogDescription>
				This action cannot be undone. This will permanently delete your project.
			</DialogDescription>
		</DialogHeader>
		<DialogFooter>
			<DialogClose>
				{#snippet child({ props })}
					<Button variant="ghost" {...props}>Cancel</Button>
				{/snippet}
			</DialogClose>
			<Button variant="destructive">Delete</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
