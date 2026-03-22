/*
@test-suite Pricing Page Tests
*/

test('Pricing page loads with three tiers', async () => {
  await page.goto(`${baseUrl}/pricing`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'h1', 'Pricing page heading visible');
  
  const tiers = await page.$$('[data-price-gbp]');
  assert.equal(tiers.length, 3, 'Should have exactly 3 pricing tiers');
});

test('Static tier details', async () => {
  await page.goto(`${baseUrl}/pricing`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'text=Static Website', 'Static tier name visible');
  await assert.visible(page, 'text=149', 'Static tier price visible');
});

test('CMS tier marked as popular', async () => {
  await page.goto(`${baseUrl}/pricing`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'text=CMS', 'CMS tier visible');
  
  const popularBadge = await page.$('text=Popular');
  assert.ok(popularBadge, 'Popular badge should exist on CMS tier');
});

test('E-commerce tier details', async () => {
  await page.goto(`${baseUrl}/pricing`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'text=E-Commerce', 'E-commerce tier visible');
  await assert.visible(page, 'text=399', 'E-commerce price visible');
});

test('Feature lists display correctly', async () => {
  await page.goto(`${baseUrl}/pricing`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'text=Mobile responsive', 'Feature visible');
  await assert.visible(page, 'text=Contact form', 'Feature visible');
});

test('CTA buttons on each tier', async () => {
  await page.goto(`${baseUrl}/pricing`);
  await page.waitForLoadState('networkidle');
  
  const ctaButtons = await page.$$('a[href="/contact"]');
  assert.ok(ctaButtons.length >= 3, 'Each tier should have a CTA');
});
