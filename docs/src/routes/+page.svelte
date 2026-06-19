<script lang="ts">
	import { onMount } from 'svelte';
	import { today, getLocalTimeZone } from '@internationalized/date';
	import { toast } from 'svelte-sonner';
	import Seo from '$lib/components/seo.svelte';
	import { Button } from '$lib/registry/ui/button';
	import { Badge } from '$lib/registry/ui/badge';
	import { Avatar } from '$lib/registry/ui/avatar';
	import { Switch } from '$lib/registry/ui/switch';
	import { Checkbox } from '$lib/registry/ui/checkbox';
	import { Input } from '$lib/registry/ui/input';
	import { Label } from '$lib/registry/ui/label';
	import { Progress } from '$lib/registry/ui/progress';
	import { RadioGroup, RadioGroupItem } from '$lib/registry/ui/radio-group';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/registry/ui/tabs';
	import { Select, SelectTrigger, SelectContent, SelectItem } from '$lib/registry/ui/select';
	import { Slider } from '$lib/registry/ui/slider';
	import { ToggleGroup, ToggleGroupItem } from '$lib/registry/ui/toggle-group';
	import { TagsInput } from '$lib/registry/ui/tags-input';
	import { NumberField } from '$lib/registry/ui/number-field';
	import { Password } from '$lib/registry/ui/password';
	import { Alert, AlertTitle, AlertDescription } from '$lib/registry/ui/alert';
	import { Spinner } from '$lib/registry/ui/spinner';
	import { Skeleton } from '$lib/registry/ui/skeleton';
	import { Kbd } from '$lib/registry/ui/kbd';
	import { Calendar } from '$lib/registry/ui/calendar';
	import * as Command from '$lib/registry/ui/command';
	import * as Table from '$lib/registry/ui/table';
	import * as Tooltip from '$lib/registry/ui/tooltip';
	import {
		Dialog,
		DialogTrigger,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogFooter,
		DialogClose
	} from '$lib/registry/ui/dialog';
	import { HoverCard, HoverCardTrigger, HoverCardContent } from '$lib/registry/ui/hover-card';
	import {
		Breadcrumb,
		BreadcrumbList,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbSeparator,
		BreadcrumbPage
	} from '$lib/registry/ui/breadcrumb';
	import {
		Pagination,
		PaginationContent,
		PaginationItem,
		PaginationLink,
		PaginationPrevButton,
		PaginationNextButton,
		PaginationEllipsis
	} from '$lib/registry/ui/pagination';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/registry/ui/card';

	let progress = $state(20);
	let fruit = $state('');
	let plan = $state('Pro');
	let volume = $state(60);
	let align = $state('center');
	let tags = $state(['svelte', 'tailwind']);
	let qty = $state(2);
	let secret = $state('');
	let calValue = $state(today(getLocalTimeZone()));

	const invoices = [
		{ invoice: 'INV001', status: 'Paid', amount: '$250.00' },
		{ invoice: 'INV002', status: 'Pending', amount: '$150.00' },
		{ invoice: 'INV003', status: 'Unpaid', amount: '$350.00' }
	];

	onMount(() => {
		const t = setInterval(() => (progress = progress >= 100 ? 20 : progress + 20), 1400);
		return () => clearInterval(t);
	});
</script>

<Seo
	title="lily — calm, rounded Svelte 5 components"
	description="A calm, rounded Svelte 5 component library — one unified, soft style. Copy-paste components installed by CLI, and yours to own."
/>

