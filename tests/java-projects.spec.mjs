import {test, expect} from '@playwright/test';
import {unzipSync} from 'fflate';
import {createHash} from 'node:crypto';

const routes = ['projects/library', ...['01-setup','02-schema','03-books','04-borrow-return','05-frontend','06-testing','07-delivery'].map(name => `projects/library/${name}`), 'open-source', 'open-source/rest-service'];
for (const route of routes) {
  test(`实战文档可访问且无运行错误：${route}`, async ({page}) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(`/Myblog/docs/java/${route}/`);
    expect(response.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
    await expect(page.locator('article h1')).toBeVisible();
    expect(errors).toEqual([]);
    await expect(page.locator('iframe')).toHaveCount(0);
  });
}

test('源码包含完整前后端，官方原文与文件哈希保持一致', async ({request}) => {
  const labResponse = await request.get('/Myblog/downloads/java-library-lab.zip');
  expect(labResponse.status()).toBe(200);
  const lab = unzipSync(new Uint8Array(await labResponse.body()));
  for (const name of ['pom.xml','README.md','LICENSE','src/main/resources/static/index.html','src/main/resources/static/app.js','src/main/resources/schema.sql']) {
    expect(lab[`library-lab/${name}`]).toBeDefined();
  }
  expect(Object.keys(lab).some(name => /\/(target|data)\//.test(name))).toBe(false);
  const sourceResponse = await request.get('/Myblog/downloads/spring-rest-service-source.zip');
  expect(sourceResponse.status()).toBe(200);
  const source = unzipSync(new Uint8Array(await sourceResponse.body()));
  const manifest = JSON.parse(new TextDecoder().decode(source['SOURCE-SNAPSHOT.json'])).sources[0];
  expect(manifest.commit).toBe('3f4cef01152596c19bc4d37939409358812b1421');
  expect(Object.keys(manifest.files)).toHaveLength(59);
  for (const [name, expected] of Object.entries(manifest.files)) {
    expect(createHash('sha256').update(source[`gs-rest-service/${name}`]).digest('hex')).toBe(expected);
  }
  const raw = await request.get('/Myblog/open-source/spring-rest-service/README.adoc');
  expect(createHash('sha256').update(await raw.body()).digest('hex')).toBe(manifest.files['README.adoc']);
});

test('学习入口连接到项目与开源教材，手机文档无溢出', async ({page}) => {
  await page.goto('/Myblog/docs/java/');
  await page.getByRole('link', {name:'进入项目实战路线 →'}).click();
  await expect(page).toHaveURL(/\/projects\/library\/$/);
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({path:'reports/java-library-docs-mobile.png',fullPage:true});
  await page.goto('/Myblog/docs/java/open-source/');
  await expect(page.locator('article')).toContainText('CC BY-ND 3.0');
  await expect(page.locator('article a[download]')).toHaveCount(6);
});
