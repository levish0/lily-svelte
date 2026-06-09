<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
</script>

<div class="flex flex-col gap-10">
	<div class="flex flex-col gap-1">
		<h1 class="text-xl font-semibold tracking-[-0.6px]">Separator</h1>
		<p class="text-sm tracking-[-0.39px] text-(--text)/48">콘텐츠를 구분하는 선</p>
	</div>

	<section class="flex flex-col gap-4">
		<h2 class="text-sm font-medium tracking-[-0.39px] text-(--text)/48">Horizontal</h2>
		<div class="flex flex-col gap-4">
			<p class="text-sm tracking-[-0.39px] text-(--text)/72">위 콘텐츠</p>
			<Separator />
			<p class="text-sm tracking-[-0.39px] text-(--text)/72">아래 콘텐츠</p>
		</div>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-sm font-medium tracking-[-0.39px] text-(--text)/48">Vertical</h2>
		<div class="flex h-6 items-center gap-4 text-sm tracking-[-0.39px] text-(--text)/72">
			<span>Blog</span>
			<Separator orientation="vertical" />
			<span>Projects</span>
			<Separator orientation="vertical" />
			<span>About</span>
		</div>
	</section>
</div>
