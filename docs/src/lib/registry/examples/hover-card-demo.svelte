<script lang="ts">
	import { HoverCard, HoverCardTrigger, HoverCardContent } from '$lib/registry/ui/hover-card';
	import { Avatar } from '$lib/registry/ui/avatar';
</script>

<HoverCard>
	<HoverCardTrigger
		href="https://example.com"
		target="_blank"
		rel="noreferrer"
		class="link font-medium tracking-[-0.39px]"
	>
		@example
	</HoverCardTrigger>
	<HoverCardContent>
		<div class="flex gap-3">
			<Avatar src="/levish_avatar.png" alt="example" />
			<div class="flex flex-col gap-1">
				<p class="font-medium">example</p>
				<p class="text-xs leading-[1.5] text-(--text)/56">
					Building lily — a Svelte component library.
				</p>
			</div>
		</div>
	</HoverCardContent>
</HoverCard>
