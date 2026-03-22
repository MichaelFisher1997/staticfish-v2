# E2E Browser Tests

Browser-based end-to-end tests using Kernel's cloud browser infrastructure with Playwright.

## Prerequisites

- [Kernel API Key](https://dashboard.onkernel.com/api-keys)
- Bun runtime

## Setup

1. Set your Kernel API key:
   ```bash
   export KERNEL_API_KEY="your-api-key"
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

## Running Tests

### Against local dev server
```bash
bun run dev &
bun test:e2e:local
```

### Against any URL
```bash
TEST_URL=https://your-preview-site.com bun test:e2e
```

### Debug mode (with live view)
```bash
DEBUG=true bun test:e2e:local
```

## Test Structure

```
e2e/
├── run-tests.ts           # Main test runner
├── utils/
│   └── kernel-browser.ts  # Kernel SDK wrapper
├── tests/
│   ├── homepage.spec.ts   # Homepage tests
│   ├── navigation.spec.ts # Navigation tests
│   ├── services.spec.ts   # Services page tests
│   ├── pricing.spec.ts    # Pricing page tests
│   ├── portfolio.spec.ts  # Portfolio page tests
│   ├── contact.spec.ts    # Contact form tests
│   ├── blog.spec.ts       # Blog page tests
│   ├── legal.spec.ts      # Privacy/Terms tests
│   └── responsive.spec.ts # Responsive design tests
└── test-results/
    └── failures/          # Video recordings of failed tests
```

## Writing Tests

Each test file uses a custom DSL that gets executed in Kernel's browser:

```typescript
/*
@test-suite My Test Suite
*/

test('My test name', async () => {
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  await assert.visible(page, 'h1', 'Heading should be visible');
  await assert.text(page, 'h1', 'Expected Text', 'Heading text');
});
```

### Available Assertions

- `assert.ok(value, message)` - Truthy assertion
- `assert.equal(a, b, message)` - Equality check
- `assert.includes(str, substr, message)` - String contains
- `assert.visible(page, selector, message)` - Element visible
- `assert.text(page, selector, expected, message)` - Text content check

## CI/CD

Tests run automatically on PRs to main via `.github/workflows/e2e.yml`.

Failed test videos are uploaded as artifacts for debugging.

## Costs

Tests use Kernel's cloud browsers. Estimated cost per PR:
- ~5-10 browser minutes
- Video recordings included

See [Kernel pricing](https://onkernel.com/#pricing) for details.
