import { motion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useLang, type Tx } from "../lang";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  kicker,
  title,
  lede,
}: {
  kicker: Tx;
  title: Tx;
  lede?: Tx;
}) {
  const { t } = useLang();
  return (
    <Reveal className="sec-head">
      <p className="kicker">{t(kicker)}</p>
      <h2 className="display">{t(title)}</h2>
      {lede ? <p className="lede">{t(lede)}</p> : null}
    </Reveal>
  );
}

export function FeatureGroup({ items }: { items: Tx[] }) {
  const { t } = useLang();
  return (
    <ul className="chips">
      {items.map((item) => (
        <li key={t(item)} className="chip">
          {t(item)}
        </li>
      ))}
    </ul>
  );
}

export function MockFrame({
  title,
  children,
  light,
}: {
  title: Tx | string;
  children: ReactNode;
  light?: boolean;
}) {
  const { t } = useLang();
  return (
    <div className={`mock${light ? " mock--light" : ""}`}>
      <div className="mock-bar">
        <span className="mock-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="mock-title">{typeof title === "string" ? title : t(title)}</span>
      </div>
      <div className="mock-body">{children}</div>
    </div>
  );
}

export function CountUp({
  value,
  format,
  suffix,
}: {
  value: number;
  format: "int" | "dec";
  suffix?: string;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(value * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  const shown = format === "int" ? Math.round(n).toLocaleString("en-US") : n.toFixed(1);
  return (
    <span ref={ref} dir="ltr" style={{ unicodeBidi: "isolate" }}>
      {shown}
      {suffix ? `\u00a0${suffix}` : ""}
    </span>
  );
}
