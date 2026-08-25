<script lang="ts">
	import {
		Select,
		SelectTrigger,
		SelectContent,
		SelectGroup,
		SelectGroupHeading,
		SelectSeparator,
		SelectItem
	} from '$lib/registry/ui/select';

	let value = $state('');
</script>

<Select type="single" bind:value>
	<SelectTrigger>
		<span class={value ? '' : 'text-(--text)/40'}>{value || 'Select a timezone'}</span>
	</SelectTrigger>
	<SelectContent>
		<SelectGroup>
			<SelectGroupHeading>Asia</SelectGroupHeading>
			<SelectItem value="Seoul">Seoul</SelectItem>
			<SelectItem value="Tokyo">Tokyo</SelectItem>
			<SelectItem value="Singapore">Singapore</SelectItem>
		</SelectGroup>
		<SelectSeparator />
		<SelectGroup>
			<SelectGroupHeading>Europe</SelectGroupHeading>
			<SelectItem value="London">London</SelectItem>
			<SelectItem value="Berlin">Berlin</SelectItem>
		</SelectGroup>
	</SelectContent>
</Select>
