import { test, expect } from '@playwright/test';

const consoleErrors: string[] = [];

test.beforeEach(async ({ page, context }) => {
  consoleErrors.length = 0;
  await context.clearPermissions();
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
});

test('1. Fresh browser redirects / to /seat', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/seat/);
});

test('2–4. Create seat, verify badge, persist across reload', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/seat/);

  // Click + NEW SEAT
  await page.getByText('+ NEW SEAT').click();

  // Fill name
  await page.getByPlaceholder('e.g. Front Desk').fill('Test Bay');

  // Pick red color (#ff4444)
  await page.locator('button[style*="background-color: rgb(255, 68, 68)"]').click();

  // Submit
  await page.getByText('CREATE SEAT').click();

  // Should navigate to /
  await expect(page).toHaveURL('/');

  // Verify badge shows TEST BAY
  const badge = page.getByText('TEST BAY');
  await expect(badge).toBeVisible();

  // Verify dot color is red
  const dot = badge.locator('..').locator('span.rounded-full');
  await expect(dot).toHaveCSS('background-color', 'rgb(255, 68, 68)');

  // Reload and verify persistence
  await page.reload();
  await expect(page).toHaveURL('/');
  await expect(page.getByText('TEST BAY')).toBeVisible();
});

test('5. Zero console errors during the whole run', async () => {
  expect(consoleErrors).toEqual([]);
});
