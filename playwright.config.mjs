import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './tests', timeout: 30000, workers: 4,
  reporter: [['list'], ['json', {outputFile: 'reports/browser-tests.json'}]],
  use: {baseURL: 'http://127.0.0.1:3000', browserName: 'chromium', trace: 'retain-on-failure', launchOptions: process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {}},
  webServer: {command: 'npm run preview', url: 'http://127.0.0.1:3000/Myblog/', reuseExistingServer: !process.env.CI},
});
