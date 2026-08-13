import { toBlob } from "html-to-image";
import { PDFDocument } from "pdf-lib";

export type ExportPhase = "prepare" | "capture" | "build" | "done";

export type ExportProgress = {
  phase: ExportPhase;
  current: number;
  total: number;
  percent: number;
};

function percent(phase: ExportPhase, current: number, total: number) {
  if (phase === "prepare") return 6;
  if (phase === "capture") return Math.round(8 + ((current - 1) / Math.max(total, 1)) * 82);
  if (phase === "build") return 94;
  return 100;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function paint() {
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await wait(48);
}

async function waitImages(root: HTMLElement) {
  const imgs = [...root.querySelectorAll("img")];
  await Promise.all(
    imgs.map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            })
    )
  );
}

async function loadFontEmbedCss() {
  const href = [...document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')]
    .map((link) => link.href)
    .find((url) => url.includes("fonts.googleapis.com"));
  if (!href) return " ";
  try {
    const res = await fetch(href);
    if (!res.ok) return " ";
    return await res.text();
  } catch {
    return " ";
  }
}

function sheetSize(el: HTMLElement) {
  const w = Math.max(1, Math.round(el.offsetWidth || el.getBoundingClientRect().width));
  const h = Math.max(1, Math.round(el.offsetHeight || el.getBoundingClientRect().height));
  return { w, h };
}

async function captureSheet(el: HTMLElement, fontEmbedCSS: string, w: number, h: number) {
  const opts = {
    pixelRatio: 2,
    cacheBust: false,
    fontEmbedCSS,
    preferredFontFormat: "woff2" as const,
    width: w,
    height: h,
    canvasWidth: w * 2,
    canvasHeight: h * 2,
    style: {
      opacity: "1",
    },
  };
  let blob = await toBlob(el, opts);
  if (!blob) {
    blob = await toBlob(el, { ...opts, pixelRatio: 1, canvasWidth: w, canvasHeight: h });
  }
  if (!blob) throw new Error("sheet-capture-failed");
  return blob;
}

function downloadPdf(bytes: Uint8Array, filename: string) {
  const copy = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(copy).set(bytes);
  const blob = new Blob([copy], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function exportProposalPdf(opts: {
  filename: string;
  onProgress: (p: ExportProgress) => void;
}) {
  const report = (phase: ExportPhase, current: number, total: number) =>
    opts.onProgress({ phase, current, total, percent: percent(phase, current, total) });

  report("prepare", 0, 1);
  await document.fonts.ready.catch(() => undefined);
  const fontEmbedCSS = await loadFontEmbedCss();
  await paint();

  const root = document.documentElement;
  const sheets = [...document.querySelectorAll<HTMLElement>(".sheet")];
  if (!sheets.length) throw new Error("no-sheets");

  root.classList.add("is-capturing");
  sheets.forEach((sheet) => {
    sheet.classList.add("is-on");
    sheet.style.opacity = "1";
  });

  try {
    await waitImages(document.body);
    await wait(200);

    const pdf = await PDFDocument.create();
    pdf.setTitle("ROOTK CRM — Client Proposal 2026 | Arkon × ROOTK");
    pdf.setAuthor("ROOTK Systems");
    pdf.setSubject("Arkon Developments — ROOTK CRM enterprise proposal");

    for (let i = 0; i < sheets.length; i++) {
      const sheet = sheets[i];
      report("capture", i + 1, sheets.length);
      await paint();
      sheet.scrollIntoView({ block: "center", behavior: "auto" });
      await wait(40);
      await waitImages(sheet);

      const { w, h } = sheetSize(sheet);
      const blob = await captureSheet(sheet, fontEmbedCSS, w, h);
      const bytes = new Uint8Array(await blob.arrayBuffer());
      const image = await pdf.embedPng(bytes);
      const page = pdf.addPage([w, h]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: w,
        height: h,
      });
    }

    report("build", sheets.length, sheets.length);
    await paint();
    const out = await pdf.save();
    downloadPdf(out, opts.filename);
    report("done", sheets.length, sheets.length);
  } finally {
    root.classList.remove("is-capturing");
  }
}
