<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Avatar } from '$lib/registry/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/registry/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/registry/ui/sidebar/index.js';

	let { user }: { user: { name: string; email: string; avatar?: string } } = $props();

	const sidebar = Sidebar.useSidebar();
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton size="lg" {...props}>
						<Avatar src={user.avatar} alt={user.name} class="size-8" />
						<span class="flex min-w-0 flex-col leading-tight">
							<span class="truncate font-medium text-(--text)">{user.name}</span>
							<span class="truncate text-xs text-(--text)/40">{user.email}</span>
						</span>
						<Icon
							icon="heroicons:chevron-up-down-solid"
							class="ms-auto text-(--text)/40"
							aria-hidden="true"
						/>
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-56"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label>
					<div class="flex items-center gap-2">
						<Avatar src={user.avatar} alt={user.name} class="size-8" />
						<span class="flex min-w-0 flex-col leading-tight font-normal">
							<span class="truncate font-medium text-(--text)">{user.name}</span>
							<span class="truncate text-xs text-(--text)/40">{user.email}</span>
						</span>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<Icon icon="heroicons:sparkles-solid" aria-hidden="true" />
					Upgrade to Pro
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<Icon icon="heroicons:user-circle-solid" aria-hidden="true" />
					Account
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<Icon icon="heroicons:credit-card-solid" aria-hidden="true" />
					Billing
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<Icon icon="heroicons:bell-solid" aria-hidden="true" />
					Notifications
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">
					<Icon icon="heroicons:arrow-right-start-on-rectangle-solid" aria-hidden="true" />
					Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
