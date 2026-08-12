const { chromium } = require('/Users/salem/Desktop/projects/demos/arkon-developments-proposal/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const CHROME = path.join(
  process.env.HOME,
  'Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
);

(async () => {
  const htmlPath = path.join(__dirname, 'index.html');
  const outPath = path.join(__dirname, 'preview-cover.png');

  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1200, height: 1600 },
    deviceScaleFactor: 2,
  });

  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForSelector('.sheet.is-in', { timeout: 5000 });
  await page.waitForTimeout(2500);
  await page.evaluate(() => {
    const sheet = document.getElementById('sheet');
    if (!sheet) return;
    sheet.classList.add('is-live');
    sheet.style.setProperty('--rx', '0deg');
    sheet.style.setProperty('--ry', '0deg');
  });
  await page.waitForTimeout(200);

  const sheet = page.locator('#sheet');
  await sheet.screenshot({ path: outPath, type: 'png' });

  console.log('saved', outPath, fs.statSync(outPath).size);
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
