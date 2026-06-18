<script lang="ts">
	import { PhoneInput } from '$lib/registry/ui/phone-input';

	let value = $state('');
	let valid = $state(true);
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
	<PhoneInput defaultCountry="US" bind:value bind:valid placeholder="Enter a phone number" />
	{#if value}
		<p class="text-xs tracking-[-0.3px] text-(--text)/48">
			{valid ? 'Valid' : 'Invalid'} · {value}
		</p>
	{/if}
</div>
