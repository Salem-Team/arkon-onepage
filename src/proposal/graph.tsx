import { createContext, useContext, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Icon, type IconName } from "./icons";
import { T } from "./kit";
import type { Tx } from "../lang";

const LINKS: Record<string, string[]> = {
  marketing: ["lead", "sales", "revenue"],
  lead: ["marketing", "sales", "qualification", "followup", "opportunity"],
  sales: ["lead", "matching", "pipeline", "reservation", "closed"],
  qualification: ["lead", "opportunity", "matching"],
  followup: ["lead", "sales", "opportunity"],
  opportunity: ["lead", "matching", "inventory", "unit"],
  matching: ["lead", "opportunity", "inventory", "unit", "reservation"],
  inventory: ["matching", "unit", "reservation", "project"],
  unit: ["inventory", "matching", "reservation", "contract"],
  reservation: ["unit", "inventory", "sales", "contract", "closed"],
  contract: ["reservation", "closed", "plan", "collections"],
  closed: ["contract", "plan", "collections", "commission", "accounting", "investor"],
  plan: ["closed", "collections", "contract"],
  collections: ["plan", "closed", "commission", "accounting"],
  commission: ["closed", "collections", "accounting", "broker"],
  accounting: ["closed", "collections", "commission", "reports"],
  investor: ["closed", "contract", "plan", "collections"],
  broker: ["closed", "commission", "deal"],
  reports: ["accounting", "intel", "decision"],
  intel: ["reports", "decision", "marketing", "sales", "collections"],
  people: ["sales", "targets", "intel"],
  deal: ["broker", "investor", "closed", "commission"],
};

type Gx = { hot: string | null; setHot: (id: string | null) => void };
const Ctx = createContext<Gx>({ hot: null, setHot: () => undefined });

export function Graph({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [hot, setHot] = useState<string | null>(null);
  const v = useMemo(() => ({ hot, setHot }), [hot]);
  return (
    <Ctx.Provider value={v}>
      <div className={`gx ${className}${hot ? " is-hot" : ""}`}>{children}</div>
    </Ctx.Provider>
  );
}

export function useHot() {
  return useContext(Ctx);
}

export function Mod({
  id,
  icon,
  title,
  body,
  kids,
  n,
  size = "md",
  gold,
}: {
  id: string;
  icon: IconName;
  title: Tx | string;
  body?: Tx | string;
  kids?: (Tx | string)[];
  n?: string;
  size?: "sm" | "md" | "lg" | "xl";
  gold?: boolean;
}) {
  const { hot, setHot } = useContext(Ctx);
  const linked = hot ? hot === id || (LINKS[hot] ?? []).includes(id) || (LINKS[id] ?? []).includes(hot) : true;
  const on = hot === id;
  return (
    <button
      type="button"
      className={`mod mod--${size}${gold ? " is-gold" : ""}${on ? " is-on" : ""}${hot && !linked ? " is-dim" : ""}`}
      data-mod={id}
      onMouseEnter={() => setHot(id)}
      onMouseLeave={() => setHot(null)}
      onFocus={() => setHot(id)}
      onBlur={() => setHot(null)}
    >
      {n ? <em>{n}</em> : null}
      <span className="mod-ico">
        <Icon name={icon} />
      </span>
      <strong>{typeof title === "string" ? title : <T c={title} />}</strong>
      {body ? <p>{typeof body === "string" ? body : <T c={body} />}</p> : null}
      {kids?.length ? (
        <ul>
          {kids.map((k) => (
            <li key={typeof k === "string" ? k : k.en}>{typeof k === "string" ? k : <T c={k} />}</li>
          ))}
        </ul>
      ) : null}
    </button>
  );
}

export function Hub({ title, sub, gold }: { title: Tx | string; sub?: Tx | string; gold?: boolean }) {
  return (
    <div className={`hub${gold ? " is-gold" : ""}`}>
      <b>{typeof title === "string" ? title : <T c={title} />}</b>
      {sub ? <span>{typeof sub === "string" ? sub : <T c={sub} />}</span> : null}
    </div>
  );
}

export function Arrow({ label, v, gold }: { label?: string; v?: boolean; gold?: boolean }) {
  return (
    <div className={`arr${v ? " is-v" : ""}${gold ? " is-gold" : ""}`} aria-hidden="true">
      <svg viewBox={v ? "0 0 12 28" : "0 0 36 12"} preserveAspectRatio="none">
        {v ? (
          <path d="M6 0 V22 L2 18 M6 22 L10 18" pathLength="1" />
        ) : (
          <path d="M0 6 H30 L26 2 M30 6 L26 10" pathLength="1" />
        )}
      </svg>
      {label ? <em>{label}</em> : null}
    </div>
  );
}

export function Draw({ d, delay = 0 }: { d: string; delay?: number }) {
  return <path className="draw" d={d} pathLength={1} style={{ animationDelay: `${delay}s` } as CSSProperties} />;
}

export function Value({ c }: { c?: Tx }) {
  if (!c) return null;
  return (
    <p className="val">
      <T c={c} />
    </p>
  );
}
