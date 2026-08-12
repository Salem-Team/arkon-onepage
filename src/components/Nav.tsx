import { DEMO, NAV } from "../data";
import { useLang } from "../lang";

export function Nav({ active }: { active: string }) {
  const { t, lang, setLang } = useLang();
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#hero" className="nav-brand">
          <img className="arkon" src="/assets/arkon-logo.png" alt="Arkon" />
          <span className="x">×</span>
          <img className="rootk" src="/assets/rootk-logo.png" alt="ROOTK" />
        </a>
        <div className="nav-links">
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={active === item.id ? "is-active" : ""}>
              {t(item.label)}
            </a>
          ))}
        </div>
        <div className="lang" role="group" aria-label={lang === "ar" ? "اللغة" : "Language"}>
          <button type="button" className={lang === "ar" ? "is-on" : ""} onClick={() => setLang("ar")}>
            AR
          </button>
          <button type="button" className={lang === "en" ? "is-on" : ""} onClick={() => setLang("en")}>
            EN
          </button>
        </div>
        <a className="nav-cta" href={DEMO.url} target="_blank" rel="noreferrer">
          {lang === "ar" ? "فتح التجربة" : "Open Demo"}
        </a>
      </div>
    </nav>
  );
}
