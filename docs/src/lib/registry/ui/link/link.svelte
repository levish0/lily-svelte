<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		href,
		target,
		rel,
		external,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes, HTMLAnchorElement> & {
		/** Force external-link handling; by default it is inferred from `href`. */
		external?: boolean;
	} = $props();

	// anything with a scheme or a protocol-relative prefix leaves the site
	const isExternal = $derived(external ?? /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href ?? ''));
</script>

<!-- `.link` is the animated underline from the lily base stylesheet -->
<a
	bind:this={ref}
	data-slot="link"
	{href}
	target={target ?? (isExternal ? '_blank' : undefined)}
	rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
	class={cn('link font-medium', className)}
	{...restProps}
>
	{@render children?.()}
</a>
