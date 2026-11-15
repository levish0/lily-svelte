<script lang="ts">
	import { Label } from '#lib/registry/ui/label/index.js';
	import { Input } from '#lib/registry/ui/input/index.js';
</script>

<div class="flex max-w-xs flex-col gap-2">
	<Label for="email">Email</Label>
	<Input id="email" type="email" placeholder="you@example.com" />
</div>
