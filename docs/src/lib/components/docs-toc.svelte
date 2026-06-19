<script lang="ts">
	import { Toc, type TocItem } from '$lib/registry/ui/toc';

	let { toc }: { toc: TocItem[] } = $props();
</script>

<Toc {toc} />
