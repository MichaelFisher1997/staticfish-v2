/*
@test-suite Contact Page Tests
*/

test('Contact page loads', async () => {
  await page.goto(`${baseUrl}/contact`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'h1', 'Contact page heading visible');
});

test('Contact form elements present', async () => {
  await page.goto(`${baseUrl}/contact`);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'input[name="name"], input#name', 'Name field visible');
  await assert.visible(page, 'input[name="email"], input#email', 'Email field visible');
  await assert.visible(page, 'textarea[name="message"], textarea#message', 'Message field visible');
  await assert.visible(page, 'button[type="submit"]', 'Submit button visible');
});

test('Form validation - required fields', async () => {
  await page.goto(`${baseUrl}/contact`);
  await page.waitForLoadState('networkidle');
  
  const submitBtn = await page.$('button[type="submit"]');
  await submitBtn.click();
  await page.waitForTimeout(500);
  
  const nameInput = await page.$('input[name="name"], input#name');
  const isValid = await nameInput?.evaluate((el: HTMLInputElement) => el.checkValidity());
  
  assert.ok(!isValid, 'Form should not submit with empty required fields');
});

test('Form validation - email format', async () => {
  await page.goto(`${baseUrl}/contact`);
  await page.waitForLoadState('networkidle');
  
  const emailInput = await page.$('input[name="email"], input#email');
  await emailInput.fill('invalid-email');
  
  const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
  assert.ok(!isValid, 'Invalid email should fail validation');
});

test('Form accepts valid input', async () => {
  await page.goto(`${baseUrl}/contact`);
  await page.waitForLoadState('networkidle');
  
  const nameInput = await page.$('input[name="name"], input#name');
  const emailInput = await page.$('input[name="email"], input#email');
  const messageInput = await page.$('textarea[name="message"], textarea#message');
  
  await nameInput.fill('Test User');
  await emailInput.fill('test@example.com');
  await messageInput.fill('This is a test message for E2E testing.');
  
  const nameValue = await nameInput.evaluate((el: HTMLInputElement) => el.value);
  const emailValue = await emailInput.evaluate((el: HTMLInputElement) => el.value);
  
  assert.equal(nameValue, 'Test User', 'Name input should accept value');
  assert.equal(emailValue, 'test@example.com', 'Email input should accept value');
});
