import { useState, type ReactNode } from "react";
import { Icon, type IconName } from "./icons";
import { useLang, type Tx } from "../lang";

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

export type DNode = { id: string; icon: IconName; label: string; note?: string; carry?: string };

function useHot() {
  const [hot, setHot] = useState<string | null>(null);
  return {
    setHot,
    dim: (id: string) =>
      hot ? !(LINKS[hot] ?? []).includes(id) && hot !== id && !(LINKS[id] ?? []).includes(hot) : false,
  };
}

function Dot({
  id,
  icon,
  label,
  note,
  x,
  y,
  gold,
  dim,
  onEnter,
  onLeave,
}: DNode & { x: number; y: number; gold?: boolean; dim?: boolean; onEnter: (id: string) => void; onLeave: () => void }) {
  return (
    <g
      className={`nd${gold ? " is-gold" : ""}${dim ? " is-dim" : ""}`}
      transform={`translate(${x} ${y})`}
      onMouseEnter={() => onEnter(id)}
      onMouseLeave={onLeave}
    >
      <circle r="22" />
      <foreignObject x="-11" y="-11" width="22" height="22">
        <div className="nd-ico">
          <Icon name={icon} />
        </div>
      </foreignObject>
      <text y="40" textAnchor="middle">
        {label}
      </text>
      {note ? (
        <text y="56" textAnchor="middle" className="nd-note">
          {note}
        </text>
      ) : null}
    </g>
  );
}

export function Cap({ c }: { c: Tx }) {
  const { t } = useLang();
  return <p className="cap">{t(c)}</p>;
}

/** Process = labeled flow. The line is the story. Carry labels say WHAT moves. */
export function Flow({ nodes, vertical }: { nodes: DNode[]; vertical?: boolean }) {
  const { setHot, dim } = useHot();
  const n = nodes.length;
  const W = vertical ? 420 : 1100;
  const H = vertical ? Math.max(520, n * 78) : 210;
  const x = (i: number) => (vertical ? W / 2 : 70 + (i * (W - 140)) / Math.max(n - 1, 1));
  const y = (i: number) => (vertical ? 36 + (i * (H - 72)) / Math.max(n - 1, 1) : 78);
  const d = nodes.map((_, i) => `${i === 0 ? "M" : "L"}${x(i)} ${y(i)}`).join(" ");
  return (
    <svg className="dia dia-flow" viewBox={`0 0 ${W} ${H}`} role="img">
      <path className="spine" d={d} pathLength={1} />
      {nodes.slice(0, -1).map((node, i) => {
        const mx = (x(i) + x(i + 1)) / 2;
        const my = (y(i) + y(i + 1)) / 2;
        return node.carry ? (
          <text key={node.carry + i} className="carry" x={mx} y={vertical ? my : my - 18} textAnchor="middle">
            {node.carry}
          </text>
        ) : null;
      })}
      {nodes.map((node, i) => (
        <Dot key={node.label + i} {...node} x={x(i)} y={y(i)} gold={i === n - 1} dim={dim(node.id)} onEnter={setHot} onLeave={() => setHot(null)} />
      ))}
    </svg>
  );
}

