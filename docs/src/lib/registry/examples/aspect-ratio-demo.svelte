<script lang="ts">
	import { AspectRatio } from '$lib/registry/ui/aspect-ratio';
</script>

<div class="w-full max-w-sm">
	<AspectRatio ratio={16 / 9}>
		<div
			class="flex size-full items-center justify-center rounded-3xl bg-(--text)/6 text-sm tracking-[-0.39px] text-(--text)/48"
		>
			16 / 9
		</div>
	</AspectRatio>
</div>
