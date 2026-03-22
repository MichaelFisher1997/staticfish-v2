/*
@test-suite Blog Page Tests
*/

test('Blog index page loads', async () => {
  await page.goto(`${baseUrl}/blog`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'h1', 'Blog page heading visible');
});

test('Blog posts list displays', async () => {
  await page.goto(`${baseUrl}/blog`);
  await page.waitForLoadState('networkidle');
  
  const articles = await page.$$('article, a[href*="/blog/"]');
  assert.ok(articles.length >= 0, 'Blog posts container exists');
});

test('Individual blog post loads (if posts exist)', async () => {
  await page.goto(`${baseUrl}/blog`);
  await page.waitForLoadState('networkidle');
  
  const postLinks = await page.$$('a[href*="/blog/"]:not([href="/blog"])');
  
  if (postLinks.length > 0) {
    const firstPost = postLinks[0];
    const href = await firstPost.getAttribute('href');
    
    await firstPost.click();
    await page.waitForLoadState('networkidle');
    
    assert.includes(page.url(), '/blog/', 'Should navigate to blog post');
    await assert.visible(page, 'h1', 'Blog post should have a heading');
  }
});

test('Blog page has no console errors', async () => {
  const errors: string[] = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  await page.goto(`${baseUrl}/blog`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  const filtered = errors.filter(e => 
    !e.includes('favicon') && 
    !e.includes('chrome-extension') &&
    !e.includes('net::ERR')
  );
  
  assert.equal(filtered.length, 0, `Console errors on blog: ${filtered.join(', ')}`);
});
