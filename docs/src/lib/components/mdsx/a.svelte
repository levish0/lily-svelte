<script lang="ts">
	import { Link } from '$lib/registry/ui/link/index.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let { children, ...restProps }: HTMLAnchorAttributes = $props();
</script>

<Link {...restProps}>
	{@render children?.()}
</Link>
