// tests/sauceTest.spec.ts
import { test } from '../fixtures/fixtureLogin.ts';
import { expect } from '@playwright/test';
import { addHighestPricedItemToCart } from '../utilities/inventoryUtils.ts';
import { getBasketItems } from '../utilities/basketUtils.ts'; 

test.describe.configure({ mode: 'serial' });

test.describe('Inventory Tests', () => {
  test('should land on inventory page after login', async ({ loggedInPage }) => {
    await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('adds highest priced item and verifies basket contents', async ({ loggedInPage }) => {
    await addHighestPricedItemToCart(loggedInPage);

    const basketItems = await getBasketItems(loggedInPage); 
    expect(basketItems.length).toBe(1);
    expect(basketItems[0]).toMatch(/.+/);
  });
});