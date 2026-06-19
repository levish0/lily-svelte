<script lang="ts">
	import {
		Drawer,
		DrawerTrigger,
		DrawerContent,
		DrawerHeader,
		DrawerTitle,
		DrawerDescription,
		DrawerFooter,
		DrawerClose
	} from '$lib/registry/ui/drawer';
	import { Button } from '$lib/registry/ui/button';
</script>

<Drawer>
	<DrawerTrigger>
		{#snippet child({ props })}
			<Button variant="ghost" {...props}>Open drawer</Button>
		{/snippet}
	</DrawerTrigger>
	<DrawerContent>
		<div class="mx-auto w-full max-w-sm">
			<DrawerHeader>
				<DrawerTitle>Move goal</DrawerTitle>
				<DrawerDescription>Set your daily activity goal.</DrawerDescription>
			</DrawerHeader>
			<DrawerFooter>
				<Button>Submit</Button>
				<DrawerClose>
					{#snippet child({ props })}
						<Button variant="ghost" {...props}>Cancel</Button>
					{/snippet}
				</DrawerClose>
			</DrawerFooter>
		</div>
	</DrawerContent>
</Drawer>
