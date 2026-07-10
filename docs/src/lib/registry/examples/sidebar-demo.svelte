<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as Sidebar from '$lib/registry/ui/sidebar/index.js';

	const items = [
		{ title: 'Home', icon: 'heroicons:home-solid', isActive: true },
		{ title: 'Inbox', icon: 'heroicons:inbox-solid', badge: '12' },
		{ title: 'Calendar', icon: 'heroicons:calendar-days-solid' },
		{ title: 'Search', icon: 'heroicons:magnifying-glass-solid' },
		{ title: 'Settings', icon: 'heroicons:cog-6-tooth-solid' }
	];

	const projects = [
		{ title: 'Design system', icon: 'heroicons:swatch-solid' },
		{ title: 'Marketing site', icon: 'heroicons:megaphone-solid' }
	];
</script>

<!-- The `transform` traps the sidebar's `position: fixed` inside the preview box. -->
<div
	class="h-[560px] w-full overflow-hidden rounded-3xl border border-(--text)/8 [transform:translateZ(0)]"
>
	<Sidebar.Provider class="h-full min-h-full">
		<Sidebar.Root collapsible="icon" class="h-full">
			<Sidebar.Header>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton size="lg">
							<div
								class="flex size-8 shrink-0 items-center justify-center rounded-xl bg-(--text) text-(--bg)"
							>
								<Icon icon="heroicons:sparkles-solid" class="size-4" aria-hidden="true" />
							</div>
							<span class="font-semibold text-(--text)">lily</span>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.Header>

			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each items as item (item.title)}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive={item.isActive} tooltipContent={item.title}>
										{#snippet child({ props })}
											<a href="##" {...props}>
												<Icon icon={item.icon} aria-hidden="true" />
												<span>{item.title}</span>
											</a>
										{/snippet}
									</Sidebar.MenuButton>
									{#if item.badge}
										<Sidebar.MenuBadge>{item.badge}</Sidebar.MenuBadge>
									{/if}
								</Sidebar.MenuItem>
							{/each}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>

				<Sidebar.Group>
					<Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each projects as project (project.title)}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton tooltipContent={project.title}>
										{#snippet child({ props })}
											<a href="##" {...props}>
												<Icon icon={project.icon} aria-hidden="true" />
												<span>{project.title}</span>
											</a>
										{/snippet}
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							{/each}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			</Sidebar.Content>

			<Sidebar.Footer>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton size="lg">
							<div
								class="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--text)/8 text-xs font-medium text-(--text)"
							>
								LV
							</div>
							<span class="flex min-w-0 flex-col leading-tight">
								<span class="truncate font-medium text-(--text)">Levi</span>
								<span class="truncate text-xs text-(--text)/40">levi@example.com</span>
							</span>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.Footer>

			<Sidebar.Rail />
		</Sidebar.Root>

		<Sidebar.Inset class="min-h-0">
			<header class="flex h-14 shrink-0 items-center gap-2 border-b border-(--text)/8 px-4">
				<Sidebar.Trigger class="-ms-1" />
				<span class="text-sm font-medium">Home</span>
			</header>
			<div class="grid auto-rows-min gap-3 p-4 md:grid-cols-3">
				<div class="aspect-video rounded-2xl bg-(--text)/5"></div>
				<div class="aspect-video rounded-2xl bg-(--text)/5"></div>
				<div class="aspect-video rounded-2xl bg-(--text)/5"></div>
				<div class="min-h-40 rounded-2xl bg-(--text)/5 md:col-span-3"></div>
			</div>
		</Sidebar.Inset>
	</Sidebar.Provider>
</div>
