<script lang="ts">
	import * as Menubar from '$lib/registry/ui/menubar';
</script>

<Menubar.Root>
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut></Menubar.Item>
			<Menubar.Item>New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut></Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>Share</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Edit</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut></Menubar.Item>
			<Menubar.Item>Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut></Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>Reload</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item variant="destructive">Reset</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
