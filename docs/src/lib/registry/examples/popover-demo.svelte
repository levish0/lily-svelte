<script lang="ts">
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/registry/ui/popover';
	import { Button } from '$lib/registry/ui/button';
	import { Label } from '$lib/registry/ui/label';
	import { Input } from '$lib/registry/ui/input';
</script>

<Popover>
	<PopoverTrigger>
		{#snippet child({ props })}
			<Button variant="ghost" {...props}>Open popover</Button>
		{/snippet}
	</PopoverTrigger>
	<PopoverContent>
		<div class="flex flex-col gap-3">
			<div class="flex flex-col gap-1">
				<p class="text-sm font-medium tracking-[-0.39px]">Dimensions</p>
				<p class="text-xs tracking-[-0.3px] text-(--text)/48">Set the layout dimensions.</p>
			</div>
			<div class="flex flex-col gap-2">
				<Label for="width">Width</Label>
				<Input id="width" value="100%" />
			</div>
		</div>
	</PopoverContent>
</Popover>
