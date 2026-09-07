<script lang="ts">
	import { cn } from '$lib/utils';
	import { ActionFooter } from '$lib/registry/ui/action-footer';
	import { Button } from '$lib/registry/ui/button';
	import { Top } from '$lib/registry/ui/top';
	let message = $state('');
</script>

<div class={cn('lily-bottom-demo-stage grid w-full max-w-sm gap-4')}>
	<section
		aria-label="Double bottom action"
		class={cn(
			'lily-bottom-demo-screen flex min-h-[280px] flex-col overflow-hidden rounded-[20px] bg-(--bg-elevated)'
		)}
	>
		<Top title="Save your progress?" description="Pick up where you left off later." />
		<ActionFooter class="mt-auto bg-transparent">
			<Button variant="soft" tone="neutral" onclick={() => (message = 'Editing resumed')}
				>Go back</Button
			>
			<Button onclick={() => (message = 'Draft saved')}>Save draft</Button>
		</ActionFooter>
	</section>
	<p role="status" class="min-h-5 text-sm text-(--text)/56">{message}</p>
</div>
