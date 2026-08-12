import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ExportOverlay } from "./ExportOverlay";
import { exportProposalPdf, type ExportProgress } from "./exportPdf";
import { CloseBody, CoverBody, Hed, Sheet } from "./kit";
import { PageView } from "./visuals";
import { useLang } from "../lang";
import { PAGES } from "./pages";
import { CHAPTERS, type PageDef } from "./types";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function Body({ page }: { page: PageDef }) {
  switch (page.kind) {
    case "cover":
      return <CoverBody />;
    case "close":
      return <CloseBody />;
    case "page":
      return (
        <>
          <Hed title={page.title} lede={page.lede} wide />
          <PageView page={page} />
        </>
      );
  }
}

function pageTitle(page: PageDef, lang: "ar" | "en") {
  if (page.kind === "cover") return lang === "ar" ? "الغلاف" : "Cover";
  if (page.kind === "close") return lang === "ar" ? "الختام والعرض" : "Close";
  return page.title[lang].split("\n")[0];
}

const DOC_SCROLL_MQ = "(max-width: 1200px)";

function useDocScroll() {
  const [docScroll, setDocScroll] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(DOC_SCROLL_MQ).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(DOC_SCROLL_MQ);
    const apply = () => setDocScroll(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return docScroll;
}

export function Proposal() {
  const { lang, setLang } = useLang();
  const total = PAGES.length;
  const docScroll = useDocScroll();
  const [active, setActive] = useState(1);
  const [progress, setProgress] = useState<ExportProgress | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const exporting = useRef(false);
  const portRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(1);
  const navigating = useRef(false);
  const navTimer = useRef(0);
  const docScrollRef = useRef(docScroll);
  docScrollRef.current = docScroll;

  const currentChapter = useMemo(
    () => CHAPTERS.find((c) => active >= c.from && active <= c.to) ?? CHAPTERS[0],
    [active]
  );

  const measureDeck = useCallback(() => {
    const port = portRef.current;
    if (!port || docScrollRef.current) return;
    port.style.setProperty("--deck-h", `${port.clientHeight}px`);
  }, []);

  const go = useCallback(
    (n: number, opts?: { animate?: boolean }) => {
      const i = Math.max(1, Math.min(total, n));
      const page = PAGES[i - 1];
      activeRef.current = i;
      setActive(i);

      const el = document.getElementById(`p-${page.id}`);
      if (!el) return;

      navigating.current = true;
      window.clearTimeout(navTimer.current);
      const behavior: ScrollBehavior = opts?.animate === false ? "auto" : "smooth";

      if (docScrollRef.current) {
        const chrome = document.querySelector<HTMLElement>(".chrome");
        const offset = chrome?.offsetHeight ?? 0;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, top), behavior });
      } else {
        const port = portRef.current;
        if (port) {
          port.scrollTo({ top: el.offsetTop, behavior });
        }
      }

      navTimer.current = window.setTimeout(() => {
        navigating.current = false;
      }, 800);
    },
    [total]
  );

  const runExport = useCallback(async () => {
    if (exporting.current) return;
    exporting.current = true;
    setExportError(null);
    setProgress({ phase: "prepare", current: 0, total, percent: 4 });
    try {
      await exportProposalPdf({
        filename: lang === "ar" ? "Arkon-Rootk-CRM-Proposal.pdf" : "Arkon-Rootk-CRM-Proposal-EN.pdf",
        onProgress: setProgress,
      });
      window.setTimeout(() => {
        setProgress(null);
        exporting.current = false;
      }, 1600);
    } catch (err) {
      exporting.current = false;
      setExportError(err instanceof Error ? err.message : "export-failed");
    }
  }, [lang, total]);

  useLayoutEffect(() => {
    document.documentElement.classList.add("is-flow");
    document.documentElement.classList.toggle("is-doc-scroll", docScroll);
    measureDeck();
    if (docScroll) {
      const port = portRef.current;
      if (port) port.scrollTop = 0;
    }
    return () => {
      document.documentElement.classList.remove("is-flow");
      document.documentElement.classList.remove("is-doc-scroll");
    };
  }, [measureDeck, lang, docScroll]);

  useEffect(() => {
    let t = 0;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => measureDeck(), 80);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [measureDeck]);

  useEffect(() => {
    const stages = PAGES.map((p) => document.getElementById(`p-${p.id}`)).filter(Boolean) as HTMLElement[];
    if (!stages.length) return;

    const root: Element | null = docScroll ? null : portRef.current;
    if (!docScroll && !root) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (navigating.current || exporting.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = visible.target.id.replace(/^p-/, "");
        const idx = PAGES.findIndex((p) => p.id === id);
        if (idx < 0) return;
        const next = idx + 1;
        if (next === activeRef.current) return;
        activeRef.current = next;
        setActive(next);
      },
      {
        root,
        rootMargin: docScroll ? "-20% 0px -55% 0px" : "-28% 0px -42% 0px",
        threshold: [0.1, 0.25, 0.45, 0.65],
      }
    );
    stages.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang, docScroll]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (exporting.current) {
        if (e.key === "Escape" && exportError) setProgress(null);
        e.preventDefault();
        return;
      }
      const rtl = document.documentElement.dir === "rtl";
      const typing = (e.target as HTMLElement | null)?.closest("input, textarea, [contenteditable='true']");
      if (typing) return;
      if (e.key === " " && (e.target as HTMLElement | null)?.closest("button, a")) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(activeRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        go(activeRef.current - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(activeRef.current + (rtl ? -1 : 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(activeRef.current + (rtl ? 1 : -1));
      } else if (e.key === "Home") {
        e.preventDefault();
        go(1);
      } else if (e.key === "End") {
        e.preventDefault();
        go(total);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, exportError, total]);

  const sheetTone = PAGES[active - 1]?.tone ?? "ink";

  return (
    <div className={`doc doc--${sheetTone} is-flow${docScroll ? " is-doc-scroll" : ""}`}>
      <div className="doc-desk" aria-hidden="true" />
      <header className="chrome">
        <a
          href="#p-cover"
          className="chrome-brand"
          onClick={(e) => {
            e.preventDefault();
            go(1);
          }}
        >
          <img className="arkon" src="/assets/arkon-logo@2x.png" alt="Arkon" />
          <span className="x">×</span>
          <img className="rootk" src="/assets/rootk-logo.svg" alt="ROOTK" />
        </a>
        <nav className="ticks" aria-label={lang === "ar" ? "فصول العرض" : "Proposal chapters"}>
          {CHAPTERS.filter((c) => c.id !== "close").map((c) => (
            <button key={c.id} type="button" className={c.id === currentChapter.id ? "is-on" : ""} onClick={() => go(c.from)}>
              {c.n} {c.label[lang]}
            </button>
          ))}
        </nav>
        <div className="chrome-meta">
          <span className="chrome-pg">
            {currentChapter.n} / {currentChapter.label[lang]}
            <i>{pad(active)}</i>
          </span>
          <button
            type="button"
            className="chrome-pdf"
            disabled={!!progress && !exportError}
            aria-label={lang === "ar" ? "تصدير العرض PDF" : "Export proposal as PDF"}
            onClick={() => void runExport()}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.2 1.5h6.1L12.8 5v9.5H3.2V1.5Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M9.2 1.5V5h3.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 7.2v5.2M5.8 10.2 8 12.4l2.2-2.2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
            </svg>
            PDF
          </button>
          <div className="lang" role="group" aria-label={lang === "ar" ? "اللغة" : "Language"}>
            <button type="button" className={lang === "ar" ? "is-on" : ""} onClick={() => setLang("ar")}>
              AR
            </button>
            <button type="button" className={lang === "en" ? "is-on" : ""} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
        </div>
      </header>

      <div className="deck is-flow" ref={portRef}>
        <div className="deck-track">
          {PAGES.map((page, i) => (
            <Sheet
              key={page.id}
              id={page.id}
              n={i + 1}
              total={total}
              tone={page.tone}
              kicker={page.kind === "page" ? page.kicker : undefined}
              chapter={page.chapter}
              bare={page.kind === "cover" || page.kind === "close"}
              active
            >
              <Body page={page} />
            </Sheet>
          ))}
        </div>
      </div>

      <div className="pager">
        <div className="pager-inner">
          <button type="button" disabled={active <= 1} onClick={() => go(activeRef.current - 1)}>
            {lang === "ar" ? "→ السابق" : "← Previous"}
          </button>
          <span>
            {pad(active)} / {pad(total)}
          </span>
          <button type="button" disabled={active >= total} onClick={() => go(activeRef.current + 1)}>
            {lang === "ar" ? "التالي ←" : "Next →"}
          </button>
        </div>
      </div>

      <ExportOverlay
        progress={progress}
        pageTitle={progress?.phase === "capture" ? pageTitle(PAGES[Math.max(0, progress.current - 1)], lang) : ""}
        error={exportError}
        onRetry={() => void runExport()}
        onClose={() => {
          setExportError(null);
          setProgress(null);
          exporting.current = false;
        }}
      />
    </div>
  );
}
