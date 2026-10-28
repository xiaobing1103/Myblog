import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';

const source = await fs.readFile('src/data/java-course.js', 'utf8');
const {exercises} = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const browser = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:3000/Myblog/docs/java/practice/');
  await page.getByRole('button', {name:'启动在线练习'}).click();
  const run = page.getByRole('button', {name:'运行当前代码'});
  await run.waitFor();
  await page.waitForFunction(() => ![...document.querySelectorAll('button')].find(button => button.textContent === '运行当前代码')?.disabled, {timeout:45000});
  await run.click();
  await page.getByText('请继续调整', {exact:true}).waitFor({timeout:60000});
  console.log('LIVE compiler: starter returned nonmatching output');
  await page.locator('iframe').evaluate((frame, solution) => frame.contentWindow.postMessage({eventType:'populateCode',language:'java',files:[{name:'Main.java',content:solution}]}, 'https://onecompiler.com'), exercises[0].solution);
  await page.getByRole('status').filter({hasText:'代码已修改'}).waitFor();
  await run.click();
  await page.getByText('示例检查通过', {exact:true}).waitFor({timeout:60000});
  const stdout = await page.getByLabel('实际运行输出').textContent();
  if (stdout.trim() !== '20640') throw new Error(`Unexpected stdout: ${stdout}`);
  if (errors.length) throw new Error(errors.join('\n'));
  await page.reload();
  if (!(await page.locator('#java-exercise-select option:checked').textContent()).includes('✓')) throw new Error('Progress not persisted');
  await page.screenshot({path:'reports/java-online.png',fullPage:true});
  console.log('LIVE compiler: solution stdout=20640; progress persisted after reload');
} finally {await browser.close();}
