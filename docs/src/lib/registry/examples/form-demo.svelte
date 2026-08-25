<script lang="ts" module>
	import { z } from 'zod';

	const formSchema = z.object({
		username: z.string().min(2, 'Use at least 2 characters.').max(50)
	});
</script>

<script lang="ts">
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/registry/ui/form';
	import { Input } from '$lib/registry/ui/input';

	const form = superForm(defaults(zod4(formSchema)), {
		SPA: true,
		validators: zod4(formSchema),
		onUpdate: ({ form: f }) => {
			if (f.valid) toast.success(`Saved as ${f.data.username}`);
			else toast.error('Please fix the errors in the form.');
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" class="flex w-full max-w-sm flex-col gap-5" use:enhance>
	<Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input {...props} bind:value={$formData.username} placeholder="lily" />
			{/snippet}
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-fit">Save</Form.Button>
</form>
