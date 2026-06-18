<script lang="ts">
	import { Avatar } from '$lib/registry/ui/avatar';
</script>

<div class="flex flex-col gap-10">
	<div class="flex flex-col gap-1">
		<h1 class="text-xl font-semibold tracking-[-0.6px]">Avatar</h1>
		<p class="text-sm tracking-[-0.39px] text-(--text)/48">사용자 프로필 이미지</p>
	</div>

	<section class="flex flex-col gap-4">
		<h2 class="text-sm font-medium tracking-[-0.39px] text-(--text)/48">Size</h2>
		<div class="flex items-end gap-3">
			<Avatar size="xs" />
			<Avatar size="sm" />
			<Avatar />
			<Avatar size="lg" />
			<Avatar size="xl" />
		</div>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-sm font-medium tracking-[-0.39px] text-(--text)/48">With image</h2>
		<div class="flex items-center gap-3">
			<Avatar src="/favicon.svg" alt="levish" size="lg" />
			<div class="flex flex-col tracking-[-0.48px]">
				<span class="text-base font-medium">levish</span>
				<span class="text-sm text-(--text)/48">levish.ac</span>
			</div>
		</div>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-sm font-medium tracking-[-0.39px] text-(--text)/48">Fallback</h2>
		<div class="flex items-end gap-3">
			<Avatar size="sm" />
			<Avatar />
			<Avatar size="lg" />
		</div>
	</section>
</div>
