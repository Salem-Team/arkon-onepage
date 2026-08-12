import { Icon, type IconName } from "./icons";
import { useLang, type Tx } from "../lang";

function txOf(c: Tx | string, lang: "ar" | "en") {
  return typeof c === "string" ? c : c[lang];
}

export function Tile({
  icon,
  en,
  ar,
  body,
  inn,
  out,
  n,
  gold,
  score,
}: {
  icon: IconName;
  en: string;
  ar: string;
  body?: Tx | string;
  inn?: Tx | string;
  out?: Tx | string;
  n?: string;
  gold?: boolean;
  score?: string;
}) {
  const { lang } = useLang();
  const primary = lang === "ar" ? ar : en;
  const secondary = lang === "ar" ? en : ar;
  return (
    <article className={`tile${gold ? " is-gold" : ""}${score ? " has-score" : ""}`}>
      {n ? <em>{n}</em> : null}
      <span className="tile-ico">
        <Icon name={icon} />
      </span>
      <div className="tile-copy">
        <span className="tile-en" dir={lang === "ar" ? "ltr" : "rtl"}>
          {secondary}
        </span>
        <strong dir={lang === "ar" ? "rtl" : "ltr"}>{primary}</strong>
      </div>
      {score ? (
        <b className="tile-score" dir="ltr">
          {score}
        </b>
      ) : null}
      {body ? <p>{txOf(body, lang)}</p> : null}
      {inn || out ? (
        <footer>
          {inn ? (
            <b>
              {lang === "ar" ? "يدخل: " : "In: "}
              {txOf(inn, lang)}
            </b>
          ) : null}
          {out ? (
            <b>
              {lang === "ar" ? "يطلع: " : "Out: "}
              {txOf(out, lang)}
            </b>
          ) : null}
        </footer>
      ) : null}
    </article>
  );
}

export function Arrow({ v, label }: { v?: boolean; label?: string }) {
  return (
    <div className={`arr${v ? " is-v" : ""}`} aria-hidden={!label}>
      <svg viewBox={v ? "0 0 16 28" : "0 0 28 16"}>
        {v ? <path d="M8 2v20M3 16l5 6 5-6" /> : <path d="M2 8h20M16 3l6 5-6 5" />}
      </svg>
      {label ? <span>{label}</span> : null}
    </div>
  );
}

export function Cap({ c }: { c: Tx }) {
  const { t } = useLang();
  return <p className="cap">{t(c)}</p>;
}

export function Domain({
  icon,
  title,
  items,
}: {
  icon: IconName;
  title: Tx | string;
  items: (Tx | string)[];
}) {
  const { lang } = useLang();
  return (
    <article className="domain">
      <header className="domain-h">
        <span className="tile-ico">
          <Icon name={icon} />
        </span>
        <strong>{txOf(title, lang)}</strong>
      </header>
      <ul>
        {items.map((x) => {
          const label = txOf(x, lang);
          return <li key={label}>{label}</li>;
        })}
      </ul>
    </article>
  );
}

export function H3({ c }: { c: Tx }) {
  const { t } = useLang();
  return <h3>{t(c)}</h3>;
}

export function Note({ c, className }: { c: Tx; className?: string }) {
  const { t } = useLang();
  return <p className={className}>{t(c)}</p>;
}
