<script lang="ts">
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
				<!-- heroicons: chevron-up-down -->
				<svg class="-me-1 size-4 text-(--text)/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="m8 9 4-4 4 4M16 15l-4 4-4-4" />
				</svg>
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
						{#each countries.sort(order) as country (country.id)}
							<Command.Item value={country.name} onSelect={() => selectCountry(country)}>
								<Flag {country} />
								<span class="flex-1 text-sm tracking-[-0.39px]">{country.name}</span>
								<span class="text-sm text-(--text)/40">+{country.dialCode}</span>
								<div class="w-4">
									{#if country.iso2 == selected}
										<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
											<path d="m4.5 12.75 6 6 9-13.5" />
										</svg>
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
