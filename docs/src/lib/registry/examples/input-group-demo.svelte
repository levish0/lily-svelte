<script lang="ts">
	import Icon from '@iconify/svelte';
	import { InputGroup, InputGroupInput, InputGroupAddon } from '$lib/registry/ui/input-group';
</script>

<div class="flex w-full max-w-sm flex-col gap-3">
	<InputGroup>
		<InputGroupAddon>$</InputGroupAddon>
		<InputGroupInput type="number" placeholder="0.00" />
		<InputGroupAddon align="inline-end">USD</InputGroupAddon>
	</InputGroup>
	<InputGroup>
		<InputGroupAddon>
			<Icon icon="heroicons:magnifying-glass-solid" aria-hidden="true" />
		</InputGroupAddon>
		<InputGroupInput placeholder="Search…" />
	</InputGroup>
</div>
