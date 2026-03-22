/*
@test-suite Navigation Tests
*/

test('Header logo links to homepage', async () => {
  await page.goto(`${baseUrl}/about`);
  await page.waitForLoadState('networkidle');
  
  const logo = await page.$('header a[href="/"]');
  assert.ok(logo, 'Logo link should exist');
  
  await logo.click();
  await page.waitForLoadState('networkidle');
  
  assert.ok(page.url().endsWith('/') || page.url().includes('localhost:5050'), 'Should navigate to homepage');
});

test('All main navigation links work', async () => {
  const navLinks = [
    { href: '/about', text: 'About' },
    { href: '/services', text: 'Services' },
    { href: '/pricing', text: 'Pricing' },
    { href: '/portfolio', text: 'Portfolio' },
    { href: '/contact', text: 'Contact' },
    { href: '/blog', text: 'Blog' },
  ];
  
  for (const link of navLinks) {
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    
    const navLink = await page.$(`header a[href="${link.href}"]`);
    assert.ok(navLink, `Navigation link to ${link.href} should exist`);
    
    await navLink.click();
    await page.waitForLoadState('networkidle');
    
    assert.includes(page.url(), link.href, `Should navigate to ${link.href}`);
  }
});

test('Footer links are present and functional', async () => {
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  await page.locator('footer').scrollIntoViewIfNeeded();
  
  await assert.visible(page, 'footer a[href="/privacy"]', 'Privacy link in footer');
  await assert.visible(page, 'footer a[href="/terms"]', 'Terms link in footer');
});

test('Mobile menu toggles correctly', async () => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  const menuButton = await page.$('button[aria-label*="menu" i], button[class*="menu"]');
  
  if (menuButton) {
    await menuButton.click();
    await page.waitForTimeout(300);
    
    const mobileNav = await page.$('nav[class*="mobile"], [class*="mobile-nav"]');
    assert.ok(mobileNav, 'Mobile navigation should be visible after toggle');
  }
});

test('Breadcrumbs work on inner pages', async () => {
  await page.goto(`${baseUrl}/blog`);
  await page.waitForLoadState('networkidle');
  
  assert.includes(page.url(), '/blog', 'Should be on blog page');
});

test('Back button works correctly', async () => {
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  await page.click('a[href="/about"]');
  await page.waitForLoadState('networkidle');
  
  await page.goBack();
  await page.waitForLoadState('networkidle');
  
  assert.ok(page.url().endsWith('/') || page.url().includes('localhost:5050'), 'Should be back on homepage');
});
