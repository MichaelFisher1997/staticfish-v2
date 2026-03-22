/*
@test-suite Homepage Tests
*/

test('Hero section loads and displays correctly', async () => {
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'h1', 'Hero heading should be visible');
  await assert.text(page, 'h1', 'Websites That', 'Hero heading text');
  await assert.visible(page, 'a[href="/contact"]', 'CTA button should be visible');
});

test('Floating cards animate and display', async () => {
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, '.glass', 'Floating glass cards should be visible');
  
  const cards = await page.$$('.glass');
  assert.ok(cards.length >= 3, 'Should have at least 3 floating cards');
});

test('Navigation links work from homepage', async () => {
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'header', 'Header should be visible');
  await assert.visible(page, 'a[href="/portfolio"]', 'Portfolio link should be visible');
  await assert.visible(page, 'a[href="/pricing"]', 'Pricing link should be visible');
  await assert.visible(page, 'a[href="/contact"]', 'Contact link should be visible');
});

test('Services section displays three tiers', async () => {
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  await page.locator('text=Three Simple Options').scrollIntoViewIfNeeded();
  
  const serviceCards = await page.$$('[data-price-gbp]');
  assert.equal(serviceCards.length, 3, 'Should display 3 service tiers');
  
  await assert.visible(page, 'text=£149', 'Static tier price visible');
  await assert.visible(page, 'text=£249', 'CMS tier price visible');
  await assert.visible(page, 'text=£399', 'E-commerce tier price visible');
});

test('Featured project section renders', async () => {
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  await page.locator('text=Recent Projects').scrollIntoViewIfNeeded();
  
  await assert.visible(page, 'text=Redot Engine', 'Featured project title visible');
  await assert.visible(page, 'a[href*="redotengine.org"]', 'External project link exists');
});

test('CTA section at bottom', async () => {
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  await page.locator('text=Let\'s Build What').scrollIntoViewIfNeeded();
  
  await assert.visible(page, 'text=Get a Quote', 'Final CTA button visible');
});

test('No console errors on homepage', async () => {
  const errors: string[] = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  const filtered = errors.filter(e => 
    !e.includes('favicon') && 
    !e.includes('chrome-extension') &&
    !e.includes('net::ERR')
  );
  
  assert.equal(filtered.length, 0, `Console errors found: ${filtered.join(', ')}`);
});
