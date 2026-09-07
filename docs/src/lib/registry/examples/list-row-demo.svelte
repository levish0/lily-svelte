<script lang="ts">
	import { ListRow } from '$lib/registry/ui/list-row';
	import { Switch } from '$lib/registry/ui/switch';
	import { Button } from '$lib/registry/ui/button';
	import Icon from '@iconify/svelte';
	let reminder = $state(true);
	let saved = $state(false);
</script>

<div class="w-full max-w-md">
	<div class="overflow-hidden rounded-[20px] bg-(--bg-elevated) py-2">
		<ListRow
			title="Class reminders"
			description="Get a reminder before your class"
			density="default"
		>
			{#snippet leading()}<Icon icon="heroicons:bell-solid" class="size-6" />{/snippet}
			{#snippet trailing()}<Switch aria-label="Class reminders" bind:checked={reminder} />{/snippet}
		</ListRow>
		<ListRow title="Drawing class" description="Sunday · North Studio" density="default">
			{#snippet trailing()}<Button size="sm" variant="soft" onclick={() => (saved = !saved)}
					>{saved ? 'Saved' : 'Save'}</Button
				>{/snippet}
		</ListRow>
	</div>
</div>
