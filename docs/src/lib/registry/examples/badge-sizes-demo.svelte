<script lang="ts">
	import { Badge, type BadgeSize, type BadgeColor } from '$lib/registry/ui/badge';
	const sizes: BadgeSize[] = ['xs', 'sm', 'md', 'lg'];
	const colors: BadgeColor[] = ['blue', 'teal', 'green', 'red', 'yellow', 'elephant'];
</script>

<div class="flex flex-col gap-5">
	<div class="flex flex-wrap items-center gap-2">
		{#each sizes as size (size)}<Badge {size} variant="solid">{size}</Badge>{/each}
	</div>
	{#each ['solid', 'soft'] as variant (variant)}
		<div class="flex flex-wrap items-center gap-2">
			{#each colors as color (color)}<Badge {color} variant={variant === 'solid' ? 'solid' : 'soft'}
					>{color}</Badge
				>{/each}
		</div>
	{/each}
</div>
