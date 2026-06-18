<script lang="ts">
	import { onMount } from 'svelte';
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
	import * as Command from '$lib/registry/ui/command';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/registry/ui/card';

	let progress = $state(20);
	let fruit = $state('');
	let volume = $state(60);
	let align = $state('center');
	let tags = $state(['svelte', 'tailwind']);
	let qty = $state(2);
	let secret = $state('');

	onMount(() => {
		const t = setInterval(() => (progress = progress >= 100 ? 20 : progress + 20), 1400);
		return () => clearInterval(t);
	});
</script>

<section class="mx-auto w-full max-w-[88rem] px-6 lg:px-8">
	<!-- Hero -->
	<div class="flex flex-col items-center gap-6 pt-20 pb-14 text-center sm:pt-28 sm:pb-20">
		<Badge>Svelte 5 · Tailwind 4</Badge>
		<h1 class="max-w-5xl text-4xl font-semibold tracking-[-1.6px] sm:text-6xl">
			The quiet foundation for your interface
		</h1>
		<p class="max-w-2xl text-base leading-[1.6] tracking-[-0.48px] text-(--text)/56 sm:text-lg">
			A copy-paste component library with one unified, soft, rounded style — drawn from the
			levish.ac design language. You own the code.
		</p>
		<div class="flex flex-wrap items-center justify-center gap-3 pt-2">
			<Button href="/docs">Get Started</Button>
			<Button href="/docs/components/accordion" variant="ghost">Browse Components</Button>
		</div>
	</div>

	<!-- Showcase (masonry — cards flow by their own height) -->
	<div
		class="columns-1 gap-4 pb-24 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid"
	>
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
				<CardTitle>Toggles</CardTitle>
				<CardDescription>Switch, checkbox, radio.</CardDescription>
			</CardHeader>
			<CardContent class="flex flex-col gap-3">
				<div class="flex items-center gap-3">
					<Switch id="home-sw" checked />
					<Label for="home-sw">Notifications</Label>
				</div>
				<div class="flex items-center gap-3">
					<Checkbox id="home-cb" checked />
					<Label for="home-cb">Accept terms</Label>
				</div>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Form fields</CardTitle>
				<CardDescription>Filled, borderless inputs.</CardDescription>
			</CardHeader>
			<CardContent class="flex flex-col gap-2">
				<Label for="home-email">Email</Label>
				<Input id="home-email" type="email" placeholder="you@levish.ac" />
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

		<Card>
			<CardHeader>
				<CardTitle>Select</CardTitle>
				<CardDescription>Soft floating menu.</CardDescription>
			</CardHeader>
			<CardContent>
				<Select type="single" bind:value={fruit}>
					<SelectTrigger class="w-full">
						<span class={fruit ? '' : 'text-(--text)/36'}>{fruit || 'Pick a fruit'}</span>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Apple">Apple</SelectItem>
						<SelectItem value="Banana">Banana</SelectItem>
						<SelectItem value="Grapes">Grapes</SelectItem>
					</SelectContent>
				</Select>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Progress</CardTitle>
				<CardDescription>Smooth, monochrome.</CardDescription>
			</CardHeader>
			<CardContent>
				<Progress value={progress} />
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Choices</CardTitle>
				<CardDescription>Radio group.</CardDescription>
			</CardHeader>
			<CardContent>
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

		<Card>
			<CardHeader>
				<CardTitle>Profile</CardTitle>
				<CardDescription>Avatars with fallback.</CardDescription>
			</CardHeader>
			<CardContent class="flex items-center gap-3">
				<Avatar src="/favicon.svg" alt="levish" />
				<div class="flex flex-col tracking-[-0.48px]">
					<span class="text-sm font-medium">levish</span>
					<span class="text-xs text-(--text)/48">levish.ac</span>
				</div>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Slider</CardTitle>
				<CardDescription>Drag to set a value.</CardDescription>
			</CardHeader>
			<CardContent>
				<Slider type="single" bind:value={volume} max={100} />
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

		<Card>
			<CardHeader>
				<CardTitle>Password</CardTitle>
				<CardDescription>Strength via zxcvbn.</CardDescription>
			</CardHeader>
			<CardContent>
				<Password bind:value={secret} showStrength placeholder="Try a password" />
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
				<CardTitle>Command</CardTitle>
				<CardDescription>Fast searchable menu.</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="overflow-hidden rounded-2xl bg-(--text)/4">
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
