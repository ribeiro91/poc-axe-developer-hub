const { test, expect } = require('../../../fixture.js');
// import { test, expect } from '@playwright/test';
// import AxeBuilder from '@axe-core/playwright';

test('Button Test', async ({ page }, testInfo) => {
  await page.goto('/src/components/button/button.html');

  await page.waitForLoadState('networkidle');
  const locator = page.locator('.cmp-btn').first();
  await expect(locator).toBeVisible();

  // const accessibilityScanResults = await new AxeBuilder({ page })
  //   .include('.cmp-btn')
  //   .withTags(['wcag2a', 'wcag2aa'])
  //   .analyze();

  // await testInfo.attach('accessibility-scan-results', {
  //   body: JSON.stringify(accessibilityScanResults, null, 2),
  //   contentType: 'application/json',
  // });

  // expect(accessibilityScanResults.violations).toEqual([]);
});
