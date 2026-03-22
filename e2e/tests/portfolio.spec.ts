/*
@test-suite Portfolio Page Tests
*/

test('Portfolio page loads', async () => {
  await page.goto(`${baseUrl}/portfolio`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'h1', 'Portfolio page heading visible');
});

test('Portfolio items display', async () => {
  await page.goto(`${baseUrl}/portfolio`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'text=Redot Engine', 'Portfolio item visible');
});

test('External links open correctly', async () => {
  await page.goto(`${baseUrl}/portfolio`);
  await page.waitForLoadState('networkidle');
  
  const externalLink = await page.$('a[href*="redotengine.org"]');
  assert.ok(externalLink, 'External portfolio link should exist');
  
  const target = await externalLink.getAttribute('target');
  assert.equal(target, '_blank', 'External links should open in new tab');
});

test('Portfolio images load', async () => {
  await page.goto(`${baseUrl}/portfolio`);
  await page.waitForLoadState('networkidle');
  
  const images = await page.$$('img[src*="portfolio"]');
  assert.ok(images.length > 0, 'Portfolio images should be present');
  
  for (const img of images) {
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    assert.ok(naturalWidth > 0, 'Portfolio image should load successfully');
  }
});
