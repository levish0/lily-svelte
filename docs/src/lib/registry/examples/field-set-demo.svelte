<script lang="ts">
	import {
		Field,
		FieldGroup,
		FieldSet,
		FieldLegend,
		FieldLabel,
		FieldDescription,
		FieldSeparator
	} from '$lib/registry/ui/field';
	import { Input } from '$lib/registry/ui/input';
	import { Checkbox } from '$lib/registry/ui/checkbox';
</script>

<FieldGroup class="w-full max-w-sm">
	<FieldSet>
		<FieldLegend>Shipping address</FieldLegend>
		<Field>
			<FieldLabel for="fs-street">Street</FieldLabel>
			<Input id="fs-street" placeholder="1 Lily Lane" />
		</Field>
		<Field>
			<FieldLabel for="fs-city">City</FieldLabel>
			<Input id="fs-city" placeholder="Seoul" />
		</Field>
	</FieldSet>
	<FieldSeparator>Or</FieldSeparator>
	<Field class="flex-row items-center gap-3">
		<Checkbox id="fs-same" />
		<div class="flex flex-col gap-1">
			<FieldLabel for="fs-same">Same as billing address</FieldLabel>
			<FieldDescription>We'll copy it over when you save.</FieldDescription>
		</div>
	</Field>
</FieldGroup>
