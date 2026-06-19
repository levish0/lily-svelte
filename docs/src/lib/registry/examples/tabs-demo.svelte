<script lang="ts">
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/registry/ui/tabs';
</script>

<Tabs value="account" class="w-full max-w-md">
	<TabsList>
		<TabsTrigger value="account">Account</TabsTrigger>
		<TabsTrigger value="password">Password</TabsTrigger>
	</TabsList>
	<TabsContent value="account" class="text-sm leading-[1.6] tracking-[-0.39px] text-(--text)/72">
		Make changes to your account here. Click save when you're done.
	</TabsContent>
	<TabsContent value="password" class="text-sm leading-[1.6] tracking-[-0.39px] text-(--text)/72">
		Change your password here. You'll be signed out afterwards.
	</TabsContent>
</Tabs>
