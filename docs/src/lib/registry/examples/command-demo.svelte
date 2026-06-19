<script lang="ts">
	import * as Command from '$lib/registry/ui/command';
</script>

<div class="w-full max-w-sm overflow-hidden rounded-2xl bg-(--bg-elevated) shadow-lg">
	<Command.Root>
		<Command.Input placeholder="Type a command or search…" />
		<Command.List>
			<Command.Empty>No results found.</Command.Empty>
			<Command.Group heading="Suggestions">
				<Command.Item>Calendar</Command.Item>
				<Command.Item>Search Emoji</Command.Item>
				<Command.Item>Calculator</Command.Item>
			</Command.Group>
			<Command.Separator />
			<Command.Group heading="Settings">
				<Command.Item>Profile</Command.Item>
				<Command.Item>Billing</Command.Item>
				<Command.Item>Settings</Command.Item>
			</Command.Group>
		</Command.List>
	</Command.Root>
</div>
