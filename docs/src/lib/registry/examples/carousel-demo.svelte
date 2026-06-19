<script lang="ts">
	import * as Carousel from '$lib/registry/ui/carousel';
</script>

<div class="px-12">
	<Carousel.Root class="w-full max-w-xs">
		<Carousel.Content>
			{#each Array.from({ length: 5 }) as _, i (i)}
				<Carousel.Item>
					<div
						class="flex aspect-square items-center justify-center rounded-3xl bg-(--text)/5 text-4xl font-semibold tracking-[-2px] text-(--text)/72"
					>
						{i + 1}
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