<section class="mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-8">
	<!-- Hero -->
	<div class="flex flex-col items-center gap-6 pt-20 pb-14 text-center sm:pt-28 sm:pb-20">
		<Badge>Svelte 5 · Tailwind 4</Badge>
		<h1 class="max-w-5xl text-4xl font-semibold tracking-[-1.6px] sm:text-6xl">Quiet by design</h1>
		<p class="max-w-2xl text-base leading-[1.6] tracking-[-0.48px] text-(--text)/56 sm:text-lg">
			A calm, rounded Svelte 5 component library — one unified style, installed by CLI and yours to
			own.
		</p>
		<div class="flex flex-wrap items-center justify-center gap-3 pt-2">
			<Button href="/docs">Get Started</Button>
			<Button href="/docs/components" variant="ghost">Browse Components</Button>
		</div>
	</div>

	<!-- Showcase (masonry — cards flow by their own height) -->
	<div
		class="columns-1 gap-4 pb-24 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid"
	>
		<!-- Composition: sign in -->
		<Card>
			<CardHeader>
				<CardTitle>Sign in</CardTitle>
				<CardDescription>Filled, borderless fields.</CardDescription>
			</CardHeader>
			<CardContent class="flex flex-col gap-3">
				<div class="flex flex-col gap-2">
					<Label for="home-email">Email</Label>
					<Input id="home-email" type="email" placeholder="you@example.com" />
				</div>
				<div class="flex flex-col gap-2">
					<Label for="home-pw">Password</Label>
					<Password id="home-pw" bind:value={secret} placeholder="••••••••" />
				</div>
				<Button class="mt-1 w-full">Continue</Button>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Buttons</CardTitle>
				<CardDescription>Click-scale interaction, one radius.</CardDescription>
			</CardHeader>
			<CardContent class="flex flex-wrap items-center gap-2">
				<Button size="sm">Default</Button>
				<Button size="sm" variant="ghost">Ghost</Button>
				<Button size="sm" variant="destructive">Delete</Button>
			</CardContent>
		</Card>

		<!-- Composition: settings panel -->
		<Card>
			<CardHeader>
				<CardTitle>Settings</CardTitle>
				<CardDescription>Switches, select, slider.</CardDescription>
			</CardHeader>
			<CardContent class="flex flex-col gap-4">
				<div class="flex items-center justify-between gap-3">
					<Label for="home-sw">Notifications</Label>
					<Switch id="home-sw" checked />
				</div>
				<div class="flex items-center justify-between gap-3">
					<Label for="home-plan">Plan</Label>
					<Select type="single" bind:value={plan}>
						<SelectTrigger class="w-32">
							<span>{plan}</span>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Free">Free</SelectItem>
							<SelectItem value="Pro">Pro</SelectItem>
							<SelectItem value="Team">Team</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div class="flex flex-col gap-2">
					<Label>Volume</Label>
					<Slider type="single" bind:value={volume} max={100} />
				</div>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Badges</CardTitle>
				<CardDescription>Opacity-tinted, fully rounded.</CardDescription>
			</CardHeader>
			<CardContent class="flex flex-wrap gap-2">
				<Badge>svelte</Badge>
				<Badge>typescript</Badge>
				<Badge>tailwind</Badge>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Calendar</CardTitle>
				<CardDescription>Soft date selection.</CardDescription>
			</CardHeader>
			<CardContent>
				<Calendar type="single" bind:value={calValue} />
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Tabs</CardTitle>
				<CardDescription>Pill tabs, calm motion.</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs value="overview">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="activity">Activity</TabsTrigger>
					</TabsList>
					<TabsContent value="overview" class="pt-2 text-sm text-(--text)/56">
						A quiet overview.
					</TabsContent>
					<TabsContent value="activity" class="pt-2 text-sm text-(--text)/56">
						Recent activity.
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>

		<!-- Composition: loading states -->
		<Card>
			<CardHeader>
				<CardTitle>Loading</CardTitle>
				<CardDescription>Spinner & progress.</CardDescription>
			</CardHeader>
			<CardContent class="flex flex-col gap-4">
				<div class="flex items-center gap-4">
					<Spinner class="size-5" />
					<Spinner class="size-6 border-[3px]" />
					<span class="text-sm text-(--text)/56">Working…</span>
				</div>
				<Progress value={progress} />
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Toggles</CardTitle>
				<CardDescription>Switch, checkbox, radio.</CardDescription>
			</CardHeader>
			<CardContent class="flex flex-col gap-3">
				<div class="flex items-center gap-3">
					<Checkbox id="home-cb" checked />
					<Label for="home-cb">Accept terms</Label>
				</div>
				<RadioGroup value="comfortable">
					<div class="flex items-center gap-3">
						<RadioGroupItem value="comfortable" id="home-r1" />
						<Label for="home-r1">Comfortable</Label>
					</div>
					<div class="flex items-center gap-3">
						<RadioGroupItem value="compact" id="home-r2" />
						<Label for="home-r2">Compact</Label>
					</div>
				</RadioGroup>
			</CardContent>
		</Card>

		<!-- Composition: dialog trigger -->
		<Card>
			<CardHeader>
				<CardTitle>Dialog</CardTitle>
				<CardDescription>Soft modal surface.</CardDescription>
			</CardHeader>
			<CardContent>
				<Dialog>
					<DialogTrigger>
						{#snippet child({ props })}
							<Button variant="ghost" {...props}>Delete project</Button>
						{/snippet}
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Delete project</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete your project.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<DialogClose>
								{#snippet child({ props })}
									<Button variant="ghost" {...props}>Cancel</Button>
								{/snippet}
							</DialogClose>
							<Button variant="destructive">Delete</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>

		<!-- Composition: profile / hover card -->
		<Card>
			<CardHeader>
				<CardTitle>Profile</CardTitle>
				<CardDescription>Avatar & hover card.</CardDescription>
			</CardHeader>
			<CardContent class="flex items-center gap-3">
				<Avatar src="/levish_avatar.png" alt="example" />
				<HoverCard>
					<HoverCardTrigger
						href="https://example.com"
						target="_blank"
						rel="noreferrer"
						class="link text-sm font-medium tracking-[-0.39px]"
					>
						@example
					</HoverCardTrigger>
					<HoverCardContent>
						<div class="flex gap-3">
							<Avatar src="/levish_avatar.png" alt="example" />
							<div class="flex flex-col gap-1">
								<p class="font-medium">example</p>
								<p class="text-xs leading-[1.5] text-(--text)/56">
									Building lily — a Svelte component library.
								</p>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Toggle group</CardTitle>
				<CardDescription>Segmented, springy press.</CardDescription>
			</CardHeader>
			<CardContent>
				<ToggleGroup type="single" bind:value={align}>
					<ToggleGroupItem value="left">Left</ToggleGroupItem>
					<ToggleGroupItem value="center">Center</ToggleGroupItem>
					<ToggleGroupItem value="right">Right</ToggleGroupItem>
				</ToggleGroup>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Tags input</CardTitle>
				<CardDescription>Chips with keyboard editing.</CardDescription>
			</CardHeader>
			<CardContent>
				<TagsInput bind:value={tags} />
			</CardContent>
		</Card>

		<!-- Table -->
		<Card>
			<CardHeader>
				<CardTitle>Table</CardTitle>
				<CardDescription>Lineless, soft rows.</CardDescription>
			</CardHeader>
			<CardContent>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Invoice</Table.Head>
							<Table.Head>Status</Table.Head>
							<Table.Head class="text-right">Amount</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each invoices as row (row.invoice)}
							<Table.Row>
								<Table.Cell class="font-medium">{row.invoice}</Table.Cell>
								<Table.Cell>{row.status}</Table.Cell>
								<Table.Cell class="text-right">{row.amount}</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Number field</CardTitle>
				<CardDescription>Stepper controls.</CardDescription>
			</CardHeader>
			<CardContent>
				<NumberField bind:value={qty} min={0} max={10} />
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Alert</CardTitle>
				<CardDescription>Quiet, semantic callouts.</CardDescription>
			</CardHeader>
			<CardContent>
				<Alert>
					<AlertTitle>Heads up!</AlertTitle>
					<AlertDescription>Add components with the CLI.</AlertDescription>
				</Alert>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Breadcrumb</CardTitle>
				<CardDescription>Compact path trail.</CardDescription>
			</CardHeader>
			<CardContent>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Card</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Pagination</CardTitle>
				<CardDescription>Page through results.</CardDescription>
			</CardHeader>
			<CardContent>
				<Pagination count={30} perPage={10} page={1}>
					{#snippet children({ pages, currentPage })}
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevButton />
							</PaginationItem>
							{#each pages as page (page.key)}
								{#if page.type === 'ellipsis'}
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								{:else}
									<PaginationItem>
										<PaginationLink {page} isActive={currentPage === page.value} />
									</PaginationItem>
								{/if}
							{/each}
							<PaginationItem>
								<PaginationNextButton />
							</PaginationItem>
						</PaginationContent>
					{/snippet}
				</Pagination>
			</CardContent>
		</Card>

		<!-- Composition: toast + shortcut -->
		<Card>
			<CardHeader>
				<CardTitle>Notifications</CardTitle>
				<CardDescription>Toasts & shortcuts.</CardDescription>
			</CardHeader>
			<CardContent class="flex flex-col gap-3">
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button
								variant="ghost"
								{...props}
								onclick={() =>
									toast('Event created', { description: 'Sunday, December 03 at 9:00 AM' })}
							>
								Show toast
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content>Fires a sonner toast</Tooltip.Content>
				</Tooltip.Root>
				<div class="flex items-center gap-2 text-sm tracking-[-0.39px] text-(--text)/56">
					Press
					<Kbd>⌘</Kbd>
					<Kbd>K</Kbd>
					to search
				</div>
			</CardContent>
		</Card>

		<!-- Skeleton -->
		<Card>
			<CardHeader>
				<CardTitle>Skeleton</CardTitle>
				<CardDescription>Calm loading placeholder.</CardDescription>
			</CardHeader>
			<CardContent class="flex items-center gap-4">
				<Skeleton class="size-12 rounded-full" />
				<div class="flex flex-col gap-2">
					<Skeleton class="h-4 w-32" />
					<Skeleton class="h-4 w-20" />
				</div>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Command</CardTitle>
				<CardDescription>Fast searchable menu.</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="overflow-hidden rounded-2xl bg-(--text)/5">
					<Command.Root>
						<Command.Input placeholder="Search…" />
						<Command.List>
							<Command.Empty>No results.</Command.Empty>
							<Command.Group heading="Suggestions">
								<Command.Item>Calendar</Command.Item>
								<Command.Item>Settings</Command.Item>
							</Command.Group>
						</Command.List>
					</Command.Root>
				</div>
			</CardContent>
		</Card>
	</div>
</section>
