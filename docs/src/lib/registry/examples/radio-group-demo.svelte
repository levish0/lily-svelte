<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '$lib/registry/ui/radio-group';
	import { Label } from '$lib/registry/ui/label';
</script>

<RadioGroup value="comfortable">
	<div class="flex items-center gap-3">
		<RadioGroupItem value="default" id="r-default" />
		<Label for="r-default">Default</Label>
	</div>
	<div class="flex items-center gap-3">
		<RadioGroupItem value="comfortable" id="r-comfortable" />
		<Label for="r-comfortable">Comfortable</Label>
	</div>
	<div class="flex items-center gap-3">
		<RadioGroupItem value="compact" id="r-compact" />
		<Label for="r-compact">Compact</Label>
	</div>
</RadioGroup>
