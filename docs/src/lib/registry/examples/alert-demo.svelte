<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Alert, AlertTitle, AlertDescription } from '$lib/registry/ui/alert';
</script>

<div class="flex w-full max-w-md flex-col gap-3">
	<Alert>
		<Icon icon="heroicons:information-circle-solid" aria-hidden="true" />
		<AlertTitle>Heads up!</AlertTitle>
		<AlertDescription>You can add components to your app using the CLI.</AlertDescription>
	</Alert>
	<Alert variant="destructive">
		<Icon icon="heroicons:exclamation-triangle-solid" aria-hidden="true" />
		<AlertTitle>Session expired</AlertTitle>
		<AlertDescription>Your session has expired. Please log in again.</AlertDescription>
	</Alert>
</div>
