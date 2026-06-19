<script lang="ts">
	import {
		Field,
		FieldGroup,
		FieldLabel,
		FieldDescription,
		FieldError
	} from '$lib/registry/ui/field';
	import { Input } from '$lib/registry/ui/input';
</script>

<FieldGroup class="w-full max-w-sm">
	<Field>
		<FieldLabel for="field-email">Email</FieldLabel>
		<Input id="field-email" type="email" placeholder="you@example.com" />
		<FieldDescription>We'll never share your email.</FieldDescription>
	</Field>
	<Field>
		<FieldLabel for="field-username">Username</FieldLabel>
		<Input id="field-username" placeholder="example" aria-invalid="true" />
		<FieldError>This username is already taken.</FieldError>
	</Field>
</FieldGroup>
