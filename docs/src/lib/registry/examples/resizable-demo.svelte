<script lang="ts">
	import * as Resizable from '$lib/registry/ui/resizable';
</script>

<Resizable.PaneGroup
	direction="horizontal"
	class="h-52 w-full max-w-md overflow-hidden rounded-3xl bg-(--text)/5"
>
	<Resizable.Pane defaultSize={35} minSize={20}>
		<div class="flex h-full flex-col gap-1 p-5 text-sm tracking-[-0.39px]">
			<span class="font-medium text-(--text)">Sidebar</span>
			<span class="text-(--text)/48">Drag the divider →</span>
		</div>
	</Resizable.Pane>
	<Resizable.Handle />
	<Resizable.Pane defaultSize={65}>
		<div
			class="flex h-full items-center justify-center p-5 text-sm font-medium tracking-[-0.39px] text-(--text)/72"
		>
			Content
		</div>
	</Resizable.Pane>
</Resizable.PaneGroup>
