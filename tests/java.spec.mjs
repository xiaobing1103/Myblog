import {test, expect} from '@playwright/test';
import {readTextbook} from '../scripts/java-textbook.mjs';
import {unzipSync} from 'fflate';

const textbook = await readTextbook();
const routes = ['', 'basics', 'control-flow', 'objects', 'collections', 'streams', 'exceptions', 'spring-boot', 'database-testing', 'practice', 'resources', 'textbook', ...textbook.map(lesson => `textbook/${lesson.slug}`)];
for (const route of routes) {
  test(`Java 页面正常且未自动加载外部编译器：${route || 'index'}`, async ({page}) => {
    const errors = [], external = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {if (request.url().includes('onecompiler.com')) external.push(request.url());});
    const response = await page.goto(`/Myblog/docs/java/${route ? route + '/' : ''}`);
    expect(response.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
    expect(errors).toEqual([]);
    expect(external).toEqual([]);
    await expect(page.locator('iframe')).toHaveCount(0);
  });
}

test('草稿切题立即保存、参考答案、下载和手机布局', async ({page}) => {
  await page.goto('/Myblog/docs/java/practice/');
  await page.locator('#java-price').fill('// draft immediately before switching');
  await page.locator('#java-exercise-select').selectOption('strings');
  await page.locator('#java-exercise-select').selectOption('price');
  await expect(page.locator('#java-price')).toHaveValue('// draft immediately before switching');
  await page.reload();
  await expect(page.locator('#java-price')).toHaveValue('// draft immediately before switching');
  await page.getByRole('button', {name: '查看参考答案'}).click();
  await expect(page.getByRole('button', {name: '收起参考答案'})).toHaveAttribute('aria-expanded', 'true');
  const highlighted = page.locator('pre').filter({hasText: 'int priceInCents'}).last();
  // 滚动稳定的答案按钮；pre 会在懒加载高亮完成时被 React 替换。
  await page.getByRole('button', {name: '收起参考答案'}).scrollIntoViewIfNeeded();
  await expect(highlighted.locator('.token.keyword').first()).toBeVisible();
  const download = page.waitForEvent('download');
  await page.getByRole('button', {name: '下载 Main.java'}).click();
  expect((await download).suggestedFilename()).toBe('Main.java');
  await page.getByRole('button', {name: '重置代码'}).click();
  await expect(page.locator('#java-price')).toContainText('public class Main');
  await page.setViewportSize({width: 390, height: 844});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({path: 'reports/java-mobile.png', fullPage: true});
  await page.evaluate(() => localStorage.setItem('theme', 'dark'));
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.screenshot({path: 'reports/java-dark.png', fullPage: true});
});

test('模拟编译器协议：握手、失败、通过和消息来源校验', async ({page}) => {
  // 只验证集成协议，不执行 Java；真实编译由 verify-java-exercises 和独立在线 smoke 验证。
  await page.route('https://onecompiler.com/embed/**', route => route.fulfill({contentType: 'text/html', body: `<script>
    let files = [];
    addEventListener('message', e => {
      if(e.data.eventType === 'populateCode') {
        files = e.data.files;
        parent.postMessage({action:'change',language:'java',files}, '*');
      }
      if(e.data.eventType === 'triggerRun') {
        parent.postMessage({action:'runComplete',language:'java',files,result:{stdout:files[0].content.includes('PASS_ME')?'20640':'0'}}, '*');
      }
    });
    parent.postMessage({action:'change',language:'',files:[]}, '*');
    </script>`}));
  await page.goto('/Myblog/docs/java/practice/');
  await page.getByRole('button', {name:'启动在线练习'}).click();
  const run = page.getByRole('button', {name:'运行当前代码'});
  await expect(run).toBeEnabled();
  await run.click();
  await expect(page.getByText('请继续调整', {exact:true})).toBeVisible();
  await page.evaluate(() => window.dispatchEvent(new MessageEvent('message', {origin:'https://onecompiler.com',source:window,data:{action:'runComplete',language:'java',files:[],result:{stdout:'20640'}}})));
  expect(await page.evaluate(() => localStorage.getItem('java-course-progress-v1'))).toBeNull();
  await page.locator('iframe').evaluate(frame => frame.contentWindow.postMessage({eventType:'populateCode',files:[{name:'Main.java',content:'// PASS_ME'}]}, 'https://onecompiler.com'));
  await expect(page.getByRole('status')).toContainText('代码已修改');
  await run.click();
  await expect(page.getByText('示例检查通过', {exact:true})).toBeVisible();
  expect(JSON.parse(await page.evaluate(() => localStorage.getItem('java-course-progress-v1'))).price).toBe(true);
});

test('学习进度损坏可恢复，项目 ZIP 可下载', async ({page, request}) => {
  await page.goto('/Myblog/docs/java/');
  await page.evaluate(() => localStorage.setItem('java-course-progress-v1', 'null'));
  await page.reload();
  await expect(page.getByText('示例检查完成 0 / 12')).toBeVisible();
  const zip = await request.get('/Myblog/downloads/java-todo-api.zip');
  expect(zip.status()).toBe(200);
  expect((await zip.body()).subarray(0, 2).toString()).toBe('PK');
});

test('教材目录、前后课导航、折叠答案与源码包', async ({page, request}) => {
  await page.goto('/Myblog/docs/java/');
  await page.getByRole('link', {name: '进入《Java 后端开发分步教材》 →'}).click();
  await expect(page).toHaveURL(/\/java\/textbook\/$/);
  await expect(page.locator('article table')).toHaveCount(5);
  await page.locator('article').getByRole('link', {name:'01 环境与第一个程序'}).click();
  await expect(page.locator('h1')).toContainText('第 01 课');
  const answer = page.locator('article details');
  await expect(answer).not.toHaveAttribute('open', '');
  await answer.locator('summary').click();
  await expect(answer).toHaveAttribute('open', '');
  await page.locator('.pagination-nav__link--next').click();
  await expect(page.locator('h1')).toContainText('第 02 课');
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({path:'reports/java-textbook-mobile.png',fullPage:true});
  await page.goto('/Myblog/docs/java/textbook/');
  await page.setViewportSize({width:1440,height:1000});
  await page.evaluate(() => scrollTo(0,0));
  await page.screenshot({path:'reports/java-textbook-desktop.png',fullPage:true});
  const response = await request.get('/Myblog/downloads/java-textbook-examples.zip');
  expect(response.status()).toBe(200);
  const entries = unzipSync(new Uint8Array(await response.body()));
  expect(Object.keys(entries).filter(name => name.endsWith('/Main.java'))).toHaveLength(14);
  expect(new TextDecoder().decode(entries['java-textbook/14-http/Main.java'])).toContain('HttpServer.create');
});
