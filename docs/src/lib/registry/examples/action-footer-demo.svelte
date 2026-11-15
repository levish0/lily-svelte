<script lang="ts">
	import { cn } from '#lib/utils.js';
	import { ActionFooter } from '#lib/registry/ui/action-footer/index.js';
	import { Button } from '#lib/registry/ui/button/index.js';
	import { Top } from '#lib/registry/ui/top/index.js';
	let message = $state('');
</script>

<div class={cn('lily-bottom-demo-stage grid w-full max-w-sm gap-4')}>
	<section
		aria-label="Single bottom action"
		class={cn(
			'lily-bottom-demo-screen flex min-h-[280px] flex-col overflow-hidden rounded-[20px] bg-(--bg-elevated)'
		)}
	>
		<Top title="Join a workshop" description="An afternoon of making small bowls" />
		<p class={cn('lily-bottom-demo-body px-4 text-[15px] leading-relaxed text-(--text)/56')}>
			All skill levels welcome. Tools and materials are provided.
		</p>
		<ActionFooter class="mt-auto bg-transparent"
			><Button onclick={() => (message = 'Booking started')}>Book now</Button></ActionFooter
		>
	</section>

	<p role="status" class="min-h-5 text-sm text-(--text)/56">{message}</p>
</div>
