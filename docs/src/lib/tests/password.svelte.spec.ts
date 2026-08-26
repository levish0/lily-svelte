import { page } from 'vitest/browser';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Fixture from './password-test-fixture.svelte';

test('shows password strength without recursively updating the score reader', async () => {
	render(Fixture);

	await page
		.getByRole('textbox', { name: 'Password', exact: true })
		.fill('correct horse battery staple');

	await expect.element(page.getByText('Strong')).toBeVisible();
});