/** Architecture = layered lanes. */
export function Layers({
  lanes,
}: {
  lanes: { title: string; nodes: DNode[] }[];
}) {
  const { setHot, dim } = useHot();
  const W = 1100;
  const laneH = 118;
  const H = 36 + lanes.length * laneH;
  return (
    <svg className="dia dia-layers" viewBox={`0 0 ${W} ${H}`} role="img">
      {lanes.map((lane, li) => {
        const y0 = 28 + li * laneH;
        const n = lane.nodes.length;
        const x = (i: number) => 90 + (i * (W - 160)) / Math.max(n - 1, 1);
        const y = y0 + 58;
        const d = lane.nodes.map((_, i) => `${i === 0 ? "M" : "L"}${x(i)} ${y}`).join(" ");
        return (
          <g key={lane.title}>
            <text className="lane" x="8" y={y0 + 18}>
              {lane.title}
            </text>
            <path className="spine" d={d} pathLength={1} />
            {lane.nodes.map((node, i) => (
              <Dot key={node.label} {...node} x={x(i)} y={y} gold={node.id === "closed" || node.id === "intel"} dim={dim(node.id)} onEnter={setHot} onLeave={() => setHot(null)} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** Relationship / data / OS = radial mind map with drawn spokes. */
export function Radial({
  hub,
  sub,
  arms,
}: {
  hub: string;
  sub?: string;
  arms: { id: string; icon: IconName; label: string; kids?: string[] }[];
}) {
  const { setHot, dim } = useHot();
  const W = 1100;
  const H = 520;
  const cx = W / 2;
  const cy = H / 2;
  const R = 188;
  return (
    <svg className="dia dia-radial" viewBox={`0 0 ${W} ${H}`} role="img">
      {arms.map((arm, i) => {
        const a = (i / arms.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * R;
        const y = cy + Math.sin(a) * R;
        return (
          <g key={arm.label}>
            <path className="spoke" d={`M${cx} ${cy} L${x} ${y}`} pathLength={1} />
            <Dot {...arm} x={x} y={y} dim={dim(arm.id)} onEnter={setHot} onLeave={() => setHot(null)} />
            {arm.kids?.map((k, ki) => {
              const rr = R + 78;
              const aa = a + (ki - (arm.kids!.length - 1) / 2) * 0.16;
              return (
                <text key={k} className="kid" x={cx + Math.cos(aa) * rr} y={cy + Math.sin(aa) * rr} textAnchor="middle">
                  {k}
                </text>
              );
            })}
          </g>
        );
      })}
      <circle className="hubc" cx={cx} cy={cy} r="72" />
      <text className="hubt" x={cx} y={cy - 6} textAnchor="middle">
        {hub}
      </text>
      {sub ? (
        <text className="hubs" x={cx} y={cy + 16} textAnchor="middle">
          {sub}
        </text>
      ) : null}
    </svg>
  );
}

/** Hierarchy = tree. */
export function Tree({ trunk }: { trunk: DNode[] }) {
  const { setHot, dim } = useHot();
  const W = 420;
  const H = 520;
  const x = W / 2;
  const y = (i: number) => 40 + (i * (H - 80)) / Math.max(trunk.length - 1, 1);
  const d = trunk.map((_, i) => `${i === 0 ? "M" : "L"}${x} ${y(i)}`).join(" ");
  return (
    <svg className="dia dia-tree" viewBox={`0 0 ${W} ${H}`} role="img">
      <path className="spine" d={d} pathLength={1} />
      {trunk.map((node, i) => (
        <Dot key={node.label} {...node} x={x} y={y(i)} gold={i === trunk.length - 1} dim={dim(node.id)} onEnter={setHot} onLeave={() => setHot(null)} />
      ))}
    </svg>
  );
}

/** Lifecycle = circular flow. */
export function Ring({ nodes, hub }: { nodes: DNode[]; hub: string }) {
  const { setHot, dim } = useHot();
  const W = 720;
  const H = 520;
  const cx = W / 2;
  const cy = H / 2;
  const R = 175;
  const pts = nodes.map((_, i) => {
    const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(a) * R, cy + Math.sin(a) * R] as const;
  });
  const arc = `M${pts.map(([x, y]) => `${x} ${y}`).join(" L")} Z`;
  return (
    <svg className="dia dia-ring" viewBox={`0 0 ${W} ${H}`} role="img">
      <path className="spine" d={arc} pathLength={1} />
      {nodes.map((node, i) => (
        <Dot key={node.label} {...node} x={pts[i][0]} y={pts[i][1]} dim={dim(node.id)} onEnter={setHot} onLeave={() => setHot(null)} />
      ))}
      <circle className="hubc" cx={cx} cy={cy} r="54" />
      <text className="hubt" x={cx} y={cy + 4} textAnchor="middle">
        {hub}
      </text>
    </svg>
  );
}

/** Financial cycle = timeline on a spine. */
export function Timeline({ nodes }: { nodes: DNode[] }) {
  return <Flow nodes={nodes} />;
}

/** Funnel = widening/narrowing process. */
export function Funnel({ nodes }: { nodes: DNode[] }) {
  const { setHot, dim } = useHot();
  const W = 640;
  const H = 520;
  const row = H / nodes.length;
  return (
    <svg className="dia dia-funnel" viewBox={`0 0 ${W} ${H}`} role="img">
      {nodes.map((node, i) => {
        const w = W - i * 48;
        const x = (W - w) / 2;
        const y = i * row + 8;
        const h = row - 14;
        return (
          <g key={node.label} onMouseEnter={() => setHot(node.id)} onMouseLeave={() => setHot(null)} className={dim(node.id) ? "is-dim" : ""}>
            <polygon className="fun" points={`${x},${y} ${x + w},${y} ${x + w - 18},${y + h} ${x + 18},${y + h}`} />
            <foreignObject x={x} y={y} width={w} height={h}>
              <div className="fun-lab">
                <Icon name={node.icon} />
                <strong>{node.label}</strong>
                {node.note ? <span>{node.note}</span> : null}
              </div>
            </foreignObject>
          </g>
        );
      })}
    </svg>
  );
}

/** Phased journey. */
export function Phases({
  phases,
}: {
  phases: { n: string; title: string; nodes: DNode[] }[];
}) {
  const { setHot, dim } = useHot();
  const W = 1100;
  const H = 420;
  const pw = W / phases.length;
  return (
    <svg className="dia dia-phases" viewBox={`0 0 ${W} ${H}`} role="img">
      <path className="spine" d={`M40 ${H / 2} H${W - 40}`} pathLength={1} />
      {phases.map((p, pi) => {
        const x0 = pi * pw;
        return (
          <g key={p.title}>
            <text className="lane" x={x0 + 24} y="28">
              {p.n} · {p.title}
            </text>
            {p.nodes.map((node, ni) => (
              <Dot
                key={node.label}
                {...node}
                x={x0 + 50 + ni * Math.min(88, (pw - 70) / Math.max(p.nodes.length, 1))}
                y={H / 2}
                gold={node.id === "closed" || node.id === "intel"}
                dim={dim(node.id)}
                onEnter={setHot}
                onLeave={() => setHot(null)}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** Compare: broken vs connected as two paths. */
export function Compare({ left, right }: { left: DNode[]; right: DNode[] }) {
  const H = 520;
  const col = (nodes: DNode[], x: number, broken: boolean) => {
    const y = (i: number) => 40 + (i * (H - 80)) / Math.max(nodes.length - 1, 1);
    return (
      <g>
        {broken
          ? nodes.slice(0, -1).map((_, i) => (
              <text key={i} className="brk" x={x} y={(y(i) + y(i + 1)) / 2} textAnchor="middle">
                ×
              </text>
            ))
          : (
              <path className="spine" d={nodes.map((_, i) => `${i === 0 ? "M" : "L"}${x} ${y(i)}`).join(" ")} pathLength={1} />
            )}
        {nodes.map((node, i) => (
          <Dot key={node.label} {...node} x={x} y={y(i)} gold={!broken} dim={false} onEnter={() => undefined} onLeave={() => undefined} />
        ))}
      </g>
    );
  };
  return (
    <svg className="dia dia-compare" viewBox="0 0 900 520" role="img">
      <text className="lane" x="160" y="18">
        Fragmented
      </text>
      <text className="lane" x="620" y="18">
        Connected
      </text>
      {col(left, 180, true)}
      {col(right, 720, false)}
    </svg>
  );
}

/** Automation = Event → Rule → Actions as three chambers. */
export function Machine({
  event,
  rule,
  actions,
  audit,
}: {
  event: DNode;
  rule: DNode;
  actions: DNode[];
  audit: DNode;
}) {
  const { setHot, dim } = useHot();
  return (
    <svg className="dia dia-machine" viewBox="0 0 1100 480" role="img">
      <path className="spine" d="M160 80 L160 400 M160 160 L940 160 M160 280 L940 280 M160 400 L540 400" pathLength={1} />
      <text className="lane" x="40" y="70">
        Event
      </text>
      <text className="lane" x="40" y="150">
        Rule
      </text>
      <text className="lane" x="40" y="270">
        Actions
      </text>
      <text className="lane" x="40" y="390">
        Audit
      </text>
      <Dot {...event} x={160} y={80} gold dim={dim(event.id)} onEnter={setHot} onLeave={() => setHot(null)} />
      <Dot {...rule} x={160} y={160} dim={dim(rule.id)} onEnter={setHot} onLeave={() => setHot(null)} />
      {actions.map((a, i) => (
        <Dot key={a.label} {...a} x={280 + i * 180} y={280} dim={dim(a.id)} onEnter={setHot} onLeave={() => setHot(null)} />
      ))}
      <Dot {...audit} x={540} y={400} dim={dim(audit.id)} onEnter={setHot} onLeave={() => setHot(null)} />
    </svg>
  );
}

/** Bridge: left system → engine → right system */
export function Bridge({
  left,
  engine,
  right,
}: {
  left: DNode[];
  engine: DNode;
  right: DNode[];
}) {
  const { setHot, dim } = useHot();
  const H = 480;
  const ly = (i: number) => 50 + (i * (H - 100)) / Math.max(left.length - 1, 1);
  const ry = (i: number) => 50 + (i * (H - 100)) / Math.max(right.length - 1, 1);
  return (
    <svg className="dia dia-bridge" viewBox="0 0 1100 480" role="img">
      {left.map((_, i) => (
        <path key={`l${i}`} className="spoke" d={`M220 ${ly(i)} L550 240`} pathLength={1} />
      ))}
      {right.map((_, i) => (
        <path key={`r${i}`} className="spoke" d={`M550 240 L880 ${ry(i)}`} pathLength={1} />
      ))}
      {left.map((n, i) => (
        <Dot key={n.label} {...n} x={180} y={ly(i)} dim={dim(n.id)} onEnter={setHot} onLeave={() => setHot(null)} />
      ))}
      <Dot {...engine} x={550} y={240} gold dim={dim(engine.id)} onEnter={setHot} onLeave={() => setHot(null)} />
      {right.map((n, i) => (
        <Dot key={n.label} {...n} x={920} y={ry(i)} dim={dim(n.id)} onEnter={setHot} onLeave={() => setHot(null)} />
      ))}
    </svg>
  );
}

export function Frame({ children, cap }: { children: ReactNode; cap: Tx }) {
  return (
    <div className="viz">
      {children}
      <Cap c={cap} />
    </div>
  );
}
