<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { getDesignStyle, STYLE_NAMES, DESIGN_STYLES, isStyle } from '#lib/design-style.js';
	import {
		Select,
		SelectTrigger,
		SelectContent,
		SelectItem
	} from '#lib/registry/ui/select/index.js';
	const style = getDesignStyle();
	function remember(value: string) {
		if (!isStyle(value)) return;
		style.current = value;
		try {
			localStorage.setItem('lily-design-style', style.current);
		} catch {
			/* Optional persistence. */
		}
		// After a shallow navigation, `page.url` is still the rendered page;
		// the visible URL is `page.shallow.url`.
		const url = new URL((page.shallow?.url ?? page.url).href);
		url.searchParams.set('style', style.current);
		// The current page URL already includes the configured base path.
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(url, { shallow: true, replace: true, state: page.state });
	}
</script>

<Select type="single" value={style.current} onValueChange={remember}>
	<SelectTrigger aria-label="Design style" class="min-w-32">
		{DESIGN_STYLES[style.current].label}
	</SelectTrigger>
	<SelectContent>
		{#each STYLE_NAMES as name (name)}
			<SelectItem value={name}>{DESIGN_STYLES[name].label}</SelectItem>
		{/each}
	</SelectContent>
</Select>
