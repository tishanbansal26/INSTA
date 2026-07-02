import { test, expect } from '@playwright/test';

test('has title and dashboard header', async ({ page }) => {
  // Assuming the app runs on localhost:5173
  await page.goto('http://localhost:5173/');

  // Check the document title
  await expect(page).toHaveTitle(/Vite \+ React/); // Vite default unless changed

  // Expect a dashboard heading to be visible
  const heading = page.getByRole('heading', { name: 'Dashboard' });
  await expect(heading).toBeVisible();
});
