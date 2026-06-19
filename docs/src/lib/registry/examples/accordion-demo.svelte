<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
		AccordionContent
	} from '$lib/registry/ui/accordion';
</script>

<Accordion type="single" class="w-full max-w-md">
	<AccordionItem value="item-1">
		<AccordionTrigger>Is it accessible?</AccordionTrigger>
		<AccordionContent>Yes. It is built on Bits UI and follows WAI-ARIA patterns.</AccordionContent>
	</AccordionItem>
	<AccordionItem value="item-2">
		<AccordionTrigger>Is it styled?</AccordionTrigger>
		<AccordionContent>Yes, with the single unified lily style — no theme variants.</AccordionContent
		>
	</AccordionItem>
	<AccordionItem value="item-3">
		<AccordionTrigger>Can I customize it?</AccordionTrigger>
		<AccordionContent>Of course — you own the source once you add it.</AccordionContent>
	</AccordionItem>
</Accordion>
