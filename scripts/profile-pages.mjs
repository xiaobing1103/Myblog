import fs from 'node:fs';
import {spawn} from 'node:child_process';
import {chromium} from '@playwright/test';

const baseUrl = 'http://127.0.0.1:3000/Myblog/';
let preview;
try {
  const response = await fetch(baseUrl, {signal: AbortSignal.timeout(1000)});
  if (!response.ok) throw new Error(`预览服务返回 ${response.status}`);
} catch {
  preview = spawn(process.execPath, ['scripts/preview.mjs'], {stdio: 'inherit'});
  let ready = false;
  for (let attempt = 0; attempt < 50; attempt++) {
    if (preview.exitCode !== null) break;
    try {
      const response = await fetch(baseUrl, {signal: AbortSignal.timeout(1000)});
      if (response.ok) {ready = true; break;}
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  if (!ready) {
    preview.kill();
    throw new Error('无法启动生产预览服务');
  }
}

let browser;
const results = [];
try {
  browser = await chromium.launch(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {});
  for (const target of [
    {name: 'home-desktop', path: '', viewport: {width: 1440, height: 900}},
    {name: 'home-mobile', path: '', viewport: {width: 390, height: 844}},
    {name: 'article', path: 'css-flex-box-layout/', viewport: {width: 1440, height: 900}},
    {name: 'pdf', path: 'docs/resources/frontend-pdf/01frontend-pdf/', viewport: {width: 1440, height: 900}},
  ]) {
    const context = await browser.newContext({viewport: target.viewport});
    const page = await context.newPage();
    const session = await context.newCDPSession(page);
    await session.send('Network.enable');
    const requests = new Map();
    session.on('Network.responseReceived', ({requestId, type, response}) => requests.set(requestId, {type, url: response.url, status: response.status}));
    session.on('Network.loadingFinished', ({requestId, encodedDataLength}) => {
      const item = requests.get(requestId);
      if (item) item.transferBytes = encodedDataLength;
    });
    await page.goto(`http://127.0.0.1:3000/Myblog/${target.path}`, {waitUntil: 'networkidle'});
    if (target.name === 'pdf') {
      await page.frameLocator('article iframe').locator('#viewer .page canvas').first().waitFor({state: 'visible', timeout: 20000});
      await page.waitForLoadState('networkidle');
    }
    await page.waitForTimeout(1000);
    const rows = [...requests.values()].filter(r => r.url.startsWith('http') && r.transferBytes);
    const types = {};
    for (const row of rows) types[row.type] = (types[row.type] || 0) + row.transferBytes;
    const entry = {name: target.name, requests: rows.length, transferBytes: rows.reduce((n, r) => n + r.transferBytes, 0), types, resources: rows.sort((a, b) => b.transferBytes - a.transferBytes)};
    results.push(entry);
    const budget = target.name.startsWith('home') ? {requests: 14, transferBytes: 160 * 1024} : target.name === 'article' ? {requests: 30, transferBytes: 260 * 1024} : null;
    if (budget) {
      entry.budget = budget;
      if (entry.requests > budget.requests || entry.transferBytes > budget.transferBytes) process.exitCode = 1;
    }
    console.log(`${entry.name}: ${entry.requests} requests, ${entry.transferBytes} transferred bytes`);
    await context.close();
  }
} finally {
  await browser?.close();
  preview?.kill();
}
const output = process.argv[2] || 'reports/network-current.json';
fs.writeFileSync(output, JSON.stringify({conditions: 'Chrome, cold browser context, local production preview, networkidle + 1s; includes prefetch; iframe subtargets may be excluded by CDP', pages: results}, null, 2) + '\n');
