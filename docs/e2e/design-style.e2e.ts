import { expect, test } from '@playwright/test';

test('home showcase switches actual components and preserves the selected style on navigation', async ({
	page
}) => {
	await page.goto('/?style=diamond');
	await page.waitForSelector('html[data-lily-style]');
	const showcase = page.locator('[data-home-showcase]');
	await expect(showcase.locator('[data-slot=command-item][aria-selected=true]')).toBeVisible();
	await expect(showcase.getByRole('button', { name: 'Continue', exact: true })).toHaveCSS(
		'height',
		'40px'
	);
	await page.getByRole('button', { name: 'Design style', exact: true }).click();
	await page.getByRole('option', { name: 'Aquamarine', exact: true }).click();
	await expect(showcase).toHaveAttribute('data-style', 'aquamarine');
	const content = showcase;
	await expect(content.getByRole('button', { name: 'Continue', exact: true })).toHaveCSS(
		'min-height',
		'56px'
	);
	await expect(content.locator('#home-email')).toHaveCSS('min-height', '54px');
	await expect(content.locator('#home-sw')).toHaveCSS('width', '50px');
	await content.locator('#home-email').fill('lily@example.com');
	await expect(content.locator('#home-email')).toHaveValue('lily@example.com');
	await expect(showcase.locator('iframe')).toHaveCount(0);
	await content.getByRole('link', { name: 'Get Started', exact: true }).click();
	await expect(page).toHaveURL(/\/docs$/);
	await expect(page.getByRole('button', { name: 'Design style', exact: true })).toHaveText(
		'Aquamarine'
	);
	await page.goto('/');
	await page.waitForSelector('html[data-lily-style]');
	await expect(showcase).toHaveAttribute('data-style', 'aquamarine');
	await page.getByRole('button', { name: 'Design style', exact: true }).click();
	await page.getByRole('option', { name: 'Diamond', exact: true }).click();
	await expect(showcase.getByRole('button', { name: 'Continue', exact: true })).toHaveCSS(
		'height',
		'40px'
	);
});

test('site chrome, search and component previews follow the selected style', async ({ page }) => {
	await page.goto('/docs/components/alert?style=aquamarine');
	await page.waitForSelector('html[data-lily-style]');
	await expect(page.locator('html')).toHaveAttribute('data-lily-style', 'aquamarine');
	const preview = page.locator('[data-preview="alert-demo"][data-style="aquamarine"]');
	await expect(preview.locator('iframe')).toHaveCount(0);
	await expect(preview).toHaveCSS('border-radius', '24px');
	const search = page.getByRole('button', { name: 'Search documentation', exact: true });
	await expect(search).toHaveCSS('min-height', '38px');
	await search.click();
	const dialog = page.getByRole('dialog');
	const input = dialog.getByRole('combobox', { name: 'Search documentation pages' });
	await expect(input).toBeFocused();
	await input.fill('button');
	await expect(dialog.getByRole('option').first()).toBeVisible();
	await input.press('ArrowDown');
	await expect(dialog.getByRole('option', { selected: true })).toBeVisible();
	await input.press('Enter');
	await expect(dialog).not.toBeVisible();
	await expect(page).toHaveURL(/button/);
	await page.getByRole('button', { name: 'Design style', exact: true }).click();
	await page.getByRole('option', { name: 'Diamond', exact: true }).click();
	await expect(page.locator('html')).toHaveAttribute('data-lily-style', 'diamond');
	await expect(search).toHaveCSS('height', '36px');
	await page.getByRole('button', { name: 'Toggle theme' }).click();
	await expect(page.locator('html')).toHaveClass(/dark/);
});

