<script lang="ts">
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent,
		CardFooter
	} from '$lib/registry/ui/card';
	import { Button } from '$lib/registry/ui/button';
</script>

<Card class="w-full max-w-sm">
	<CardHeader>
		<CardTitle>Upgrade to Pro</CardTitle>
		<CardDescription>Unlock every component and priority support.</CardDescription>
	</CardHeader>
	<CardContent>
		<p class="text-sm leading-[1.6] tracking-[-0.39px] text-(--text)/72">
			Your trial ends in 7 days. Upgrade now to keep your projects running without interruption.
		</p>
	</CardContent>
	<CardFooter>
		<Button>Upgrade</Button>
		<Button variant="ghost">Maybe later</Button>
	</CardFooter>
</Card>
