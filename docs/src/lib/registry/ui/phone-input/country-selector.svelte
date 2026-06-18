<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as Popover from '$lib/registry/ui/popover/index.js';
	import { Button } from '$lib/registry/ui/button/index.js';
	import * as Command from '$lib/registry/ui/command/index.js';
	import { ScrollArea } from '$lib/registry/ui/scroll-area/index.js';
	import { cn } from '$lib/utils.js';
	import Flag from './flag.svelte';
	import type { Country, CountryCode } from 'svelte-tel-input/types';

	interface Props {
		countries: Country[];
		disabled?: boolean;
		selected?: CountryCode | null;
		onselect?: (val: CountryCode | null) => void;
		order?: (a: Country, b: Country) => number;
	}

	let {
		countries,
		disabled = false,
		selected = $bindable(null),
		onselect = undefined,
		order = (a, b) => a.name.localeCompare(b.name)
	}: Props = $props();

	let selectedCountry = $derived(countries.find((a) => a.iso2 == selected));
	let open = $state(false);
	let selectedValue = $state(false);

	function selectCountry(country: Country) {
		selected = country.iso2;
		selectedValue = true;
		open = false;
		onselect?.(selected);
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				type="button"
				variant="ghost"
				{disabled}
				class="shrink-0 gap-1.5 rounded-l-3xl rounded-r-none px-3"
			>
				<Flag country={selectedCountry} />
				<Icon icon="heroicons:chevron-up-down-solid" class="-me-1 size-4 text-(--text)/40" aria-hidden="true" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content
		class="w-[300px] p-0"
		align="start"
		onCloseAutoFocus={(e) => {
			if (selectedValue) {
				selectedValue = false;
				e.preventDefault();
			}
		}}
	>
		<Command.Root>
			<Command.Input placeholder="Search country…" />
			<Command.List>
				<ScrollArea class="h-72">
					<Command.Empty>No country found.</Command.Empty>
					<Command.Group>
						{#each [...countries].sort(order) as country (country.id)}
							<Command.Item value={country.name} onSelect={() => selectCountry(country)}>
								<Flag {country} />
								<span class="flex-1 text-sm tracking-[-0.39px]">{country.name}</span>
								<span class="text-sm text-(--text)/40">+{country.dialCode}</span>
								<div class="w-4">
									{#if country.iso2 == selected}
										<Icon icon="heroicons:check-solid" class="size-4" aria-hidden="true" />
									{/if}
								</div>
							</Command.Item>
						{/each}
					</Command.Group>
				</ScrollArea>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
