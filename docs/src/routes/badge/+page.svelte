<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
</script>

<div class="flex flex-col gap-10">
	<div class="flex flex-col gap-1">
		<h1 class="text-xl font-semibold tracking-[-0.6px]">Badge</h1>
		<p class="text-sm tracking-[-0.39px] text-(--text)/48">태그, 라벨, 상태 표시</p>
	</div>

	<section class="flex flex-col gap-4">
		<h2 class="text-sm font-medium tracking-[-0.39px] text-(--text)/48">Default</h2>
		<div class="flex flex-wrap gap-2">
			<Badge>svelte</Badge>
			<Badge>typescript</Badge>
			<Badge>tailwindcss</Badge>
			<Badge>open source</Badge>
			<Badge>design system</Badge>
		</div>
	</section>
</div>
