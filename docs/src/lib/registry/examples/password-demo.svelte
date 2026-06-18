<script lang="ts">
	import { Password } from '$lib/registry/ui/password';

	let value = $state('');
</script>

<Password bind:value placeholder="Enter your password" class="max-w-xs" />
