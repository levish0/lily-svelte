<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuLabel
	} from '$lib/registry/ui/dropdown-menu';
	import { Button } from '$lib/registry/ui/button';
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		{#snippet child({ props })}
			<Button variant="ghost" {...props}>Open menu</Button>
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
