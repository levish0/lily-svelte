<script lang="ts">
	import * as Command from '$lib/registry/ui/command';
	import { Kbd } from '$lib/registry/ui/kbd';
	let selected = $state('');
</script>

<div class="w-full max-w-sm">
	<div class="overflow-hidden rounded-2xl bg-(--bg-elevated) shadow-lg">
		<Command.Root loop>
			<Command.Input aria-label="Search commands" placeholder="Type a command or search…" />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group heading="Suggestions">
					<Command.Item value="calendar" onSelect={() => (selected = 'Calendar')}
						>Calendar</Command.Item
					>
					<Command.Item value="search-emoji" onSelect={() => (selected = 'Search Emoji')}
						>Search Emoji</Command.Item
					>
					<Command.Item value="calculator" onSelect={() => (selected = 'Calculator')}
						>Calculator</Command.Item
					>
				</Command.Group>
				<Command.Separator />
				<Command.Group heading="Settings">
					<Command.Item value="profile" onSelect={() => (selected = 'Profile')}
						>Profile</Command.Item
					>
					<Command.Item value="billing" onSelect={() => (selected = 'Billing')}
						>Billing</Command.Item
					>
					<Command.Item value="settings" onSelect={() => (selected = 'Settings')}
						>Settings</Command.Item
					>
				</Command.Group>
			</Command.List>
		</Command.Root>
	</div>
	<div class="mt-3 flex items-center gap-2 text-xs text-(--text)/56">
		<Kbd>↑</Kbd><Kbd>↓</Kbd> Navigate <Kbd>Enter</Kbd> Select
	</div>
	<p role="status" class="mt-2 min-h-5 text-sm text-(--text)/72">
		{selected ? `Selected: ${selected}` : ''}
	</p>
</div>
