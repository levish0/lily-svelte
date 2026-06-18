<script lang="ts">
	import { Button } from '$lib/registry/ui/button';
	import { Badge } from '$lib/registry/ui/badge';
	import { Avatar } from '$lib/registry/ui/avatar';
	import { Separator } from '$lib/registry/ui/separator';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent,
		CardFooter
	} from '$lib/registry/ui/card';
</script>

<section class="mx-auto w-full max-w-6xl px-5">
	<!-- Hero -->
	<div class="flex flex-col items-center gap-6 pt-20 pb-14 text-center sm:pt-28 sm:pb-20">
		<Badge>Svelte 5 · Tailwind 4</Badge>
		<h1 class="max-w-3xl text-4xl font-semibold tracking-[-1.6px] sm:text-6xl">
			The quiet foundation for your interface
		</h1>
		<p class="max-w-xl text-base leading-[1.6] tracking-[-0.48px] text-(--text)/56 sm:text-lg">
			A copy-paste component library with one unified style — drawn from the levish.ac design
			language. You own the code.
		</p>
		<div class="flex flex-wrap items-center justify-center gap-3 pt-2">
			<Button href="/docs">Get Started</Button>
			<Button href="/docs/components/button" variant="ghost">Browse Components</Button>
		</div>
	</div>

	<!-- Showcase -->
	<div class="grid gap-4 pb-24 md:grid-cols-3">
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
				<CardTitle>Profile</CardTitle>
				<CardDescription>Avatars with graceful fallback.</CardDescription>
			</CardHeader>
			<CardContent class="flex items-center gap-3">
				<Avatar src="/favicon.svg" alt="levish" />
				<div class="flex flex-col tracking-[-0.48px]">
					<span class="text-sm font-medium">levish</span>
					<span class="text-xs text-(--text)/48">levish.ac</span>
				</div>
			</CardContent>
		</Card>

		<Card class="md:col-span-2">
			<CardHeader>
				<CardTitle>Composable by design</CardTitle>
				<CardDescription>
					Every primitive shares the same tokens, radius, and motion — so they compose without
					friction.
				</CardDescription>
			</CardHeader>
			<CardContent class="flex items-center gap-4 text-sm tracking-[-0.39px] text-(--text)/72">
				<span>Design</span>
				<Separator orientation="vertical" class="h-5" />
				<span>Develop</span>
				<Separator orientation="vertical" class="h-5" />
				<span>Ship</span>
			</CardContent>
			<CardFooter>
				<Button size="sm" href="/docs">Read the docs</Button>
			</CardFooter>
		</Card>

		<Card class="justify-center">
			<CardHeader>
				<CardTitle>Yours to own</CardTitle>
				<CardDescription>
					Installed via <code class="rounded-md bg-(--text)/8 px-1.5 py-0.5 text-xs"
						>npx lily add</code
					>
					— the source lands in your repo.
				</CardDescription>
			</CardHeader>
		</Card>
	</div>
</section>
