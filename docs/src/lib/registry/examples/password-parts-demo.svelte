<script lang="ts">
	import {
		PasswordRoot,
		PasswordInput,
		PasswordToggleVisibility,
		PasswordStrength
	} from '$lib/registry/ui/password';
	import { FieldLabel } from '$lib/registry/ui/field';
	import type { ZxcvbnResult } from '@zxcvbn-ts/core';

	let value = $state('');
	let result = $state<ZxcvbnResult | null>(null);

	const labels = ['Poor', 'Weak', 'Average', 'Strong', 'Secure'];
</script>

<PasswordRoot bind:value bind:result minScore={2} class="w-full max-w-xs">
	<FieldLabel>Password</FieldLabel>
	<div class="relative">
		<PasswordInput placeholder="Enter your password" />
		<PasswordToggleVisibility class="absolute end-1.5 top-1/2 -translate-y-1/2" />
	</div>
	<PasswordStrength {labels} />
	<p class="px-1.5 text-xs tracking-[-0.3px] text-(--text)/56">
		{#if result}
			Cracked in {result.crackTimes.offlineSlowHashingXPerSecond}.
		{:else}
			Pick something a machine will not guess.
		{/if}
	</p>
</PasswordRoot>
