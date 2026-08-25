<script lang="ts">
	import { Button, type ButtonProps } from '$lib/registry/ui/button/index.js';

	let { ref = $bindable(null), type = 'submit', ...restProps }: ButtonProps = $props();
</script>

<Button bind:ref {...restProps} {type} />
