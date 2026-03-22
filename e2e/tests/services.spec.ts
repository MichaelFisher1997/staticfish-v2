/*
@test-suite Services Page Tests
*/

test('Services page loads', async () => {
  await page.goto(`${baseUrl}/services`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'h1', 'Services page should have a heading');
});

test('Service descriptions are present', async () => {
  await page.goto(`${baseUrl}/services`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'text=Static', 'Static website service mentioned');
  await assert.visible(page, 'text=CMS', 'CMS service mentioned');
  await assert.visible(page, 'text=E-Commerce', 'E-commerce service mentioned');
});

test('Pricing information displayed', async () => {
  await page.goto(`${baseUrl}/services`);
  await page.waitForLoadState('networkidle');
  
  const prices = await page.$$('[data-price-gbp], text=/£\\d+/');
  assert.ok(prices.length > 0, 'Pricing should be displayed on services page');
});

test('CTA links to contact page', async () => {
  await page.goto(`${baseUrl}/services`);
  await page.waitForLoadState('networkidle');
  
  const contactLinks = await page.$$('a[href="/contact"]');
  assert.ok(contactLinks.length > 0, 'Should have link to contact page');
});
