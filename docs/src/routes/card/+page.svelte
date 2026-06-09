<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Avatar } from '$lib/components/ui/avatar';
</script>

<div class="flex flex-col gap-10">
	<div class="flex flex-col gap-1">
		<h1 class="text-xl font-semibold tracking-[-0.6px]">Card</h1>
		<p class="text-sm tracking-[-0.39px] text-(--text)/48">콘텐츠를 담는 컨테이너</p>
	</div>

	<section class="flex flex-col gap-4">
		<h2 class="text-sm font-medium tracking-[-0.39px] text-(--text)/48">Default</h2>
		<div class="max-w-sm">
			<Card>
				<CardHeader>
					<CardTitle>Card Title</CardTitle>
					<CardDescription>Card description goes here with some useful information.</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-sm leading-[1.5] tracking-[-0.39px] text-(--text)/72">
						This is the card content area. You can put anything here.
					</p>
				</CardContent>
				<CardFooter>
					<Button size="sm">Action</Button>
					<Button size="sm" variant="ghost">Cancel</Button>
				</CardFooter>
			</Card>
		</div>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-sm font-medium tracking-[-0.39px] text-(--text)/48">Profile</h2>
		<div class="max-w-sm">
			<Card>
				<div class="flex items-center gap-4">
					<Avatar size="lg" />
					<div class="flex flex-col tracking-[-0.48px]">
						<span class="text-base font-medium">levish</span>
						<span class="text-sm text-(--text)/48">developer & designer</span>
					</div>
				</div>
				<p class="text-sm leading-[1.5] tracking-[-0.39px] text-(--text)/72">
					Building things on the web.
				</p>
				<div class="flex gap-2">
					<Badge>svelte</Badge>
					<Badge>typescript</Badge>
				</div>
			</Card>
		</div>
	</section>
</div>
