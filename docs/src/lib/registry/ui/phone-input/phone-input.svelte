<script lang="ts" module>
	export const defaultOptions: TelInputOptions = {
		spaces: true,
		autoPlaceholder: true
	};
</script>

<script lang="ts">
	import CountrySelector from './country-selector.svelte';
	import type { PhoneInputProps } from './types.js';
	import { cn } from '$lib/utils.js';
	import { TelInput, countries } from 'svelte-tel-input';
	import type { TelInputOptions } from 'svelte-tel-input/types';

	let {
		class: className = undefined,
		defaultCountry = null,
		country = $bindable(defaultCountry),
		options = defaultOptions,
		placeholder,
		readonly = false,
		disabled = false,
		value = $bindable(''),
		valid = $bindable(true),
		detailedValue = $bindable(null),
		order = undefined,
		name = undefined,
		...rest
	}: PhoneInputProps = $props();

	let el: HTMLInputElement | undefined = $state();

	function focus() {
		setTimeout(() => el?.focus(), 0);
	}
</script>

<div data-slot="phone-input" class="flex w-full place-items-center">
	<CountrySelector {order} {countries} bind:selected={country} onselect={focus} {disabled} />
	<TelInput
		{name}
		bind:country
		bind:detailedValue
		bind:value
		bind:valid
		{readonly}
		{disabled}
		{placeholder}
		bind:el
		{options}
		class={cn(
			'flex h-10 w-full min-w-0 rounded-l-none rounded-r-3xl bg-(--text)/5 px-4 text-sm tracking-[-0.39px] outline-none transition-colors duration-150 placeholder:text-(--text)/40 hover:bg-(--text)/8 focus:bg-(--text)/12 aria-[invalid=true]:text-red-600 disabled:pointer-events-none disabled:opacity-50 dark:aria-[invalid=true]:text-red-400',
			className
		)}
		{...rest}
	/>
</div>
