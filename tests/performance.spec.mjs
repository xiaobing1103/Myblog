import {test, expect} from '@playwright/test';

test('首页仅按交互意图预加载，文章仍使用客户端导航', async ({page}) => {
  const paths = [];
  page.on('request', request => paths.push(request.url()));
  await page.goto('/Myblog/', {waitUntil: 'networkidle'});
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  await expect(page.locator('link[rel="prefetch"]')).toHaveCount(0);
  const before = paths.length;
  const link = page.locator('.post-card h3 a').first();
  const destination = await link.getAttribute('href');
  await link.hover();
  await expect.poll(() => paths.length).toBeGreaterThan(before);
  await page.evaluate(() => window.__clientNavigationMarker = 'kept');
  await link.click();
  await expect(page).toHaveURL(new RegExp(destination.replace(/\/$/, '') + '/?$'));
  await expect(page.locator('article')).toBeVisible();
  expect(await page.evaluate(() => window.__clientNavigationMarker)).toBe('kept');
});

test('手机图片使用实际存在的响应式资源', async ({page, request}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/Myblog/css-flex-box-layout/');
  const image = page.locator('article img[srcset]').first();
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();
  const url = await image.evaluate(async element => {await element.decode(); return element.currentSrc;});
  expect(url).toContain('/img/responsive/480.');
  expect((await request.get(url)).status()).toBe(200);
});

test('PDF 支持范围读取、HEAD 与条件缓存', async ({request}) => {
  const url = '/Myblog/pdf/2022-2-16-zhufengfo/vue3zhufeng.pdf';
  const head = await request.head(url);
  expect(head.status()).toBe(200);
  expect(head.headers()['accept-ranges']).toBe('bytes');
  const size = Number(head.headers()['content-length']);
  const first = await request.get(url, {headers: {Range: 'bytes=0-4'}});
  expect(first.status()).toBe(206);
  expect((await first.body()).toString()).toBe('%PDF-');
  expect(first.headers()['content-range']).toBe(`bytes 0-4/${size}`);
  const tail = await request.get(url, {headers: {Range: 'bytes=-16'}});
  expect(tail.status()).toBe(206);
  expect((await tail.body()).length).toBe(16);
  const invalid = await request.get(url, {headers: {Range: `bytes=${size}-`}});
  expect(invalid.status()).toBe(416);
  const cached = await request.get(url, {headers: {'If-None-Match': head.headers().etag}});
  expect(cached.status()).toBe(304);
});

test('大动画在点击播放前只加载封面', async ({page}) => {
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  for (const route of ['/Myblog/docs/fontendInterview/Interview/01-Interview/', '/Myblog/learn-react-event-and-state/']) {
    await page.goto(route);
    const animation = page.locator('.motion-image').first();
    await animation.scrollIntoViewIfNeeded();
    const image = animation.locator('img');
    await expect(image).toHaveAttribute('src', /\/responsive\/poster\./);
    await animation.getByRole('button', {name: '播放动画'}).click();
    await expect(image).not.toHaveAttribute('src', /\/responsive\/poster\./);
    const original = new URL(await image.getAttribute('src'), page.url()).href;
    await expect.poll(() => requests.includes(original)).toBe(true);
    await animation.getByRole('button', {name: '暂停动画'}).click();
    await expect(image).toHaveAttribute('src', /\/responsive\/poster\./);
  }
});
