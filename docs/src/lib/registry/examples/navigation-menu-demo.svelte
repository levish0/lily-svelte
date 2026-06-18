<script lang="ts">
	import * as NavigationMenu from '$lib/registry/ui/navigation-menu';
</script>

<NavigationMenu.Root>
	<NavigationMenu.List>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Getting started</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid w-[280px] gap-1">
					<li>
						<NavigationMenu.Link href="/docs">
							<span class="font-medium">Introduction</span>
							<span class="text-xs leading-[1.5] text-(--text)/48">Install lily and learn the structure.</span>
						</NavigationMenu.Link>
					</li>
					<li>
						<NavigationMenu.Link href="/docs/installation">
							<span class="font-medium">Installation</span>
							<span class="text-xs leading-[1.5] text-(--text)/48">Add lily to your SvelteKit app.</span>
						</NavigationMenu.Link>
					</li>
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid w-[280px] grid-cols-2 gap-1">
					<li><NavigationMenu.Link href="/docs/components/button">Button</NavigationMenu.Link></li>
					<li><NavigationMenu.Link href="/docs/components/card">Card</NavigationMenu.Link></li>
					<li><NavigationMenu.Link href="/docs/components/dialog">Dialog</NavigationMenu.Link></li>
					<li><NavigationMenu.Link href="/docs/components/tabs">Tabs</NavigationMenu.Link></li>
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
		<NavigationMenu.Item>
			<NavigationMenu.Link href="/docs">Docs</NavigationMenu.Link>
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>
