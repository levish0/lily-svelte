<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/registry/ui/button';
	import { Top } from '$lib/registry/ui/top';
	import { ListRow } from '$lib/registry/ui/list-row';
	import { ActionFooter } from '$lib/registry/ui/action-footer';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/registry/ui/tabs';
	import { Badge } from '$lib/registry/ui/badge';
	import { SearchField } from '$lib/registry/ui/search-field';
	import { GridList, GridListItem } from '$lib/registry/ui/grid-list';
	import { Checkbox } from '$lib/registry/ui/checkbox';
	import { Label } from '$lib/registry/ui/label';
	import { NumberField } from '$lib/registry/ui/number-field';
	let received = $state(false);
	let agreed = $state(false);
	let quantity = $state<number | null>(1);
	let query = $state('');
	let notice = $state('');
	const services = [
		{ name: 'Pottery class', icon: 'heroicons:document-text-solid', color: 'text-(--accent)' },
		{ name: 'Drawing class', icon: 'heroicons:credit-card-solid', color: 'text-(--accent)' },
		{ name: 'Photo walk', icon: 'heroicons:gift-solid', color: 'text-amber-500' },
		{ name: 'Woodworking', icon: 'heroicons:question-mark-circle-solid', color: 'text-teal-500' }
	];
</script>

<div data-service-flow class="grid w-full min-w-0 gap-6 lg:grid-cols-2">
	<section aria-label="Class schedule" class="overflow-hidden rounded-[24px] bg-(--bg-elevated)">
		<div class="flex items-center justify-between px-6 pt-6">
			<span class="text-[17px] font-semibold">My classes</span>
			<Badge variant="soft" size="sm">Open</Badge>
		</div>
		<Top
			title={received ? 'Booking details opened' : 'This week'}
			eyebrow="Make time for a new hobby"
		/>
		<ListRow title="Make a small bowl" description="Saturday · Clay Studio" density="comfortable">
			{#snippet trailing()}<Button size="sm" disabled={received} onclick={() => (received = true)}
					>{received ? 'Opened' : 'View booking'}</Button
				>{/snippet}
		</ListRow>
		<ListRow title="Everyday drawing" description="Sunday · North Studio" density="comfortable">
			{#snippet trailing()}<span class="text-[17px] font-semibold text-(--text)/56">14:00</span
				>{/snippet}
		</ListRow>
		<ListRow
			title="A walk with your camera"
			description="Next week · Riverside Park"
			density="comfortable"
		>
			{#snippet trailing()}<span class="text-[17px] font-semibold text-(--text)/56">11:00</span
				>{/snippet}
		</ListRow>
		<div class="px-6 pt-3 pb-6">
			<Button
				variant="ghost"
				tone="neutral"
				size="md"
				class="w-full"
				onclick={() => (notice = 'Monthly schedule opened')}>View monthly schedule</Button
			>
		</div>
		<div class="h-[12px] bg-(--text)/5"></div>
		<Top title="Find your next hobby" class="pb-4" />
		<div class="px-6 pb-4">
			<SearchField aria-label="Search classes" placeholder="Search classes" bind:value={query} />
		</div>
		<GridList columns={2}>
			{#each services.filter((service) => service.name.includes(query)) as service (service.name)}
				<GridListItem onclick={() => (notice = service.name)}>
					{#snippet media()}<Icon icon={service.icon} class={service.color} width="24" />{/snippet}
					{service.name}
				</GridListItem>
			{/each}
		</GridList>
		<div class="h-6"></div>
	</section>
	<section aria-label="Class booking" class="overflow-hidden rounded-[24px] bg-(--bg-elevated)">
		<Tabs value="benefits" class="gap-0">
			<TabsList aria-label="Class navigation"
				><TabsTrigger value="benefits">Classes</TabsTrigger><TabsTrigger value="history"
					>Bookings</TabsTrigger
				></TabsList
			>
			<TabsContent value="benefits" class="mt-0">
				<Top
					title="Make something this weekend"
					description="Discover a local studio and create something new."
				/>
				<ActionFooter
					><Button onclick={() => (notice = 'Booking started')}>Book a class</Button></ActionFooter
				>
				<div class="h-[12px] bg-(--text)/5"></div>
				<div class="px-6 pt-6 pb-2 text-[15px] text-(--text)/56">Explore classes</div>
				{#each services as service (service.name)}
					<ListRow title={service.name} density="comfortable">
						{#snippet leading()}<Icon
								icon={service.icon}
								class={service.color}
								width="24"
							/>{/snippet}
						{#snippet trailing()}<Button
								size="icon-sm"
								variant="ghost"
								tone="neutral"
								aria-label={service.name}
								onclick={() => (notice = service.name)}
								><Icon icon="heroicons:chevron-right-solid" class="size-5" /></Button
							>{/snippet}
					</ListRow>
				{/each}
				<ListRow title="Participants" density="comfortable">
					{#snippet trailing()}<NumberField
							aria-label="Participants"
							bind:value={quantity}
							min={1}
							max={5}
							size="md"
						/>{/snippet}
				</ListRow>
				<div class="flex items-center gap-3 px-6 py-5">
					<Checkbox id="flow-agree" variant="line" bind:checked={agreed} /><Label for="flow-agree"
						>Send me new class updates</Label
					>
				</div>
			</TabsContent>
			<TabsContent value="history"
				><Top
					title="No bookings yet"
					description="Find a class you would love to try."
				/></TabsContent
			>
		</Tabs>
	</section>
	<p role="status" class="min-h-6 text-sm text-(--text)/56 lg:col-span-2">{notice}</p>
</div>
