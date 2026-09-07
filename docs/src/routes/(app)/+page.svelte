<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import HomeShowcase from '$lib/registry/examples/home-showcase.svelte';
	import { getDesignStyle } from '$lib/design-style';
	const style = getDesignStyle();
</script>

<Seo
	title="lily — calm, rounded Svelte 5 components"
	description="A calm, rounded Svelte 5 component library — Diamond and Aquamarine design styles. Copy-paste components installed by CLI, and yours to own."
/>

<div data-home-showcase data-style={style.current}>
	<HomeShowcase />
</div>