test('mobile navigation uses the selected style and traps focus', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/?style=aquamarine');
	await page.waitForSelector('html[data-lily-style]');
	await expect(page.locator('html')).toHaveAttribute('data-lily-style', 'aquamarine');
	await page.getByRole('button', { name: 'Toggle menu' }).click();
	const menu = page.getByRole('dialog');
	await expect(menu.getByRole('heading', { name: 'Navigation' })).toBeVisible();
	await expect(menu.getByRole('link', { name: 'Docs', exact: true })).toHaveCSS(
		'min-height',
		'38px'
	);
	await page.keyboard.press('Escape');
	await expect(menu).not.toBeVisible();
	await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeFocused();
});

test('Aquamarine toolbar icons stay square and header controls share their geometry', async ({
	page
}) => {
	await page.goto('/charts/pie?style=aquamarine');
	await page.waitForSelector('html[data-lily-style]');
	await expect(page.locator('html')).toHaveAttribute('data-lily-style', 'aquamarine');
	const copy = page.getByRole('button', { name: 'Copy code', exact: true }).first();
	await expect(copy).toHaveCSS('width', '28px');
	await expect(copy).toHaveCSS('height', '28px');
	await copy.hover();
	await expect(copy).toHaveCSS('width', '28px');
	for (const name of ['Design style', 'Search documentation']) {
		const control = page.getByRole('button', { name, exact: true });
		await expect(control).toHaveCSS('height', '38px');
		await expect(control).toHaveCSS('border-radius', '10px');
	}
});

test('Aquamarine featured blocks do not add page scrollbars around desktop previews', async ({
	page
}) => {
	await page.setViewportSize({ width: 1440, height: 1000 });
	await page.goto('/blocks?style=aquamarine');
	await page.waitForSelector('html[data-lily-style]');
	await expect(page.locator('html')).toHaveAttribute('data-lily-style', 'aquamarine');
	const frames = page.locator('iframe:visible');
	await expect(frames).toHaveCount(3);
	for (const iframe of await frames.all()) {
		await expect(iframe).toHaveAttribute('src', /preview\/aquamarine\/.*layout=full/);
		await iframe.scrollIntoViewIfNeeded();
		const frame = await (await iframe.elementHandle())!.contentFrame();
		await expect(frame!.locator('[data-preview-style]')).toBeVisible();
		await expect
			.poll(() =>
				frame!.evaluate(() => ({
					x: document.documentElement.scrollWidth > innerWidth,
					y: document.documentElement.scrollHeight > innerHeight
				}))
			)
			.toEqual({ x: false, y: false });
	}
});

test('Aquamarine service composition retains control behavior and measured surfaces', async ({
	page
}) => {
	await page.goto('/preview/aquamarine/workshop-01?layout=full');
	await page.waitForSelector('html[data-lily-style]');
	await page.waitForSelector('[data-preview-ready=true]');
	const flow = page.locator('[data-service-flow]');
	await expect(flow).toBeVisible();
	await expect(flow.locator('[data-slot=action-footer]')).toHaveCSS(
		'background-color',
		'rgba(0, 0, 0, 0)'
	);
	await expect(flow.getByRole('button', { name: 'Book a class', exact: true })).toHaveCSS(
		'height',
		'56px'
	);
	const receive = flow.getByRole('button', { name: 'View booking', exact: true });
	await expect(receive).toHaveCSS('height', '32px');
	await receive.click();
	await expect(flow.getByRole('heading', { name: 'Booking details opened' })).toBeVisible();
	await expect(flow.getByRole('button', { name: 'Opened', exact: true })).toBeDisabled();
	const search = flow.getByRole('searchbox', { name: 'Search classes' });
	await expect(flow.locator('[data-slot=search-field]')).toHaveCSS('height', '44px');
	await expect(flow.locator('[data-slot=search-field]')).toHaveCSS(
		'background-color',
		'rgba(2, 32, 71, 0.05)'
	);
	await expect(flow.locator('[data-slot=grid-list-item]').first()).toHaveCSS(
		'background-color',
		'rgba(0, 23, 51, 0.02)'
	);
	await search.fill('Pottery');
	await expect(flow.locator('[data-slot=grid-list-item]')).toHaveCount(1);
	await flow.getByRole('button', { name: 'Clear search' }).click();
	await expect(search).toHaveValue('');
	await expect(search).toBeFocused();
	await expect(flow.locator('[data-slot=grid-list-item]')).toHaveCount(4);
	const quantity = flow.getByRole('spinbutton', { name: 'Participants' });
	await expect(flow.locator('[data-slot=number-field]')).toHaveCSS('height', '38.5px');
	await expect(flow.getByRole('button', { name: 'Decrement' })).toBeDisabled();
	await flow.getByRole('button', { name: 'Increment' }).click();
	await expect(quantity).toHaveValue('2');
	const checkbox = flow.getByRole('checkbox', { name: 'Send me new class updates' });
	await checkbox.focus();
	await checkbox.press('Space');
	await expect(checkbox).toBeChecked();
	await expect(checkbox).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
	await page.setViewportSize({ width: 390, height: 844 });
	await expect
		.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
		.toBe(true);
});

