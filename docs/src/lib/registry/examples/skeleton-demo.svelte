<script lang="ts">
	import { Skeleton } from '$lib/registry/ui/skeleton';
</script>

<div class="flex items-center gap-4">
	<Skeleton class="size-12 rounded-full" />
	<div class="flex flex-col gap-2">
		<Skeleton class="h-4 w-40" />
		<Skeleton class="h-4 w-24" />
	</div>
</div>
