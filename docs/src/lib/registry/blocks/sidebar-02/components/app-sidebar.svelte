<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as Collapsible from '$lib/registry/ui/collapsible/index.js';
	import * as Sidebar from '$lib/registry/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();

	const data = {
		navMain: [
			{
				title: 'Getting Started',
				items: [
					{ title: 'Installation', url: '##' },
					{ title: 'Project Structure', url: '##' }
				]
			},
			{
				title: 'Building Your Application',
				items: [
					{ title: 'Routing', url: '##' },
					{ title: 'Data Fetching', url: '##', isActive: true },
					{ title: 'Rendering', url: '##' },
					{ title: 'Caching', url: '##' },
					{ title: 'Styling', url: '##' }
				]
			},
			{
				title: 'API Reference',
				items: [
					{ title: 'Components', url: '##' },
					{ title: 'File Conventions', url: '##' },
					{ title: 'Functions', url: '##' },
					{ title: 'CLI', url: '##' }
				]
			}
		]
	};
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Content>
		{#each data.navMain as group (group.title)}
			<Collapsible.Root open class="group/collapsible">
				<Sidebar.Group>
					<Sidebar.GroupLabel
						class="group/label w-full text-sm text-(--text)/56 hover:bg-(--text)/5 hover:text-(--text)"
					>
						{#snippet child({ props })}
							<Collapsible.Trigger {...props}>
								{group.title}
								<Icon
									icon="heroicons:chevron-right-solid"
									class="ms-auto size-3.5 transition-transform group-data-[state=open]/collapsible:rotate-90"
									aria-hidden="true"
								/>
							</Collapsible.Trigger>
						{/snippet}
					</Sidebar.GroupLabel>
					<Collapsible.Content>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								{#each group.items as item (item.title)}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton isActive={item.isActive}>
											{#snippet child({ props })}
												<a href={item.url} {...props}>{item.title}</a>
											{/snippet}
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								{/each}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Collapsible.Content>
				</Sidebar.Group>
			</Collapsible.Root>
		{/each}
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
