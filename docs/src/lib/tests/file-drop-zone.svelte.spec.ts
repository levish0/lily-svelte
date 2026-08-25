import { page } from 'vitest/browser';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Fixture from './file-drop-zone-test-fixture.svelte';

test('limits file selection to the compound trigger', async () => {
	render(Fixture);

	const input = document.querySelector<HTMLInputElement>('input[type="file"]');
	const trigger = document.querySelector<HTMLLabelElement>('[data-testid="file-trigger"]');
	const roots = document.querySelectorAll<HTMLElement>('[data-slot="file-drop-zone"]');

	expect(input).not.toBeNull();
	expect(roots[0]?.tagName).toBe('DIV');
	expect(trigger?.tagName).toBe('LABEL');
	expect(trigger?.htmlFor).toBe(input?.id);
	expect(roots[1]?.tagName).toBe('LABEL');
	expect(roots[1]?.querySelector('[data-slot="file-drop-zone-trigger"]')?.tagName).toBe('SPAN');

	await page.getByTestId('delete').click();
	await expect.element(page.getByTestId('deleted')).toHaveTextContent('1');

	const transfer = new DataTransfer();
	transfer.items.add(new File(['avatar'], 'avatar.png', { type: 'image/png' }));
	input!.files = transfer.files;
	input!.dispatchEvent(new Event('change', { bubbles: true }));

	await expect.element(page.getByTestId('uploaded')).toHaveTextContent('avatar.png');
});
