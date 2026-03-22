/*
@test-suite Responsive Design Tests
*/

test('Mobile viewport - no horizontal scroll', async () => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  
  assert.ok(scrollWidth <= clientWidth + 15, 'No horizontal scroll on mobile');
});

test('Tablet viewport - no horizontal scroll', async () => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  
  assert.ok(scrollWidth <= clientWidth + 15, 'No horizontal scroll on tablet');
});

test('Desktop viewport - no horizontal scroll', async () => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  
  assert.ok(scrollWidth <= clientWidth + 15, 'No horizontal scroll on desktop');
});

test('Mobile - header elements visible', async () => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'header', 'Header visible on mobile');
});

test('Mobile - footer visible', async () => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  await page.locator('footer').scrollIntoViewIfNeeded();
  await assert.visible(page, 'footer', 'Footer visible on mobile');
});

test('Desktop - service cards in grid', async () => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  await page.locator('text=Three Simple Options').scrollIntoViewIfNeeded();
  
  const cards = await page.$$('[data-price-gbp]');
  assert.ok(cards.length === 3, 'Three service cards visible on desktop');
});

test('Mobile - hero text readable', async () => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  const h1 = await page.$('h1');
  const fontSize = await h1.evaluate((el) => 
    window.getComputedStyle(el).fontSize
  );
  
  const size = parseFloat(fontSize);
  assert.ok(size >= 24, `Hero text should be readable on mobile (got ${size}px)`);
});

test('All pages responsive at 375px', async () => {
  const pages = ['/about', '/services', '/pricing', '/contact', '/blog'];
  
  await page.setViewportSize({ width: 375, height: 667 });
  
  for (const path of pages) {
    await page.goto(`${baseUrl}${path}`);
    await page.waitForLoadState('networkidle');
    
    await assert.visible(page, 'h1', `${path} should have heading on mobile`);
  }
});