test('Diamond preserves the original navigation and chart toolbar presentation', async ({
	page
}) => {
	await page.goto('/charts/pie?style=diamond');
	await page.waitForSelector('html[data-lily-style]');
	const navigation = page.locator('header nav').getByRole('link', { name: 'Docs', exact: true });
	await expect(navigation).toHaveCSS('height', '32px');
	await expect(navigation).toHaveCSS('border-radius', '12px');
	await navigation.hover();
	await expect(navigation).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
	const code = page.getByRole('button', { name: 'View Code', exact: true }).first();
	await expect(code).toHaveCSS('height', '28px');
	await expect(code).toHaveCSS('border-radius', '8px');
	await expect(code).toHaveCSS('padding-left', '10px');
	const copy = page.getByRole('button', { name: 'Copy code', exact: true }).first();
	await expect(copy).toHaveCSS('width', '28px');
	await expect(copy).toHaveCSS('border-radius', '8px');
	await expect(page.getByRole('button', { name: 'Search documentation', exact: true })).toHaveCSS(
		'height',
		'36px'
	);
	await page.getByRole('button', { name: 'Design style', exact: true }).click();
	await page.getByRole('option', { name: 'Aquamarine', exact: true }).click();
	await page.getByRole('button', { name: 'Design style', exact: true }).click();
	await page.getByRole('option', { name: 'Diamond', exact: true }).click();
	await navigation.hover();
	await expect(navigation).toHaveCSS('height', '32px');
	await expect(navigation).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
	await expect(code).toHaveCSS('height', '28px');
});

for (const style of ['diamond', 'aquamarine']) {
	test(`${style} example screens are distinct and use their own spacing`, async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 1000 });
		await page.goto(`/docs/components/action-footer?style=${style}`);
		await page.waitForSelector('html[data-lily-style]');
		const screen = page.getByRole('region', { name: 'Single bottom action' });
		await expect(screen).toHaveCSS('min-height', style === 'diamond' ? '280px' : '360px');
		await expect(screen.locator('[data-slot=top]')).toHaveCSS(
			'padding-left',
			style === 'diamond' ? '16px' : '24px'
		);
		for (const dark of [false, true]) {
			await page.evaluate((dark) => document.documentElement.classList.toggle('dark', dark), dark);
			await expect
				.poll(() =>
					screen.evaluate(
						(el) =>
							getComputedStyle(el).backgroundColor !==
							getComputedStyle(el.parentElement!).backgroundColor
					)
				)
				.toBe(true);
		}
		await expect(page.getByRole('link', { name: 'Design Styles', exact: true })).toHaveCount(0);
		for (const preview of await page.locator('[data-preview]').all())
			await expect(preview).not.toContainText(/[가-힣]/);
		await page.goto(`/docs/components/top?style=${style}`);
		await page.waitForSelector('html[data-lily-style]');
		await expect(page.locator('[data-preview] [data-slot=top]')).toHaveCSS(
			'padding-left',
			style === 'diamond' ? '16px' : '24px'
		);
		for (const preview of await page.locator('[data-preview]').all())
			await expect(preview).not.toContainText(/[가-힣]/);
	});
}

