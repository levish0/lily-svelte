<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as Sidebar from '$lib/registry/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const data = {
		navMain: [
			{
				title: 'Getting Started',
				url: '##',
				items: [
					{ title: 'Installation', url: '##' },
					{ title: 'Project Structure', url: '##' }
				]
			},
			{
				title: 'Building Your Application',
				url: '##',
				items: [
					{ title: 'Routing', url: '##' },
					{ title: 'Data Fetching', url: '##', isActive: true },
					{ title: 'Rendering', url: '##' },
					{ title: 'Caching', url: '##' }
				]
			},
			{
				title: 'API Reference',
				url: '##',
				items: [
					{ title: 'Components', url: '##' },
					{ title: 'Functions', url: '##' }
				]
			}
		]
	};
</script>

<Sidebar.Root bind:ref variant="floating" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<div
								class="flex size-8 shrink-0 items-center justify-center rounded-xl bg-(--text) text-(--bg)"
							>
								<Icon icon="heroicons:sparkles-solid" class="size-4" aria-hidden="true" />
							</div>
							<span class="flex min-w-0 flex-col leading-tight">
								<span class="truncate font-medium text-(--text)">Documentation</span>
								<span class="truncate text-xs text-(--text)/40">v1.0.0</span>
							</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.Menu>
				{#each data.navMain as item (item.title)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton class="font-medium">
							{#snippet child({ props })}
								<a href={item.url} {...props}>{item.title}</a>
							{/snippet}
						</Sidebar.MenuButton>
						{#if item.items.length}
							<Sidebar.MenuSub>
								{#each item.items as subItem (subItem.title)}
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton href={subItem.url} isActive={subItem.isActive}>
											{subItem.title}
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						{/if}
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
