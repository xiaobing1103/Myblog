import fs from 'node:fs/promises';
import path from 'node:path';
import net from 'node:net';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {chromium, expect} from '@playwright/test';

// 先在 library-lab 执行 mvn test；复用 Maven 记录的完整运行类路径，无需另装插件。
const project = path.resolve('examples/java/library-lab');
const reports = path.join(project, 'target/surefire-reports');
const report = (await fs.readdir(reports)).find(name => name.startsWith('TEST-') && name.endsWith('.xml'));
if (!report) throw new Error('请先在 examples/java/library-lab 执行 mvn test');
const xml = await fs.readFile(path.join(reports, report), 'utf8');
const encoded = xml.match(/<property name="java.class.path" value="([^"]+)"/)?.[1];
if (!encoded) throw new Error('Maven test report does not contain java.class.path');
const classpath = encoded.replaceAll('&quot;', '"').replaceAll('&apos;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
await fs.mkdir('.cache', {recursive: true});
await fs.mkdir('reports', {recursive: true});
const dir = await fs.mkdtemp(path.resolve('.cache/library-ui-'));
const socket = net.createServer();
socket.listen(0, '127.0.0.1');
await once(socket, 'listening');
const port = socket.address().port;
await new Promise(resolve => socket.close(resolve));
const base = `http://127.0.0.1:${port}`;
const dataUrl = `jdbc:h2:file:${path.join(dir, 'library').replaceAll('\\', '/')}`;
let child;
let logs = '';
async function start() {
  child = spawn('java', ['-Dfile.encoding=UTF-8', '-cp', classpath, 'blog.library.LibraryApplication',
    `--server.port=${port}`, `--spring.datasource.url=${dataUrl}`, '--logging.level.root=WARN'], {cwd: project, windowsHide: true});
  let spawnError;
  child.on('error', error => {spawnError = error;});
  child.stdout.on('data', chunk => {logs += chunk;});
  child.stderr.on('data', chunk => {logs += chunk;});
  for (let attempt = 0; attempt < 80; attempt++) {
    if (spawnError) throw spawnError;
    if (child.exitCode !== null) throw new Error(`Java server exited: ${logs.slice(-3000)}`);
    try {if ((await fetch(`${base}/api/books`)).ok) return;} catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error(`Java server startup timeout: ${logs.slice(-3000)}`);
}
async function stop() {
  if (child?.pid && child.exitCode === null && child.signalCode === null) {
    const exited = once(child, 'exit');
    child.kill();
    await exited;
  }
}
let browser;
const evidence = {ui: [], persisted: false};
try {
  await start();
  browser = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base);
  await expect(page.getByRole('heading', {name:'小型图书借阅管理台',exact:true})).toBeVisible();
  const title = 'Java 实战 <img src=x>';
  await page.getByLabel('图书标题', {exact:true}).fill(title);
  await page.getByLabel('作者', {exact:true}).fill('学习小组');
  await page.getByLabel('总册数', {exact:true}).fill('1');
  await page.getByRole('button', {name:'新增图书',exact:true}).click();
  const book = page.locator('#books tr').filter({hasText:title});
  await expect(book).toContainText('1 / 1');
  const id = await book.getAttribute('data-book-id');
  await expect(page.locator('#books img')).toHaveCount(0);
  evidence.ui.push('通过表单新增图书；用户文本按文本显示');
  await page.getByLabel('本次借阅人', {exact:true}).fill('前端学习者');
  await page.getByRole('button', {name:`借阅 ${title}`,exact:true}).click();
  await expect(book).toContainText('0 / 1');
  await expect(page.getByRole('button', {name:`借阅 ${title}`,exact:true})).toBeDisabled();
  const loan = page.locator('#loans tr').filter({hasText:title});
  await expect(loan).toContainText('前端学习者');
  const loanId = await loan.getAttribute('data-loan-id');
  await loan.getByRole('button', {name:/归还/}).click();
  await expect(book).toContainText('1 / 1');
  await page.getByRole('combobox', {name:/显示范围/}).selectOption('false');
  await expect(page.locator('#loans tr').filter({hasText:title})).toContainText('已归还');
  const repeated = await page.request.post(`${base}/api/loans/${loanId}/return`);
  expect(repeated.status()).toBe(409);
  evidence.ui.push('借出扣库存、按钮禁用、归还恢复库存、重复归还409');
  page.on('dialog', dialog => dialog.accept());
  await page.getByRole('button', {name:`删除 ${title}`,exact:true}).click();
  await expect(page.getByRole('status')).toContainText('不能删除');
  await page.getByLabel('查找图书', {exact:true}).fill('找不到这本书');
  await page.getByRole('button', {name:'搜索',exact:true}).click();
  await expect(page.locator('#books')).toContainText('没有匹配的图书');
  await page.getByLabel('查找图书', {exact:true}).fill('');
  await page.getByRole('button', {name:'搜索',exact:true}).click();
  await expect(book).toBeVisible();
  evidence.ui.push('历史图书删除被拒绝；搜索空态与恢复正常');
  await page.screenshot({path:'reports/java-library-app-desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({path:'reports/java-library-app-mobile.png',fullPage:true});
  expect(errors).toEqual([]);
  await stop();
  await start();
  const restored = await (await fetch(`${base}/api/books/${id}`)).json();
  expect(restored.title).toBe(title);
  expect(restored.availableCopies).toBe(1);
  evidence.persisted = true;
  evidence.ui.push('停止并重新启动服务后，图书和库存仍保存');
  console.log('Library UI and persistence smoke passed');
} finally {
  if (browser) await browser.close();
  await stop();
  await fs.writeFile('reports/java-library-server.log', logs);
  await fs.writeFile('reports/java-library-ui.json', JSON.stringify(evidence,null,2));
}
