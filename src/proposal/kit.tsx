import { Check, Copy } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { LEGAL, PACKAGES } from "../data";
import { useLang, type Tx } from "../lang";
import { Skyline } from "./icons";
import type { ChapterId, PageDef } from "./types";
import { CHAPTERS } from "./types";

export function T({ c }: { c: Tx }) {
  const { t } = useLang();
  return <>{t(c)}</>;
}

export function Geom() {
  return (
    <svg className="geom-svg" viewBox="0 0 320 420" fill="none" aria-hidden="true">
      <circle cx="168" cy="168" r="64" stroke="rgba(91, 158, 255,0.35)" />
      <circle cx="168" cy="168" r="18" stroke="rgba(91, 158, 255,0.7)" />
      <path d="M48 86 H268 M86 58 V360" stroke="rgba(91, 158, 255,0.2)" />
    </svg>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Sheet({
  n,
  total,
  tone,
  kicker,
  chapter,
  children,
  id,
  bare,
  active,
}: {
  n: number;
  total: number;
  tone: PageDef["tone"];
  kicker?: Tx;
  chapter: ChapterId;
  children: ReactNode;
  id: string;
  bare?: boolean;
  active?: boolean;
}) {
  const { t } = useLang();
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (active) setOn(true);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    if (document.documentElement.classList.contains("is-flow")) return;
    const root = document.getElementById(`p-${id}`);
    const sheet = root?.querySelector<HTMLElement>(".sheet");
    if (sheet) sheet.scrollTop = 0;
  }, [active, id]);

  return (
    <div className={`stage${active ? " is-active" : ""}`} id={`p-${id}`} aria-hidden={!active}>
      <div className="sheet-fit">
        <div className="sheet-scale">
          <article className={`sheet sheet--${tone}${on || active ? " is-on" : ""}${id === "cover" ? " sheet--cover" : ""}`}>
            <div className="sheet-wash" />
            {tone === "ink" ? <Skyline /> : null}
            <div className="sheet-frame" />
            <div className="sheet-pad">
              {!bare ? (
                <header className="sheet-head">
                  <span className="mark">Arkon × Rootk</span>
                  <span className="sec">
                    {kicker ? t(kicker) : t({ ar: "عرض تنفيذي 2026", en: "Client proposal 2026" })}
                  </span>
                </header>
              ) : null}
              <div className="sheet-body">{children}</div>
              <footer className="sheet-foot">
                <span>Arkon × ROOTK</span>
                <span className="ch">
                  {CHAPTERS.find((c) => c.id === chapter)?.n} /{" "}
                  {t(CHAPTERS.find((c) => c.id === chapter)?.label ?? { ar: "", en: "" })}
                </span>
                <span className="pg">
                  {pad(n)} / {pad(total)}
                </span>
              </footer>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export function Hed({ kicker, title, lede, wide }: { kicker?: Tx; title: Tx; lede?: Tx; wide?: boolean }) {
  return (
    <header className={`hed${wide ? " wide" : ""}`}>
      {kicker ? (
        <p className="hed-k">
          <T c={kicker} />
        </p>
      ) : null}
      <h2 className="hed-h">
        <T c={title} />
      </h2>
      {lede ? (
        <p className="hed-l">
          <T c={lede} />
        </p>
      ) : null}
    </header>
  );
}

export function CoverBody() {
  const { lang } = useLang();
  return (
    <div className="cover cover-logos">
      <div className="cover-aura" aria-hidden="true">
        <i className="cover-orb cover-orb-a" />
        <i className="cover-orb cover-orb-b" />
      </div>
      <p className="cover-top" dir={lang === "ar" ? "rtl" : "ltr"}>
        {lang === "ar" ? "شراكه طويله الامد" : "Partnership for a long time"}
      </p>
      <div className="cover-marks">
        <figure>
          <img className="cover-mark-arkon" src="/assets/arkon-logo@2x.png" alt="Arkon" />
        </figure>
        <span className="cover-x" aria-hidden="true">
          ×
        </span>
        <figure>
          <img className="cover-mark-rootk" src="/assets/rootk-brand.png" alt="ROOTK" />
        </figure>
      </div>
    </div>
  );
}

function CopyField({
  label,
  value,
  onCopied,
}: {
  label: string;
  value: string;
  onCopied: (msg: string) => void;
}) {
  const { lang } = useLang();
  const [ok, setOk] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.insetInlineStart = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setOk(true);
    onCopied(lang === "ar" ? `تم نسخ ${label}` : `${label} copied`);
    window.setTimeout(() => setOk(false), 1800);
  }

  return (
    <div className="copy-field">
      <div className="copy-row">
        <span className="copy-label">{label}</span>
        <div className="copy-value">
          <strong dir="ltr">{value}</strong>
          <button
            type="button"
            className={`copy-btn${ok ? " is-ok" : ""}`}
            onClick={() => void copy()}
            aria-label={lang === "ar" ? `نسخ ${label}` : `Copy ${label}`}
          >
            {ok ? <Check className="ico" strokeWidth={1.8} /> : <Copy className="ico" strokeWidth={1.8} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CloseBody() {
  const { t, lang } = useLang();
  const [toast, setToast] = useState<string | null>(null);

  function flash(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2000);
  }

  return (
    <div className="close">
      <p className="close-kicker" dir={lang === "ar" ? "rtl" : "ltr"}>
        {lang === "ar" ? "ROOTK · الشريك التقني" : "ROOTK · TECHNICAL PARTNER"}
      </p>
      <img className="close-rootk" src="/assets/rootk-brand.png" alt="ROOTK" />
      <h1 dir="ltr">ROOTK</h1>
      <p className="erp" dir={lang === "ar" ? "rtl" : "ltr"}>
        {lang === "ar" ? "نظام تشغيل عقاري" : "Real Estate ERP"}
      </p>
      <p className="close-line">
        {lang === "ar"
          ? "١٥٠ الف جنيه شامل السيستم وتطبيق الموبايل والموقع. وصيانة مجانية لمدة ١٢ شهر."
          : "150,000 EGP includes the system, the mobile app and the website. Plus twelve months of maintenance, free."}
      </p>

      <div className={`close-pkgs${PACKAGES.length === 1 ? " is-one" : ""}`}>
        {PACKAGES.map((p) => (
          <article key={p.tag} className={`close-pkg${p.featured ? " is-hot" : ""}`}>
            <div className="close-pkg-top">
              {p.ribbon ? <em className="close-rib">{t(p.ribbon)}</em> : <span className="close-rib-slot" aria-hidden="true" />}
              <span className="close-tag">{p.tag}</span>
              <h3>{t(p.title)}</h3>
              <p>{t(p.desc)}</p>
              <ul className="close-inc">
                {p.items.map((item) => (
                  <li key={item.en}>{t(item)}</li>
                ))}
              </ul>
            </div>
            <div className="close-pkg-price">
              <b className="close-amt" dir="ltr">
                {p.amount}
                <i>{lang === "ar" ? "ج.م" : "EGP"}</i>
              </b>
              {p.note ? <span className="close-offer-note">{t(p.note)}</span> : null}
              {p.was ? <small className="close-was">{t(p.was)}</small> : null}
            </div>
          </article>
        ))}
      </div>

      <div className="close-access">
        <div className="close-access-h">
          <span>{lang === "ar" ? "السجل التجاري والبطاقه الضريبيه" : "Commercial register & tax card"}</span>
        </div>
        <div className="close-creds">
          <CopyField
            label={lang === "ar" ? "السجل التجاري" : "Commercial register"}
            value={t(LEGAL.reg)}
            onCopied={flash}
          />
          <CopyField
            label={lang === "ar" ? "البطاقه الضريبيه" : "Tax card"}
            value={t(LEGAL.tax)}
            onCopied={flash}
          />
        </div>
      </div>

      <div className="close-legal">
        <p>ARKON × ROOTK · 2026</p>
      </div>

      {toast ? (
        <div className="close-toast" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
