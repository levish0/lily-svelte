<script lang="ts" module>
	import { z } from 'zod';

	const items = [
		{ id: 'recents', label: 'Recents' },
		{ id: 'home', label: 'Home' },
		{ id: 'downloads', label: 'Downloads' },
		{ id: 'documents', label: 'Documents' }
	] as const;

	const formSchema = z.object({
		items: z.array(z.string()).min(1, 'Pick at least one item.')
	});
</script>

<script lang="ts">
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/registry/ui/form';
	import { Checkbox } from '$lib/registry/ui/checkbox';

	const form = superForm(defaults(zod4(formSchema)), {
		SPA: true,
		validators: zod4(formSchema),
		onUpdate: ({ form: f }) => {
			if (f.valid) toast.success(`Showing ${f.data.items.join(', ')}`);
			else toast.error('Please fix the errors in the form.');
		}
	});

	const { form: formData, enhance } = form;

	function toggle(id: string, on: boolean) {
		$formData.items = on ? [...$formData.items, id] : $formData.items.filter((item) => item !== id);
	}
</script>

<form method="POST" class="flex w-full max-w-sm flex-col gap-5" use:enhance>
	<Form.Fieldset {form} name="items" class="gap-3">
		<Form.Legend>Sidebar</Form.Legend>
		<Form.Description>Choose what to show in the sidebar.</Form.Description>
		{#each items as item (item.id)}
			<Form.Control>
				{#snippet children({ props })}
					<div class="flex items-center gap-3">
						<Checkbox
							{...props}
							value={item.id}
							checked={$formData.items.includes(item.id)}
							onCheckedChange={(on) => toggle(item.id, on)}
						/>
						<Form.Label class="font-normal">{item.label}</Form.Label>
					</div>
				{/snippet}
			</Form.Control>
		{/each}
		<Form.FieldErrors />
	</Form.Fieldset>
	<Form.Button class="w-fit">Update</Form.Button>
</form>
