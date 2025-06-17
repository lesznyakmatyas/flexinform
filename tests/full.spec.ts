import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await expect(
    page.getByRole('heading', { name: 'Admin Dashboard - Wheely Good' })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'View Clients' })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Clients' })).toBeVisible();
  await page.getByRole('link', { name: 'Clients' }).click();
  await expect(
    page.getByRole('textbox', { name: 'Client Name' })
  ).toBeVisible();
  await expect(
    page.getByRole('textbox', { name: 'Client Document ID' })
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
  await expect(page.locator('tbody')).toContainText('Luke Reid');
  await expect(page.locator('tbody')).toContainText('56450');
  await expect(page.locator('tbody')).toContainText('584977564');
  await page.getByRole('button', { name: 'Luke Reid' }).click();
  await expect(page.locator('app-client-cars')).toContainText(
    '2016-08-08 08:50:19'
  );
  await expect(page.locator('app-client-cars')).toContainText(
    'kotelezo_szerviz'
  );
  await expect(page.locator('app-client-cars')).toContainText(
    '2016-08-12 14:34:34'
  );
  await page.getByRole('button', { name: '1' }).click();
  await expect(page.locator('app-car-services')).toContainText('regisztralt');
  await expect(page.locator('app-car-services')).toContainText(
    'kotelezo_szerviz'
  );
  await page.getByRole('button', { name: 'Megan Forsyth' }).click();
  await expect(page.getByRole('paragraph')).toContainText('No Cars yet.');
  await page.getByRole('button', { name: 'Cameron Edmunds' }).click();
  await page.getByRole('button', { name: '1' }).click();
  await expect(page.getByText('No services yet.')).toBeVisible();
  await page.getByRole('textbox', { name: 'Client Name' }).click();
  await page.getByRole('textbox', { name: 'Client Name' }).fill('a');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.locator('form')).toContainText(
    'Multiple clients found. Please refine your search.'
  );
  await page.getByRole('textbox', { name: 'Client Name' }).click();
  await page.getByRole('textbox', { name: 'Client Name' }).fill('Luke');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(
    page.getByRole('alert', { name: 'Something went wrong!' })
  ).toBeVisible();
  await page.getByRole('textbox', { name: 'Client Name' }).click();
  await page.getByRole('textbox', { name: 'Client Name' }).fill('Luke Reid');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('cell', { name: 'Luke Reid' })).toBeVisible();
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(
    page.getByRole('button', { name: 'Megan Forsyth' })
  ).toBeVisible();
});
