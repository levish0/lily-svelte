<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex flex-col gap-10">
	<div class="flex flex-col gap-1">
		<h1 class="text-xl font-semibold tracking-[-0.6px]">Button</h1>
		<p class="text-sm tracking-[-0.39px] text-(--text)/48">클릭 가능한 인터랙티브 요소</p>
	</div>

	<section class="flex flex-col gap-4">
		<h2 class="text-sm font-medium tracking-[-0.39px] text-(--text)/48">Variant</h2>
		<div class="flex flex-wrap items-center gap-3">
			<Button>Default</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Destructive</Button>
		</div>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-sm font-medium tracking-[-0.39px] text-(--text)/48">Size</h2>
		<div class="flex flex-wrap items-end gap-3">
			<Button size="sm">Small</Button>
			<Button>Default</Button>
			<Button size="lg">Large</Button>
		</div>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-sm font-medium tracking-[-0.39px] text-(--text)/48">States</h2>
		<div class="flex flex-wrap items-center gap-3">
			<Button disabled>Disabled</Button>
			<Button href="/">Link</Button>
		</div>
	</section>
</div>
