<script lang="ts">
	import { Toc, type TocItem } from '#lib/registry/ui/toc/index.js';

	let { toc }: { toc: TocItem[] } = $props();
</script>

<Toc {toc} />
