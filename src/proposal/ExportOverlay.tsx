import { Geom } from "./kit";
import { useLang } from "../lang";
import type { ExportProgress } from "./exportPdf";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ExportOverlay({
  progress,
  pageTitle,
  error,
  onRetry,
  onClose,
}: {
  progress: ExportProgress | null;
  pageTitle: string;
  error: string | null;
  onRetry: () => void;
  onClose: () => void;
}) {
  const { lang } = useLang();
  if (!progress && !error) return null;

  const total = progress?.total || 1;
  const current = progress?.current || 0;
  const pct = error ? progress?.percent ?? 0 : progress?.percent ?? 0;
  const done = progress?.phase === "done";

  const headline = error
    ? lang === "ar"
      ? "التصدير اتوقف."
      : "Export interrupted."
    : done
      ? lang === "ar"
        ? "الملف جاهز."
        : "The file is ready."
      : lang === "ar"
        ? "جاري تجهيز ملف PDF"
        : "Preparing the PDF";

  const status = error
    ? lang === "ar"
      ? "حصل خطأ أثناء تصوير الصفحات. تقدر تعيد المحاولة من غير ما تخرج من العرض."
      : "A page could not be captured. You can retry without leaving the proposal."
    : progress?.phase === "prepare"
      ? lang === "ar"
        ? "تثبيت الخطوط وتجهيز الصفحات قبل التصوير."
        : "Embedding type and locking the sheets before capture."
      : progress?.phase === "build"
        ? lang === "ar"
          ? "تجميع الصفحات داخل ملف A4 واحد."
          : "Binding the sheets into a single A4 file."
        : progress?.phase === "done"
          ? lang === "ar"
            ? "بدأ التحميل على جهازك."
            : "The download has started on your device."
          : pageTitle
            ? lang === "ar"
              ? `تصوير الصفحة ${pad(current)} من ${pad(total)} — ${pageTitle}`
              : `Capturing page ${pad(current)} of ${pad(total)} — ${pageTitle}`
            : lang === "ar"
              ? `تصوير الصفحة ${pad(current)} من ${pad(total)}`
              : `Capturing page ${pad(current)} of ${pad(total)}`;

  return (
    <div className="xpdf" role="alertdialog" aria-modal="true" aria-busy={!done && !error} aria-live="polite">
      <div className="xpdf-desk" />
      <div className="xpdf-geom" aria-hidden="true">
        <Geom />
      </div>
      <div className="xpdf-panel">
        <p className="xpdf-k">Arkon × Rootk</p>
        <h2>{headline}</h2>
        <p className="xpdf-num">
          <b>{Math.min(100, Math.max(0, pct))}</b>
          <span>%</span>
        </p>
        <div className="xpdf-bar" aria-hidden="true">
          <i style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
        </div>
        <p className="xpdf-status">{status}</p>
        <ol className="xpdf-ticks" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <li key={i} className={i < current || done ? "is-on" : ""} />
          ))}
        </ol>
        {error ? (
          <div className="xpdf-actions">
            <button type="button" className="xpdf-btn" onClick={onRetry}>
              {lang === "ar" ? "إعادة المحاولة" : "Try again"}
            </button>
            <button type="button" className="xpdf-btn is-ghost" onClick={onClose}>
              {lang === "ar" ? "إغلاق" : "Close"}
            </button>
          </div>
        ) : done ? (
          <p className="xpdf-note">ROOTK CRM · Client Proposal 2026</p>
        ) : null}
      </div>
    </div>
  );
}
