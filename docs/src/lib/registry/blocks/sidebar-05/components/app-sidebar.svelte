<script lang="ts">
	import * as Sidebar from '$lib/registry/ui/sidebar/index.js';
	import NavMain from './nav-main.svelte';
	import NavUser from './nav-user.svelte';
	import TeamSwitcher from './team-switcher.svelte';
	import type { ComponentProps } from 'svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const data = {
		user: {
			name: 'Levi',
			email: 'levi@example.com'
		},
		teams: [
			{ name: 'Acme Inc', plan: 'Enterprise', icon: 'heroicons:sparkles-solid' },
			{ name: 'Acme Corp.', plan: 'Startup', icon: 'heroicons:cube-solid' },
			{ name: 'Evil Corp.', plan: 'Free', icon: 'heroicons:bolt-solid' }
		],
		navMain: [
			{
				title: 'Playground',
				url: '##',
				icon: 'heroicons:command-line-solid',
				isActive: true,
				items: [
					{ title: 'History', url: '##' },
					{ title: 'Starred', url: '##' },
					{ title: 'Settings', url: '##' }
				]
			},
			{
				title: 'Models',
				url: '##',
				icon: 'heroicons:cpu-chip-solid',
				items: [
					{ title: 'Genesis', url: '##' },
					{ title: 'Explorer', url: '##' },
					{ title: 'Quantum', url: '##' }
				]
			},
			{
				title: 'Documentation',
				url: '##',
				icon: 'heroicons:book-open-solid',
				items: [
					{ title: 'Introduction', url: '##' },
					{ title: 'Get Started', url: '##' },
					{ title: 'Tutorials', url: '##' }
				]
			},
			{
				title: 'Settings',
				url: '##',
				icon: 'heroicons:cog-6-tooth-solid',
				items: [
					{ title: 'General', url: '##' },
					{ title: 'Team', url: '##' },
					{ title: 'Billing', url: '##' }
				]
			}
		]
	};
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
