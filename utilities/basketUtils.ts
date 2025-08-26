// utilities/basketUtils.ts
import { Page } from '@playwright/test';

export async function getBasketItems(page: Page): Promise<string[]> {
  await page.click('[data-test="shopping-cart-link"]');
  await page.waitForURL('**/cart.html');
  return await page.locator('.cart_item .inventory_item_name').allTextContents();
}