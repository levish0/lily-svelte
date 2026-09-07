import { expect, test } from '@playwright/test';

for (const style of ['diamond', 'aquamarine']) {
	for (const width of [1280, 390]) {
		test(`${style} command keyboard selection and preview height at ${width}px`, async ({
			page
		}) => {
			await page.setViewportSize({ width, height: 900 });
			await page.goto(`/docs/components/command?style=${style}`);
			await page.waitForSelector('html[data-lily-style]');
			const preview = page.locator(`[data-preview="command-demo"][data-style="${style}"]`);
			await expect(preview).toBeVisible();
			const content = preview;
			const input = content.getByRole('combobox', { name: 'Search commands' });
			await expect(content.getByRole('option', { selected: true })).toHaveText('Calendar');
			await input.fill('cal');
			await expect(content.getByRole('option')).toHaveCount(2);
			await expect(content.getByRole('option', { selected: true })).toHaveText('Calendar');
			await input.press('ArrowDown');
			await expect(content.getByRole('option', { selected: true })).toHaveText('Calculator');
			await input.press('Enter');
			await expect(content.getByRole('status')).toHaveText('Selected: Calculator');
			await expect(input).toBeFocused();
			await input.press('ArrowUp');
			await input.press('Enter');
			await expect(content.getByRole('status')).toHaveText('Selected: Calendar');
			await input.press('ArrowUp');
			await expect(content.getByRole('option', { selected: true })).toHaveText('Calculator');
			await input.fill('no-such-command');
			await expect(content.getByText('No results found.')).toBeVisible();
			await input.press('Enter');
			await expect(content.getByRole('status')).toHaveText('Selected: Calendar');
			await input.fill('');
			await expect(content.getByRole('option')).toHaveCount(6);
			await content.getByRole('option', { name: 'Billing', exact: true }).click();
			await expect(content.getByRole('status')).toHaveText('Selected: Billing');
			await expect(preview.locator('iframe')).toHaveCount(0);
		});
	}
}
