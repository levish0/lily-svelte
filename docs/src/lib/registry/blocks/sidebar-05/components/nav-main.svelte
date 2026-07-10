<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as Collapsible from '$lib/registry/ui/collapsible/index.js';
	import * as Sidebar from '$lib/registry/ui/sidebar/index.js';

	let {
		items
	}: {
		items: {
			title: string;
			url: string;
			icon: string;
			isActive?: boolean;
			items?: { title: string; url: string }[];
		}[];
	} = $props();
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each items as item (item.title)}
			<Collapsible.Root open={item.isActive} class="group/collapsible">
				<Sidebar.MenuItem>
					<Collapsible.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton {...props} tooltipContent={item.title}>
								<Icon icon={item.icon} aria-hidden="true" />
								<span>{item.title}</span>
								<Icon
									icon="heroicons:chevron-right-solid"
									class="ms-auto size-3.5! transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
									aria-hidden="true"
								/>
							</Sidebar.MenuButton>
						{/snippet}
					</Collapsible.Trigger>
					{#if item.items?.length}
						<Collapsible.Content>
							<Sidebar.MenuSub>
								{#each item.items as subItem (subItem.title)}
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton href={subItem.url}>
											<span>{subItem.title}</span>
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						</Collapsible.Content>
					{/if}
				</Sidebar.MenuItem>
			</Collapsible.Root>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
