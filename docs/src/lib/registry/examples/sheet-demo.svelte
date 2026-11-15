<script lang="ts">
	import {
		Sheet,
		SheetTrigger,
		SheetContent,
		SheetHeader,
		SheetTitle,
		SheetDescription,
		SheetFooter,
		SheetClose
	} from '#lib/registry/ui/sheet/index.js';
	import { Button } from '#lib/registry/ui/button/index.js';
</script>

<Sheet>
	<SheetTrigger>
		{#snippet child({ props })}
			<Button variant="soft" {...props}>Open sheet</Button>
		{/snippet}
	</SheetTrigger>
	<SheetContent side="right">
		<SheetHeader>
			<SheetTitle>Edit profile</SheetTitle>
			<SheetDescription>Make changes to your profile, then save.</SheetDescription>
		</SheetHeader>
		<SheetFooter>
			<SheetClose>
				{#snippet child({ props })}
					<Button {...props}>Save changes</Button>
				{/snippet}
			</SheetClose>
		</SheetFooter>
	</SheetContent>
</Sheet>
