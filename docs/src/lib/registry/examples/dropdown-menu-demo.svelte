<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuLabel
	} from '#lib/registry/ui/dropdown-menu/index.js';
	import { Button } from '#lib/registry/ui/button/index.js';
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		{#snippet child({ props })}
			<Button variant="soft" {...props}>Open menu</Button>
		{/snippet}
	</DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuLabel>My Account</DropdownMenuLabel>
		<DropdownMenuItem>Profile</DropdownMenuItem>
		<DropdownMenuItem>Settings</DropdownMenuItem>
		<DropdownMenuItem>Billing</DropdownMenuItem>
		<DropdownMenuSeparator />
		<DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>
