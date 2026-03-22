/*
@test-suite Legal Pages Tests
*/

test('Privacy page loads', async () => {
  await page.goto(`${baseUrl}/privacy`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'h1', 'Privacy page heading visible');
  await assert.text(page, 'h1', 'Privacy', 'Privacy heading text');
});

test('Terms page loads', async () => {
  await page.goto(`${baseUrl}/terms`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'h1', 'Terms page heading visible');
  await assert.text(page, 'h1', 'Terms', 'Terms heading text');
});

test('Privacy page has content', async () => {
  await page.goto(`${baseUrl}/privacy`);
  await page.waitForLoadState('networkidle');
  
  const content = await page.$('main, article, .prose');
  assert.ok(content, 'Privacy page should have content container');
});

test('Terms page has content', async () => {
  await page.goto(`${baseUrl}/terms`);
  await page.waitForLoadState('networkidle');
  
  const content = await page.$('main, article, .prose');
  assert.ok(content, 'Terms page should have content container');
});

test('Legal pages accessible from footer', async () => {
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  await page.locator('footer').scrollIntoViewIfNeeded();
  
  const privacyLink = await page.$('footer a[href="/privacy"]');
  const termsLink = await page.$('footer a[href="/terms"]');
  
  assert.ok(privacyLink, 'Privacy link in footer');
  assert.ok(termsLink, 'Terms link in footer');
});