test('independent upload and footer examples have separate previews', async ({ page }) => {
	await page.goto('/docs/components/file-drop-zone?style=aquamarine');
	await page.waitForSelector('html[data-lily-style]');
	await expect(page.locator('[data-preview]')).toHaveCount(2);
	await expect(page.locator('[data-preview=file-drop-zone-demo]')).not.toContainText(
		'Choose image'
	);
	await expect(page.locator('[data-preview=file-drop-zone-trigger-demo]')).toContainText(
		'Choose image'
	);
	await page.goto('/docs/components/action-footer?style=diamond');
	await page.waitForSelector('html[data-lily-style]');
	await expect(page.locator('[data-preview]')).toHaveCount(2);
	for (const preview of await page.locator('[data-preview]').all()) {
		await expect(preview.locator('[data-slot=action-footer]')).toHaveCount(1);
	}
});
test('Aquamarine retains Lily animated link underlines', async ({ page }) => {
	await page.goto('/docs/components/link?style=aquamarine');
	await page.waitForSelector('html[data-lily-style]');
	const link = page.locator('[data-preview] a.link').first();
	await expect(link).toHaveCSS('background-size', '0% 1px');
	await link.hover();
	await expect(link).toHaveCSS('background-size', '100% 1px');
});

for (const style of ['diamond', 'aquamarine']) {
	test(`${style} upload trigger uses Button styling and keyboard file selection`, async ({
		page
	}) => {
		await page.goto(`/docs/components/file-drop-zone?style=${style}`);
		await page.waitForSelector('html[data-lily-style]');
		const preview = page.locator('[data-preview=file-drop-zone-trigger-demo]');
		const button = preview.getByRole('button', { name: 'Choose image' });
		await expect(button).toHaveCSS('height', style === 'diamond' ? '40px' : '38px');
		await expect(button).toHaveCSS('border-radius', style === 'diamond' ? '24px' : '10px');
		const background = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
		await button.hover();
		if (style === 'diamond')
			await expect
				.poll(() => button.evaluate((el) => getComputedStyle(el).backgroundColor))
				.not.toBe(background);
		else await expect(button).toHaveCSS('filter', 'brightness(0.95)');
		await button.focus();
		const chooser = page.waitForEvent('filechooser');
		await button.press('Enter');
		await (
			await chooser
		).setFiles({ name: 'sample.png', mimeType: 'image/png', buffer: Buffer.from('sample') });
		await expect(preview).toContainText('sample.png');
		const input = preview.locator('input[type=file]');
		await input.setInputFiles({
			name: 'invalid.txt',
			mimeType: 'text/plain',
			buffer: Buffer.from('invalid')
		});
		await expect(preview).toContainText('sample.png');
		await expect(preview).not.toContainText('invalid.txt');
	});
}

test('Diamond mobile navigation keeps full width and left alignment', async ({ page }) => {
	await page.setViewportSize({ width: 600, height: 900 });
	await page.goto('/docs/components/action-footer?style=diamond');
	await page.waitForSelector('html[data-lily-style]');
	const toggle = page.getByRole('button', { name: 'Toggle menu' });
	await toggle.click();
	const panel = page.locator('[data-slot=sheet-content]');
	await expect(panel).toBeVisible();
	await expect(panel).toHaveCSS('width', '600px');
	const home = panel.getByRole('link', { name: 'Home', exact: true });
	await expect.poll(async () => (await home.boundingBox())!.x).toBe(20);
	await expect.poll(async () => (await home.boundingBox())!.width).toBe(560);
	await toggle.click();
	await expect(panel).not.toBeVisible();
});
