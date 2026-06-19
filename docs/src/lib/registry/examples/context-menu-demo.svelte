<script lang="ts">
	import {
		ContextMenu,
		ContextMenuTrigger,
		ContextMenuContent,
		ContextMenuItem,
		ContextMenuSeparator,
		ContextMenuLabel
	} from '$lib/registry/ui/context-menu';
</script>

<ContextMenu>
	<ContextMenuTrigger
		class="flex h-32 w-full max-w-sm items-center justify-center rounded-3xl border border-dashed border-(--text)/12 text-sm tracking-[-0.39px] text-(--text)/56"
	>
		Right-click here
	</ContextMenuTrigger>
	<ContextMenuContent>
		<ContextMenuLabel>Actions</ContextMenuLabel>
		<ContextMenuItem>Back</ContextMenuItem>
		<ContextMenuItem>Reload</ContextMenuItem>
		<ContextMenuSeparator />
		<ContextMenuItem variant="destructive">Delete</ContextMenuItem>
	</ContextMenuContent>
</ContextMenu>
