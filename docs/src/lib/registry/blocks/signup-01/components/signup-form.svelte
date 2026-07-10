<script lang="ts">
	import { Button } from '$lib/registry/ui/button/index.js';
	import * as Card from '$lib/registry/ui/card/index.js';
	import { Input } from '$lib/registry/ui/input/index.js';
	import { Password } from '$lib/registry/ui/password/index.js';
	import {
		Field,
		FieldGroup,
		FieldLabel,
		FieldDescription
	} from '$lib/registry/ui/field/index.js';

	const id = $props.id();

	let password = $state('');
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-xl">Create an account</Card.Title>
		<Card.Description>Enter your details below to create your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form>
			<FieldGroup>
				<Field>
					<FieldLabel for="name-{id}">Full name</FieldLabel>
					<Input id="name-{id}" type="text" placeholder="Lily Bloom" required />
				</Field>
				<Field>
					<FieldLabel for="email-{id}">Email</FieldLabel>
					<Input id="email-{id}" type="email" placeholder="m@example.com" required />
				</Field>
				<Field>
					<FieldLabel for="password-{id}">Password</FieldLabel>
					<Password id="password-{id}" bind:value={password} showStrength required />
					<FieldDescription>Use at least 8 characters.</FieldDescription>
				</Field>
				<Field>
					<Button type="submit" class="w-full">Create account</Button>
					<FieldDescription class="text-center">
						Already have an account?
						<a
							href="##"
							class="text-(--text) underline underline-offset-4 transition-colors duration-150"
						>
							Login
						</a>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	</Card.Content>
</Card.Root>
