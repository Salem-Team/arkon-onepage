import { chromium } from "playwright";
import fs from "node:fs";

const outDir = "/tmp/arkon-close";
fs.mkdirSync(outDir, { recursive: true });

async function measure(page) {
  return page.evaluate(() => {
    const sheet = document.querySelector("#p-close .sheet") || document.querySelector(".sheet.is-on");
    const close = document.querySelector(".close");
    const scroller = document.querySelector(".sheet.is-on") || sheet;
    const rects = {};
    for (const sel of [
      ".close",
      ".close-pkgs",
      ".close-pkg",
      ".close-pkg.is-hot",
      ".close-access",
      ".copy-field",
      ".copy-row",
      ".copy-label",
      ".close-legal",
      ".ctas",
    ]) {
      const els = [...document.querySelectorAll(sel)].filter((el) => close?.contains(el) || sel === ".close");
      rects[sel] = els.slice(0, 4).map((el) => {
        const r = el.getBoundingClientRect();
        return {
          w: Math.round(r.width),
          h: Math.round(r.height),
          t: Math.round(r.top),
          b: Math.round(r.bottom),
          l: Math.round(r.left),
          r: Math.round(r.right),
        };
      });
    }

    const pkgs = [...document.querySelectorAll(".close-pkg")].map((el) => {
      const r = el.getBoundingClientRect();
      const amt = el.querySelector(".close-amt")?.getBoundingClientRect();
      const h3 = el.querySelector("h3")?.getBoundingClientRect();
      return {
        h: Math.round(r.height),
        titleTop: h3 ? Math.round(h3.top - r.top) : null,
        amtTop: amt ? Math.round(amt.top - r.top) : null,
      };
    });

    const labels = [...document.querySelectorAll(".copy-field")].map((el) => {
      const lab = el.querySelector(".copy-label")?.getBoundingClientRect();
      const row = el.querySelector(".copy-row")?.getBoundingClientRect();
      return {
        labelInRow: !!(lab && row && lab.top >= row.top - 1 && lab.bottom <= row.bottom + 1),
        gap: lab && row ? Math.round(row.top - lab.bottom) : null,
      };
    });

    const overflowX = scroller ? scroller.scrollWidth - scroller.clientWidth : 0;
    const overflowY = scroller ? scroller.scrollHeight - scroller.clientHeight : 0;
    let endGap = null;
    if (scroller && close) {
      scroller.scrollTop = scroller.scrollHeight;
      const last = close.lastElementChild;
      const lr = last?.getBoundingClientRect();
      const sr = scroller.getBoundingClientRect();
      endGap = lr ? Math.round(sr.bottom - lr.bottom) : null;
    }

    return {
      pkgs,
      labels,
      overflowX,
      overflowY,
      endGap,
      closeH: rects[".close"][0]?.h,
      pkgsH: rects[".close-pkgs"][0]?.h,
      accessH: rects[".close-access"][0]?.h,
    };
  });
}

async function shoot(browser, name, size) {
  const context = await browser.newContext({
    viewport: size,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:8770/", { waitUntil: "networkidle" });
  await page.keyboard.press("End");
  await page.waitForTimeout(700);
  await page.locator(".close h1").waitFor({ state: "visible" });
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: false });
  const metrics = await measure(page);
  if (name.startsWith("mob")) {
    await page.locator(".sheet.is-on, #p-close .sheet").first().evaluate((el) => {
      el.scrollTop = 0;
    });
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${outDir}/${name}-top.png`, fullPage: false });
    await page.locator(".sheet.is-on, #p-close .sheet").first().evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${outDir}/${name}-end.png`, fullPage: false });
  }
  await context.close();
  return metrics;
}

const browser = await chromium.launch({
  executablePath:
    "/Users/salem/Desktop/projects/MTEC-main/frontend/chrome/mac_arm-150.0.7871.24/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  headless: true,
});

const desk = await shoot(browser, "desk", { width: 1920, height: 1080 });
const mob = await shoot(browser, "mob", { width: 390, height: 844 });
const uw = await shoot(browser, "uw", { width: 2560, height: 1440 });

console.log(JSON.stringify({ desk, mob, uw }, null, 2));
await browser.close();
