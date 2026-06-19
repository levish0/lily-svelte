<script lang="ts">
	import { Select, SelectTrigger, SelectContent, SelectItem } from '$lib/registry/ui/select';

	let value = $state('');
</script>

<Select type="single" bind:value>
	<SelectTrigger>
		<span class={value ? '' : 'text-(--text)/40'}>{value || 'Select a fruit'}</span>
	</SelectTrigger>
	<SelectContent>
		<SelectItem value="Apple">Apple</SelectItem>
		<SelectItem value="Banana">Banana</SelectItem>
		<SelectItem value="Blueberry">Blueberry</SelectItem>
		<SelectItem value="Grapes">Grapes</SelectItem>
		<SelectItem value="Pineapple">Pineapple</SelectItem>
	</SelectContent>
</Select>
