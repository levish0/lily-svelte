<script lang="ts">
	import { getDesignStyle, DESIGN_STYLES } from '$lib/design-style';
	const style = getDesignStyle();
	import PmCommand from '$lib/components/pm-command.svelte';

	let { name }: { name: string } = $props();
</script>

<PmCommand type="execute" command={`lily-svelte@latest add ${name}`} />

<p class="mt-2 text-xs text-(--text)/56">
	Installs the style saved in <code>lily.json</code>. For a new {DESIGN_STYLES[style.current].label} project,
	run <code>lily-svelte init --style {style.current}</code> first.
</p>
