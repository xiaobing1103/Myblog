import {test, expect} from '@playwright/test';
import fs from 'node:fs';

const routes = JSON.parse(fs.readFileSync('reports/previous-routes.json', 'utf8'));
for (const route of routes) {
  test(`原有页面可访问且无水合错误：${route}`, async ({page}) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => {if (m.type() === 'error' && /React|hydration|RecoverableError/.test(m.text())) errors.push(m.text().slice(0, 200));});
    const response = await page.goto(route);
    expect(response.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true', {timeout: 10000});
    await page.waitForTimeout(150);
    expect(errors).toEqual([]);
  });
}

test('首页布局、移动端、深色模式', async ({page}) => {
  await page.setViewportSize({width: 1440, height: 1000});
  await page.goto('/Myblog/');
  await expect(page.locator('.post-card')).toHaveCount(9);
  await page.screenshot({path: 'reports/home-desktop.png', fullPage: true});
  await page.setViewportSize({width: 390, height: 844});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({path: 'reports/home-mobile.png', fullPage: true});
  await page.evaluate(() => localStorage.setItem('theme', 'dark'));
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.screenshot({path: 'reports/home-dark.png', fullPage: true});
});

test('交互示例按需加载', async ({page}) => {
  await page.goto('/Myblog/docs/videos/react/02-gradient-bg-react-state-event/');
  await expect(page.locator('iframe')).toHaveCount(0);
  await page.getByLabel('角度', {exact: false}).fill('90');
  await expect(page.locator('pre')).toContainText('90deg');
  await page.goto('/Myblog/learn-react-props-buttons/');
  await page.getByRole('button', {name: '打开实时编辑器'}).click();
  const editor = page.locator('[contenteditable]');
  await expect(editor).toBeVisible();
  await editor.click();
  await editor.press('ControlOrMeta+A');
  await editor.pressSequentially('() => <button>Live demo</button>');
  await expect(page.getByRole('button', {name: 'Live demo', exact: true})).toBeVisible();
});
