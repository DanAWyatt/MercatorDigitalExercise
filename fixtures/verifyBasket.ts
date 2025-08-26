// fixtures/verifyBasket.ts
import { test as base } from '@playwright/test';
import { getBasketItems } from '../utilities/basketUtils';

export const test = base.extend<{
  loggedInPage: import('@playwright/test').Page;
  getBasketItems: () => Promise<string[]>;
}>({
  loggedInPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'storageState.json' });
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/inventory.html');
    await use(page);
    await context.close();
  },

  getBasketItems: async ({ loggedInPage }, use) => {
    const fetchBasketItems = () => getBasketItems(loggedInPage);
    await use(fetchBasketItems);
  },
});