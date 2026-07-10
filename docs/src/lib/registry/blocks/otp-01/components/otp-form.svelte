<script lang="ts">
	import { Button } from '$lib/registry/ui/button/index.js';
	import * as Card from '$lib/registry/ui/card/index.js';
	import {
		InputOTP,
		InputOTPGroup,
		InputOTPSlot,
		InputOTPSeparator
	} from '$lib/registry/ui/input-otp/index.js';
	import { Field, FieldGroup, FieldDescription } from '$lib/registry/ui/field/index.js';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-xl">Verify your email</Card.Title>
		<Card.Description>Enter the 6-digit code sent to your email address</Card.Description>
	</Card.Header>
	<Card.Content>
		<form>
			<FieldGroup>
				<Field>
					<div class="flex justify-center">
						<InputOTP maxlength={6}>
							{#snippet children({ cells })}
								<InputOTPGroup>
									{#each cells.slice(0, 3) as cell (cell)}
										<InputOTPSlot {cell} />
									{/each}
								</InputOTPGroup>
								<InputOTPSeparator />
								<InputOTPGroup>
									{#each cells.slice(3, 6) as cell (cell)}
										<InputOTPSlot {cell} />
									{/each}
								</InputOTPGroup>
							{/snippet}
						</InputOTP>
					</div>
				</Field>
				<Field>
					<Button type="submit" class="w-full">Verify</Button>
					<FieldDescription class="text-center">
						Didn't receive a code?
						<a
							href="##"
							class="text-(--text) underline underline-offset-4 transition-colors duration-150"
						>
							Resend
						</a>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	</Card.Content>
</Card.Root>
