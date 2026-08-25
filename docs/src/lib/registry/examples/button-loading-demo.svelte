<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/registry/ui/button';

	let saving = $state(false);

	async function save() {
		saving = true;
		await new Promise((r) => setTimeout(r, 1800));
		saving = false;
	}
</script>

<div class="flex flex-wrap items-center gap-3">
	<Button loading={saving} onclick={save}>Save changes</Button>
	<Button variant="soft" loading={saving} onclick={save}>Save</Button>
	<Button size="icon" variant="ghost" loading={saving} onclick={save} aria-label="Save">
		<Icon icon="heroicons:check-solid" class="size-5" aria-hidden="true" />
	</Button>
</div>
