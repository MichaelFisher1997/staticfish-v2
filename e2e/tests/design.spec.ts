/*
@test-suite Design Regression Tests
*/

test('Homepage stays readable when scripts fail to load', async () => {
  await page.route('**/*', route => {
    if (route.request().resourceType() === 'script') return route.abort();
    return route.continue();
  });
  await page.goto(baseUrl);
  const opacity = await page.locator('[data-hero-line]').first().evaluate(el => getComputedStyle(el).opacity);
  assert.equal(opacity, '1', 'Hero text must remain visible without animation scripts');
  const workOpacity = await page.locator('[data-reveal]').first().evaluate(el => getComputedStyle(el).opacity);
  assert.equal(workOpacity, '1', 'Content must remain visible without animation scripts');
});

test('Desktop portfolio previews occupy a readable width', async () => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseUrl}/portfolio`);
  const images = await page.locator('main article img').all();
  assert.ok(images.length >= 2, 'Project previews should exist');
  for (const image of images) {
    const bounds = await image.boundingBox();
    assert.ok(bounds && bounds.width > 400, 'Desktop project previews must not collapse to one grid column');
  }
});

test('Editing add-on links to its pricing section', async () => {
  await page.goto(`${baseUrl}/pricing#add-ons`);
  await assert.visible(page, '#add-ons', 'The add-on anchor must exist');
  await assert.text(page, '#add-ons', 'Add editing', 'Anchor must identify the editing section');
});

test('Hero fish scrolls away with the introduction', async () => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl);
  await page.locator('[data-hero] canvas').waitFor();
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, document.querySelector('[data-hero]').getBoundingClientRect().bottom + window.scrollY + 100);
  });
  const bounds = await page.locator('[data-hero] canvas').boundingBox();
  assert.ok(bounds && bounds.y + bounds.height < 0, 'Fish must not remain fixed over later sections');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  assert.equal(overflow, false, 'Mobile homepage must not overflow horizontally');
});
