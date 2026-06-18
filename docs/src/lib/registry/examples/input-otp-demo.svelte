<script lang="ts">
	import {
		InputOTP,
		InputOTPGroup,
		InputOTPSlot,
		InputOTPSeparator
	} from '$lib/registry/ui/input-otp';
</script>

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
