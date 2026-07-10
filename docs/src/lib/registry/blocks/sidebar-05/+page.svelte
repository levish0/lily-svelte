<script lang="ts">
	import AppSidebar from './components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/registry/ui/breadcrumb/index.js';
	import { Separator } from '$lib/registry/ui/separator/index.js';
	import * as Sidebar from '$lib/registry/ui/sidebar/index.js';
</script>

<Sidebar.Provider>
	<AppSidebar collapsible="icon" />
	<Sidebar.Inset>
		<header class="flex h-14 shrink-0 items-center gap-2 border-b border-(--text)/8 px-4">
			<Sidebar.Trigger class="-ms-1" />
			<Separator orientation="vertical" class="me-2 h-4!" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item class="hidden md:block">
						<Breadcrumb.Link href="##">Acme Inc</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="hidden md:block" />
					<Breadcrumb.Item>
						<Breadcrumb.Page>Playground</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4">
			<div class="grid auto-rows-min gap-4 md:grid-cols-3">
				<div class="aspect-video rounded-2xl bg-(--text)/5"></div>
				<div class="aspect-video rounded-2xl bg-(--text)/5"></div>
				<div class="aspect-video rounded-2xl bg-(--text)/5"></div>
			</div>
			<div class="min-h-[100vh] flex-1 rounded-2xl bg-(--text)/5 md:min-h-min"></div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
