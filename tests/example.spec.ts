import { test, expect } from '@playwright/test';

test('has added todo', async ({ page }) => {
  await page.goto('https://martin-markov1980.github.io/Shopping-List-App/');

  // Click the button by its ID
  await page.click('#add-task');

  // Ensure the modal is visible
  await page.waitForSelector('#add-item-modal', { state: 'visible' });

  await page.fill('#add-item-modal input#task-name', 'Apple');

  await page.fill('#add-item-modal input#task-quantity', '3');
  // await page.keyboard.press('Tab');

  await page.click('#add-item-modal button#add-task-btn-modal');

  const tableLocator = page.locator('table');
  await expect(tableLocator).toHaveText(/Apple/);

  // // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Shopping List/);
});

// test('has title', async ({ page }) => {
//   await page.goto('https://martin-markov1980.github.io/Shopping-List-App/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Shopping List/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installationn' })).toBeVisible();
// });
