<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as DropdownMenu from '$lib/registry/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/registry/ui/sidebar/index.js';

	let { teams }: { teams: { name: string; plan: string; icon: string }[] } = $props();

	// svelte-ignore state_referenced_locally -- the first team is intentionally only the initial value
	let activeTeam = $state(teams[0]!);
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton size="lg" {...props}>
						<div
							class="flex size-8 shrink-0 items-center justify-center rounded-xl bg-(--text) text-(--bg)"
						>
							<Icon icon={activeTeam.icon} class="size-4" aria-hidden="true" />
						</div>
						<span class="flex min-w-0 flex-col leading-tight">
							<span class="truncate font-medium text-(--text)">{activeTeam.name}</span>
							<span class="truncate text-xs text-(--text)/40">{activeTeam.plan}</span>
						</span>
						<Icon
							icon="heroicons:chevron-up-down-solid"
							class="ms-auto text-(--text)/40"
							aria-hidden="true"
						/>
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" align="start" side="bottom" sideOffset={4}>
				<DropdownMenu.Label>Teams</DropdownMenu.Label>
				{#each teams as team (team.name)}
					<DropdownMenu.Item onSelect={() => (activeTeam = team)}>
						<div
							class="flex size-6 items-center justify-center rounded-lg border border-(--text)/8"
						>
							<Icon icon={team.icon} class="size-3.5 shrink-0" aria-hidden="true" />
						</div>
						{team.name}
						{#if team.name === activeTeam.name}
							<Icon icon="heroicons:check-solid" class="ms-auto" aria-hidden="true" />
						{/if}
					</DropdownMenu.Item>
				{/each}
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<div class="flex size-6 items-center justify-center rounded-lg border border-(--text)/8">
						<Icon icon="heroicons:plus-solid" class="size-3.5 shrink-0" aria-hidden="true" />
					</div>
					<span class="text-(--text)/56">Add team</span>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
