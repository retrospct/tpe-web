import { test, expect } from '@playwright/test';

test('should load homepage and show main heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await expect(page).toHaveTitle(/Two Perfect Events/);
});
