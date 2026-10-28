import {test, expect} from '@playwright/test';
import fs from 'node:fs';

const routes = [
  'learning', 'interview', 'interview/ali-1', 'interview/ali-1/html-browser', 'interview/ali-1/css',
  'interview/ali-2', 'interview/ali-2/javascript', 'interview/ali-2/algorithms', 'interview/ali-2/network-node',
  'interview/handbook', 'interview/handbook/html-browser', 'interview/handbook/javascript', 'interview/handbook/framework-engineering',
  'interview/ant', 'interview/pdd', 'interview/written',
  ...['ali-1', 'ali-2', 'handbook', 'ant', 'pdd', 'written'].map(slug => `interview/sources/${slug}`),
];
for (const route of routes) {
  test(`资源与面试新页可阅读：${route}`, async ({page}) => {
    const errors = [];
    const pdfRequests = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {if (/\.pdf(?:$|\?)/.test(request.url())) pdfRequests.push(request.url());});
    const response = await page.goto(`/Myblog/docs/${route}/`);
    expect(response.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
    await expect(page.locator('article')).toBeVisible();
    await expect(page.locator('article iframe')).toHaveCount(0);
    expect(errors).toEqual([]);
    expect(pdfRequests).toEqual([]);
  });
}

test('资源中心导航、完整页码和下载', async ({page, request}) => {
  await page.goto('/Myblog/docs/resources/resources-intro/');
  await page.getByRole('link', {name: '校订题解 + 完整原文对照', exact: true}).click();
  await expect(page).toHaveURL(/\/docs\/interview\/$/);
  await page.getByRole('link', {name: '82 页 Markdown', exact: true}).click();
  await expect(page.locator('article #page-82')).toHaveText('原 PDF 第 82 页');
  for (const item of JSON.parse(fs.readFileSync('reports/interview-conversion.json', 'utf8'))) {
    const response = await request.get(`/Myblog/downloads/interview-${item.slug}.md`);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain(`原 PDF 第 ${item.pages} 页`);
  }
  const archive = await request.get('/Myblog/downloads/interview-markdown.zip');
  expect(archive.status()).toBe(200);
  expect((await archive.body()).subarray(0, 2).toString()).toBe('PK');
});

test('手机布局与关键题解不执行原始 HTML', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  for (const slug of ['learning', 'interview', 'interview/written', 'interview/sources/written']) {
    await page.goto(`/Myblog/docs/${slug}/`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('article input')).toHaveCount(0);
  }
  await page.goto('/Myblog/docs/interview/written/');
  await page.screenshot({path: 'reports/interview-mobile.png', fullPage: true});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const results = await page.evaluate(() => {
    const el = document.createElement('button');
    el.setAttribute('onclick', 'window.__inlineThis = this');
    document.body.append(el); el.click();
    const inline = window.__inlineThis === el;
    let listener;
    el.onclick = function () {listener = this;}; el.click();
    const nonStrict = Function('return this')() === window;
    const strict = Function('"use strict"; return this')() === undefined;
    el.remove(); delete window.__inlineThis;
    return [inline, listener === el, nonStrict, strict];
  });
  expect(results).toEqual([true, true, true, true]);
  expect(errors).toEqual([]);
});
