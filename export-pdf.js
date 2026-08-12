const { chromium } = require("/Users/salem/Desktop/projects/demos/arkon-developments-proposal/node_modules/playwright-core");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const ROOT = __dirname;
const CHROME = path.join(
  process.env.HOME,
  "Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
);
const htmlPath = path.join(ROOT, "index.html");
const outPath = path.join(ROOT, "Arkon-Rootk-CRM-Proposal.pdf");

async function loadPdfLib() {
  try {
    return require("/Users/salem/Desktop/projects/demos/arkon-developments-proposal/node_modules/pdf-lib");
  } catch {
    /* continue */
  }
  const modPath = path.join(ROOT, ".pdf-lib-tmp");
  if (!fs.existsSync(path.join(modPath, "node_modules/pdf-lib"))) {
    fs.mkdirSync(modPath, { recursive: true });
    execSync("npm install pdf-lib@1.17.1 --no-fund --no-audit", {
      cwd: modPath,
      stdio: "inherit",
    });
  }
  return require(path.join(modPath, "node_modules/pdf-lib"));
}

(async () => {
  const { PDFDocument } = await loadPdfLib();

  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 900, height: 1200 },
    deviceScaleFactor: 2,
  });

  await page.goto("file://" + htmlPath, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.evaluate(() => document.fonts.ready).catch(() => {});
  await page.waitForSelector(".sheet", { timeout: 10000 });
  await page.waitForTimeout(1800);

  await page.evaluate(() => {
    localStorage.setItem("arkon-proposal-lang", "ar");
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    document.querySelectorAll(".sheet").forEach((s) => {
      s.classList.add("is-in", "is-visible", "is-live");
      s.style.setProperty("--rx", "0deg");
      s.style.setProperty("--ry", "0deg");
      s.style.transform = "none";
    });
    document
      .querySelectorAll(".feat-block, .diff-item, .role-cell, .legal-panel, [data-tilt]")
      .forEach((el) => {
        el.style.transform = "none";
      });
    document.body.classList.remove("is-lang-switching");

    if (typeof I18N !== "undefined") {
      const lang = "ar";
      const t = (key) => I18N[lang]?.[key] || "";
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (key && t(key)) el.textContent = t(key);
      });
    }
  });

  await page.waitForTimeout(500);

  const sheets = page.locator(".sheet");
  const count = await sheets.count();
  const pngs = [];
  for (let i = 0; i < count; i++) {
    const buf = await sheets.nth(i).screenshot({ type: "png" });
    pngs.push(buf);
    console.log("captured sheet", i + 1, "/", count);
  }

  await browser.close();

  const pdf = await PDFDocument.create();
  const W = 595.28;
  const H = 841.89;

  for (const png of pngs) {
    const img = await pdf.embedPng(png);
    const pdfPage = pdf.addPage([W, H]);
    const dims = img.scaleToFit(W, H);
    const x = (W - dims.width) / 2;
    const y = (H - dims.height) / 2;
    pdfPage.drawImage(img, { x, y, width: dims.width, height: dims.height });
  }

  const bytes = await pdf.save();
  fs.writeFileSync(outPath, bytes);
  console.log("saved", outPath, bytes.length, "pages", count);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
