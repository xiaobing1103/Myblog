import {test, expect} from '@playwright/test';
import fs from 'node:fs';

test('PDF 页面切换、文件响应与缺失提示', async ({page, request}) => {
  test.setTimeout(60000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const route = n => `/Myblog/docs/resources/frontend-pdf/${String(n).padStart(2, '0')}frontend-pdf/`;
  await page.goto(route(1));
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  for (let n = 1; n <= 11; n++) {
    if (n === 9) continue;
    if (n > 1) {
      // 使用侧栏链接切换，验证实际的客户端分块加载。
      if (n === 2 || n === 10) {
        const label = n === 2 ? '已转为Markdown的面试资料' : '缺失文件说明';
        const category = page.locator('a.menu__link[role="button"]').filter({hasText: label}).first();
        if (await category.count() && await category.getAttribute('aria-expanded') === 'false') await category.click();
      }
      await page.locator(`a.menu__link[href="${route(n)}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${String(n).padStart(2, '0')}frontend-pdf/$`));
    }
    if ([1, 8].includes(n)) {
      const frame = page.locator('article iframe');
      const document = fs.readFileSync(`docs/resources/frontend-pdf/${String(n).padStart(2, '0')}frontend-pdf/index.md`, 'utf8');
      const expectedFile = '/Myblog/' + document.match(/<PdfReader src="([^"]+)"/)[1];
      await expect(frame).toHaveAttribute('src', new RegExp(encodeURIComponent(expectedFile).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      expect(await frame.getAttribute('title')).toBeTruthy();
      const viewer = await frame.getAttribute('src');
      expect(viewer).toContain('/Myblog/pdfjs/web/viewer.html?file=');
      const src = new URL(viewer, 'http://localhost').searchParams.get('file');
      await expect(page.getByRole('link', {name: '下载原文件'})).toHaveAttribute('href', src);
      const response = await request.get(src);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/pdf');
      expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
      const reader = page.frameLocator('article iframe');
      await expect(reader.locator('#viewer .page canvas').first()).toBeVisible({timeout: 20000});
      await expect(reader.locator('#numPages')).not.toHaveText('');
    } else if (n <= 7) {
      await expect(page.locator('article iframe')).toHaveCount(0);
      await expect(page.getByRole('link', {name: '校订题解', exact: true})).toBeVisible();
      await expect(page.getByRole('link', {name: '完整逐页原文', exact: true})).toBeVisible();
      const original = await page.getByRole('link', {name: '下载原文件', exact: true}).getAttribute('href');
      const response = await request.get(original);
      expect(response.status()).toBe(200);
      expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
    } else {
      await expect(page.locator('article iframe')).toHaveCount(0);
      await expect(page.locator('article')).toContainText('该 PDF 文件暂缺');
    }
  }
  await expect(page.locator(`a.menu__link[href="${route(9)}"]`)).toHaveCount(0);
  expect((await request.get(route(9))).status()).toBe(404);
  expect((await request.get('/Myblog/pdf/2022-2-17-fupobaoyang/找富婆包养的必胜法则.pdf')).status()).toBe(404);
  expect(errors).toEqual([]);
});

test('PDF 阅读器翻页、缩放、搜索及手机布局', async ({page}) => {
  await page.goto('/Myblog/docs/resources/frontend-pdf/01frontend-pdf/');
  const reader = page.frameLocator('article iframe');
  await expect(reader.locator('#viewer .page canvas').first()).toBeVisible({timeout: 20000});
  await reader.locator('#pageNumber').fill('2');
  await reader.locator('#pageNumber').press('Enter');
  await expect(reader.locator('#pageNumber')).toHaveValue('2');
  await reader.locator('#scaleSelect').selectOption('1.5');
  await expect(reader.locator('#scaleSelect')).toHaveValue('1.5');
  await reader.locator('#viewFindButton').click();
  await reader.locator('#findInput').fill('Vue');
  await reader.locator('#findInput').press('Enter');
  await expect(reader.locator('#findResultsCount')).toContainText(/\d/, {timeout: 15000});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({path: 'reports/pdf-desktop.png', fullPage: true});
  await page.evaluate(() => document.documentElement.dataset.theme = 'dark');
  await expect(reader.locator('html')).toHaveAttribute('data-blog-theme', 'dark');
  await page.setViewportSize({width: 390, height: 844});
  await reader.locator('#viewFindButton').click();
  await reader.locator('#scaleSelect').selectOption('page-width', {force: true});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({path: 'reports/pdf-mobile.png', fullPage: true});
});

test('本地预览不缓存入口 HTML，哈希脚本长期缓存', async ({page, request}) => {
  const response = await page.goto('/Myblog/');
  expect(response.headers()['cache-control']).toBe('no-store');
  const script = await page.locator('script[src]').first().getAttribute('src');
  const chunk = await request.get(script);
  expect(chunk.status()).toBe(200);
  expect(chunk.headers()['cache-control']).toContain('immutable');
});
