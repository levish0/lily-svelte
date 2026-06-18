<script lang="ts">
	import { HoverCard, HoverCardTrigger, HoverCardContent } from '$lib/registry/ui/hover-card';
	import { Avatar } from '$lib/registry/ui/avatar';
</script>

<HoverCard>
	<HoverCardTrigger href="https://levish.ac" target="_blank" rel="noreferrer" class="link font-medium tracking-[-0.39px]">
		@levish
	</HoverCardTrigger>
	<HoverCardContent>
		<div class="flex gap-3">
			<Avatar src="/favicon.svg" alt="levish" />
			<div class="flex flex-col gap-1">
				<p class="font-medium">levish</p>
				<p class="text-xs leading-[1.5] text-(--text)/56">
					Building lily — a Svelte component library.
				</p>
			</div>
		</div>
	</HoverCardContent>
</HoverCard>
