<script lang="ts">
	import { Password } from '$lib/registry/ui/password';

	let value = $state('');
</script>

<Password bind:value showStrength aria-label="Password" />
