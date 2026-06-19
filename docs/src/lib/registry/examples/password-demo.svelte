<script lang="ts">
	import { Password } from '$lib/registry/ui/password';

	let value = $state('');
</script>

<div class="w-full max-w-xs">
	<Password bind:value showStrength placeholder="Enter your password" />
</div>
