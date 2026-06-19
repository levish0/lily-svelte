<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as Stepper from '$lib/registry/ui/stepper';

	let step = $state(1);

	const steps = [
		{ title: 'Account', description: 'Your details' },
		{ title: 'Profile', description: 'Set up profile' },
		{ title: 'Finish', description: 'Review & submit' }
	];
</script>

<Stepper.Root bind:step>
	<div class="flex w-full max-w-xl flex-col gap-8">
		<Stepper.Nav>
			{#each steps as s, i (s.title)}
				<Stepper.Item>
					<Stepper.Trigger>
						<Stepper.Indicator>
							{#if step > i + 1}
								<Icon icon="heroicons:check-solid" aria-hidden="true" />
							{:else}
								{i + 1}
							{/if}
						</Stepper.Indicator>
						<Stepper.Title>{s.title}</Stepper.Title>
						<Stepper.Description>{s.description}</Stepper.Description>
					</Stepper.Trigger>
					<Stepper.Separator />
				</Stepper.Item>
			{/each}
		</Stepper.Nav>

		<div class="flex justify-between">
			<Stepper.Previous size="sm">Back</Stepper.Previous>
			<Stepper.Next size="sm">Next</Stepper.Next>
		</div>
	</div>
</Stepper.Root>
