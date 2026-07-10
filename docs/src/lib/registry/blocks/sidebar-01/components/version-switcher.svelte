<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as DropdownMenu from '$lib/registry/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/registry/ui/sidebar/index.js';

	let { versions, defaultVersion }: { versions: string[]; defaultVersion: string } = $props();

	let selectedVersion = $state(defaultVersion);
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
							<Icon icon="heroicons:sparkles-solid" class="size-4" aria-hidden="true" />
						</div>
						<span class="flex min-w-0 flex-col leading-tight">
							<span class="truncate font-medium text-(--text)">Documentation</span>
							<span class="truncate text-xs text-(--text)/40">v{selectedVersion}</span>
						</span>
						<Icon
							icon="heroicons:chevron-up-down-solid"
							class="ms-auto text-(--text)/40"
							aria-hidden="true"
						/>
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-(--bits-dropdown-menu-anchor-width)" align="start">
				{#each versions as version (version)}
					<DropdownMenu.Item onSelect={() => (selectedVersion = version)}>
						v{version}
						{#if version === selectedVersion}
							<Icon icon="heroicons:check-solid" class="ms-auto" aria-hidden="true" />
						{/if}
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
