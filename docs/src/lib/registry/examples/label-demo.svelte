<script lang="ts">
	import { Label } from '$lib/registry/ui/label';
	import { Input } from '$lib/registry/ui/input';
</script>

<div class="flex max-w-xs flex-col gap-2">
	<Label for="email">Email</Label>
	<Input id="email" type="email" placeholder="you@example.com" />
</div>
