<script lang="ts">
	import * as Resizable from '$lib/registry/ui/resizable';
</script>

<Resizable.PaneGroup
	direction="horizontal"
	class="h-48 w-full max-w-md overflow-hidden rounded-3xl bg-(--text)/5"
>
	<Resizable.Pane defaultSize={50}>
		<div class="flex h-full items-center justify-center p-6 text-sm tracking-[-0.39px] text-(--text)/72">
			One
		</div>
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={50}>
		<Resizable.PaneGroup direction="vertical">
			<Resizable.Pane defaultSize={50}>
				<div class="flex h-full items-center justify-center p-6 text-sm tracking-[-0.39px] text-(--text)/72">
					Two
				</div>
			</Resizable.Pane>
			<Resizable.Handle withHandle />
			<Resizable.Pane defaultSize={50}>
				<div class="flex h-full items-center justify-center p-6 text-sm tracking-[-0.39px] text-(--text)/72">
					Three
				</div>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
