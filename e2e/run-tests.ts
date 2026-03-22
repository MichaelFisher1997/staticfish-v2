import 'dotenv/config';
import { join } from 'path';
import { Glob } from 'bun';
import { KernelTestRunner, generateTestCode, type TestResult } from './utils/kernel-browser';

const baseUrl = process.env.TEST_URL || process.env.BASE_URL || 'http://localhost:5050';

interface TestFile {
  name: string;
  path: string;
  tests: TestCase[];
}

interface TestCase {
  name: string;
  code: string;
}

function parseTestFile(content: string): { name: string; tests: TestCase[] } {
  const nameMatch = content.match(/\/\*\s*@test-suite\s+(.+?)\s*\*\//);
  const name = nameMatch ? nameMatch[1] : 'Unnamed Suite';

  const tests: TestCase[] = [];
  const testRegex = /test\s*\(\s*['"`](.+?)['"`]\s*,\s*async\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*\);/g;

  let match;
  while ((match = testRegex.exec(content)) !== null) {
    const testName = match[1];
    const testCode = match[2];
    tests.push({ name: testName, code: testCode });
  }

  return { name, tests };
}

function wrapTestCode(testCode: string, baseUrl: string): string {
  return `
const assert = {
  ok: (value, message) => {
    if (!value) throw new Error(message || 'Assertion failed: value is falsy');
  },
  equal: (a, b, message) => {
    if (a !== b) throw new Error(message || \`Assertion failed: \${a} !== \${b}\`);
  },
  includes: (str, substr, message) => {
    if (!str.includes(substr)) throw new Error(message || \`Assertion failed: "\${str}" does not include "\${substr}"\`);
  },
  visible: async (page, selector, message) => {
    const el = await page.$(selector);
    if (!el) throw new Error(message || \`Element not found: \${selector}\`);
    const visible = await el.isVisible();
    if (!visible) throw new Error(message || \`Element not visible: \${selector}\`);
  },
  text: async (page, selector, expected, message) => {
    const el = await page.$(selector);
    if (!el) throw new Error(message || \`Element not found: \${selector}\`);
    const text = await el.textContent();
    if (!text?.includes(expected)) throw new Error(message || \`Text assertion failed: expected "\${expected}" in "\${text}"\`);
  }
};

async function runTest(page, baseUrl) {
  ${testCode}
}
  `;
}

async function main() {
  console.log('\n🐟 Staticfish E2E Tests\n');
  console.log(`Testing against: ${baseUrl}\n`);

  const runner = new KernelTestRunner(process.env.KERNEL_API_KEY);

  const glob = new Glob('*.spec.ts');
  const testsDir = join(import.meta.dir, 'tests');
  const testFiles: TestFile[] = [];

  for await (const file of glob.scan(testsDir)) {
    const filepath = join(testsDir, file);
    const content = await Bun.file(filepath).text();
    const { name, tests } = parseTestFile(content);
    testFiles.push({ name, path: file, tests });
  }

  if (testFiles.length === 0) {
    console.log('No test files found in e2e/tests/');
    process.exit(0);
  }

  const allResults: TestResult[] = [];
  let passed = 0;
  let failed = 0;

  for (const testFile of testFiles) {
    console.log(`\n📁 ${testFile.name}`);

    for (const test of testFile.tests) {
      process.stdout.write(`  ✓ ${test.name} ... `);

      const fullCode = wrapTestCode(test.code, baseUrl);
      const result = await runner.runTestWithRecording(test.name, fullCode, {
        headless: process.env.DEBUG !== 'true',
        timeoutSec: 60,
      });

      allResults.push(result);

      if (result.passed) {
        console.log(`\x1b[32mpassed\x1b[0m (${result.duration}ms)`);
        passed++;
      } else {
        console.log(`\x1b[31mfailed\x1b[0m (${result.duration}ms)`);
        console.log(`    \x1b[31m${result.error}\x1b[0m`);
        failed++;
      }
    }
  }

  console.log('\n' + '─'.repeat(50));
  console.log(`\nResults: \x1b[32m${passed} passed\x1b[0m, \x1b[31m${failed} failed\x1b[0m\n`);

  if (failed > 0) {
    console.log('📹 Failure videos saved to: e2e/test-results/failures/\n');
    process.exit(1);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
