---
title: Sidebar
description: A composable, themeable and customizable sidebar component.
component: true
links:
  source: https://github.com/levish0/lily-svelte/tree/main/docs/src/lib/registry/ui/sidebar
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="sidebar-demo">
<div></div>
</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="sidebar" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install the lily base and `utils` (run once per project).</Step>

```bash
npx lily-svelte@latest init
```

<Step>Copy the sidebar source from the registry into <code>$lib/components/ui/sidebar</code>, and the <code>is-mobile</code> hook into <code>$lib/hooks</code>.</Step>

</Steps>
{/snippet}
</InstallTabs>

## Structure

A sidebar is composed from the following parts:

- `Sidebar.Provider` — handles the open/collapsed state (and the <kbd>Cmd/Ctrl</kbd> + <kbd>B</kbd> shortcut).
- `Sidebar.Root` — the sidebar container.
- `Sidebar.Header` / `Sidebar.Footer` — sticky at the top and bottom.
- `Sidebar.Content` — scrollable content.
- `Sidebar.Group` — a section within the content.
- `Sidebar.Menu` — a list of menu buttons, badges, actions and sub-menus.
- `Sidebar.Trigger` — toggles the sidebar.
- `Sidebar.Rail` — a thin strip on the edge that also toggles the sidebar.
- `Sidebar.Inset` — the main content area next to the sidebar.

## Usage

```svelte
<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
</script>

<Sidebar.Provider>
	<Sidebar.Root collapsible="icon">
		<Sidebar.Header />
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton isActive tooltipContent="Home">
								{#snippet child({ props })}
									<a href="/" {...props}>
										<HomeIcon />
										<span>Home</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
		<Sidebar.Footer />
		<Sidebar.Rail />
	</Sidebar.Root>
	<Sidebar.Inset>
		<header>
			<Sidebar.Trigger />
		</header>
		<!-- page content -->
	</Sidebar.Inset>
</Sidebar.Provider>
```

`Sidebar.Root` accepts:

- `side` — `"left"` (default) or `"right"`.
- `variant` — `"sidebar"` (default), `"floating"` (a floating card), or `"inset"` (the main content becomes an inset card).
- `collapsible` — `"offcanvas"` (default, slides away), `"icon"` (collapses to icons; menu buttons show their `tooltipContent`), or `"none"`.

On screens narrower than `768px` the sidebar automatically renders inside a [Sheet](/docs/components/sheet).

To read or control the state from a child component, use `useSidebar()`:

```svelte
<script lang="ts">
	import { useSidebar } from '$lib/components/ui/sidebar';

	const sidebar = useSidebar();
	// sidebar.open, sidebar.isMobile, sidebar.toggle(), sidebar.setOpen(true), ...
</script>
```
