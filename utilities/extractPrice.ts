import { Locator } from '@playwright/test';

/**
 * Extracts the numeric price from an inventory item.
 */
export async function getItemPrice(item: Locator): Promise<number> {
  const priceText = await item.locator('.inventory_item_price').textContent();
  return parseFloat(priceText?.replace('$', '') || '0');
}