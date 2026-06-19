<script lang="ts">
	import { Separator } from '$lib/registry/ui/separator';
</script>

<div class="flex w-full max-w-sm flex-col gap-4">
	<div class="flex flex-col gap-1">
		<p class="text-base font-medium tracking-[-0.48px] text-(--text)">lily</p>
		<p class="text-sm tracking-[-0.39px] text-(--text)/72">A calm Svelte component library.</p>
	</div>

	<Separator />

	<div class="flex h-5 items-center gap-4 text-sm tracking-[-0.39px] text-(--text)/56">
		<span>Docs</span>
		<Separator orientation="vertical" />
		<span>Components</span>
		<Separator orientation="vertical" />
		<span>GitHub</span>
	</div>
</div>
