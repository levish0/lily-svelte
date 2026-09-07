<script lang="ts">
	import { Button } from '$lib/registry/ui/button';
	import { Input } from '$lib/registry/ui/input';
	import { Field, FieldLabel, FieldDescription, FieldError } from '$lib/registry/ui/field';
	import { ListRow } from '$lib/registry/ui/list-row';
	import { Top } from '$lib/registry/ui/top';
	import { ActionFooter } from '$lib/registry/ui/action-footer';
	import { Switch } from '$lib/registry/ui/switch';
	import { Badge } from '$lib/registry/ui/badge';
	import {
		Dialog,
		DialogTrigger,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogFooter,
		DialogClose
	} from '$lib/registry/ui/dialog';
	let name = $state('');
	let checked = $state(true);
	let saving = $state(false);
	async function save() {
		saving = true;
		try {
			await new Promise((resolve) => setTimeout(resolve, 1200));
		} finally {
			saving = false;
		}
	}
</script>

<div class="w-full max-w-md">
	<Top
		eyebrow="Your space"
		title="Make yourself at home"
		description="A few details to get started."
	/>
	<div class="space-y-5 px-6 pb-6">
		<Field>
			<FieldLabel for="style-name">Name</FieldLabel>
			<Input
				id="style-name"
				bind:value={name}
				placeholder="Your name"
				aria-describedby="style-name-help"
			/>
			<FieldDescription id="style-name-help">You can change this later.</FieldDescription>
		</Field>
		<Field>
			<FieldLabel for="style-line">Display name</FieldLabel>
			<Input
				id="style-line"
				variant="line"
				placeholder="Choose a name"
				aria-invalid="true"
				aria-describedby="style-line-error"
			/>
			<FieldError id="style-line-error">This name is already in use.</FieldError>
		</Field>
	</div>
	<ListRow title="Updates" description="Get news about your account">
		{#snippet trailing()}<Switch bind:checked aria-label="Account updates" />{/snippet}
	</ListRow>
	<ListRow title="Membership" description="Everything you need to get started">
		{#snippet trailing()}<Badge>Free</Badge>{/snippet}
	</ListRow>
	<ActionFooter>
		<Dialog>
			<DialogTrigger
				>{#snippet child({ props })}<Button variant="soft" size="xl" {...props}>Review</Button
					>{/snippet}</DialogTrigger
			>
			<DialogContent>
				<DialogHeader
					><DialogTitle>Ready to continue?</DialogTitle><DialogDescription
						>Your choices can be changed at any time.</DialogDescription
					></DialogHeader
				>
				<DialogFooter
					><DialogClose
						>{#snippet child({ props })}<Button variant="soft" {...props}>Go back</Button
							>{/snippet}</DialogClose
					><Button onclick={save} loading={saving}>Confirm</Button></DialogFooter
				>
			</DialogContent>
		</Dialog>
		<Button size="xl" loading={saving} onclick={save}>Continue</Button>
	</ActionFooter>
</div>
