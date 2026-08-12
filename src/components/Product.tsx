import { useState, type ReactNode } from "react";
import type { NodeId } from "../data";
import { useLang } from "../lang";

const SIDE: { id: NodeId | "hr" | "mkt"; ar: string; en: string }[] = [
  { id: "leads", ar: "الليدز", en: "Leads" },
  { id: "pipeline", ar: "البايبلاين", en: "Pipeline" },
  { id: "inventory", ar: "المخزون", en: "Inventory" },
  { id: "reservation", ar: "الحجز", en: "Reserve" },
  { id: "commission", ar: "العمولة", en: "Commission" },
  { id: "investor", ar: "المستثمر", en: "Investor" },
  { id: "finance", ar: "المالية", en: "Finance" },
  { id: "intel", ar: "الإدارة", en: "Exec" },
];

export function ProductShell({
  module,
  title,
  children,
}: {
  module: string;
  title: string;
  children: ReactNode;
}) {
  const { lang } = useLang();
  return (
    <div className="ps">
      <aside className="ps-side">
        <img src="/assets/rootk-logo.png" alt="ROOTK" />
        {SIDE.map((s) => (
          <button key={s.id} type="button" className={s.id === module ? "is-on" : ""} tabIndex={-1}>
            {lang === "ar" ? s.ar : s.en}
          </button>
        ))}
      </aside>
      <div className="ps-main">
        <div className="ps-top">
          <b>{title}</b>
          <span>{lang === "ar" ? "مستخدم: إدارة أركون" : "User: Arkon Admin"}</span>
        </div>
        <div className="ps-body">{children}</div>
      </div>
    </div>
  );
}

export function LeadUI() {
  const { lang } = useLang();
  const [row, setRow] = useState(0);
  const rows =
    lang === "ar"
      ? [
          ["سارة منصور", "حملة الساحل", "هدى", "مؤهَّل", "غدًا 11:00", "★★★★"],
          ["كريم فؤاد", "الموقع", "عمر", "تم التواصل", "اليوم 16:00", "★★★"],
          ["نورا عادل", "وسيط القاهرة", "هدى", "فرصة", "السبت معاينة", "★★★★★"],
          ["ياسر كمال", "استيراد Excel", "منى", "جديد", "—", "★★"],
        ]
      : [
          ["Sara Mansour", "North Coast campaign", "Hoda", "Qualified", "Tomorrow 11:00", "★★★★"],
          ["Karim Fouad", "Website", "Omar", "Contacted", "Today 16:00", "★★★"],
          ["Noura Adel", "Cairo broker", "Hoda", "Opportunity", "Sat visit", "★★★★★"],
          ["Yasser Kamal", "Excel import", "Mona", "Fresh", "—", "★★"],
        ];
  return (
    <ProductShell module="leads" title={lang === "ar" ? "مساحة الليدز" : "Lead workspace"}>
      <div className="filters">
        <em className="on">{lang === "ar" ? "كل المصادر" : "All sources"}</em>
        <em>{lang === "ar" ? "بدون متابعة" : "No follow-up"}</em>
        <em>{lang === "ar" ? "مكرر محتمل" : "Possible duplicate"}</em>
        <em>{lang === "ar" ? "حملة الساحل" : "North Coast"}</em>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>{lang === "ar" ? "الاسم" : "Name"}</th>
            <th>{lang === "ar" ? "المصدر" : "Source"}</th>
            <th>{lang === "ar" ? "المسؤول" : "Owner"}</th>
            <th>{lang === "ar" ? "الحالة" : "Status"}</th>
            <th>{lang === "ar" ? "المتابعة" : "Next"}</th>
            <th>{lang === "ar" ? "تقييم" : "Rating"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r[0]} className={i === row ? "is-on" : ""} onClick={() => setRow(i)}>
              <td>{r[0]}</td>
              <td>{r[1]}</td>
              <td>{r[2]}</td>
              <td>
                <span className={`pill ${i === 3 ? "mute" : i === 2 ? "brass" : "ok"}`}>{r[3]}</span>
              </td>
              <td>{r[4]}</td>
              <td>{r[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="note" style={{ marginTop: 10 }}>
        {lang === "ar"
          ? "السجل المحدد: مصدر IG / UTM-SUM26 · توزيع أقل حمل · لا تطابق مكرر على الهاتف."
          : "Selected record: source IG / UTM-SUM26 · lowest-load assignment · no phone duplicate."}
      </p>
    </ProductShell>
  );
}

export function PipelineUI() {
  const { lang } = useLang();
  const stages = lang === "ar"
    ? ["جديد", "تواصل", "مؤهَّل", "فرصة", "اجتماع", "حجز", "صفقة"]
    : ["Fresh", "Contacted", "Qualified", "Opportunity", "Meeting", "Reservation", "Done"];
  return (
    <ProductShell module="pipeline" title={lang === "ar" ? "مسار الفرص" : "Opportunity pipeline"}>
      <div className="filters">
        <em className="on">{lang === "ar" ? "فريق أ" : "Team A"}</em>
        <em>{lang === "ar" ? "معرّض للضياع" : "At risk"}</em>
        <em>{lang === "ar" ? "قيمة > 8م" : "Value > 8M"}</em>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(90px,1fr))", gap: 6, overflowX: "auto" }}>
        {stages.map((s, i) => (
          <div key={s} style={{ border: "1px solid var(--line)", borderRadius: 3, padding: 8, background: "#fffcfa", minHeight: 160 }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 800, color: "var(--mute)", marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
              <span>{s}</span>
              <span>{[42, 31, 22, 14, 9, 6, 3][i]}</span>
            </div>
            <div style={{ background: "var(--stone)", padding: 8, borderRadius: 3, fontSize: 11 }}>
              <b>A-1204</b>
              <div style={{ color: "var(--mute)" }}>11.2M · Hoda</div>
              {i === 3 ? (
                <div className="pill warn" style={{ marginTop: 6 }}>
                  {lang === "ar" ? "بلا متابعة" : "No follow-up"}
                </div>
              ) : (
                <div style={{ marginTop: 6, color: "var(--mute)" }}>{lang === "ar" ? "التالي: مكالمة" : "Next: call"}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ProductShell>
  );
}

const UNITS = [
  { code: "A-1204", area: "186m²", price: "11.2M", status: "available" as const },
  { code: "A-1205", area: "142m²", price: "8.4M", status: "reserved" as const },
  { code: "B-0302", area: "240m²", price: "16.8M", status: "available" as const },
  { code: "B-0308", area: "96m²", price: "5.1M", status: "sold" as const },
  { code: "C-1101", area: "268m²", price: "19.4M", status: "booked" as const },
  { code: "C-1104", area: "174m²", price: "10.6M", status: "available" as const },
];

export function InventoryUI() {
  const { lang } = useLang();
  const [lvl, setLvl] = useState(3);
  const [unit, setUnit] = useState(0);
  const crumbs = lang === "ar"
    ? ["أركون", "الساحل الشمالي", "مبنى A", "الدور 12"]
    : ["Arkon", "North Coast", "Building A", "Floor 12"];
  const u = UNITS[unit];
  const st = { available: "ok", reserved: "warn", booked: "brass", sold: "bad" }[u.status];
  return (
    <ProductShell module="inventory" title={lang === "ar" ? "مخزون الوحدات" : "Unit inventory"}>
      <div className="inv-drill">
        {crumbs.map((c, i) => (
          <button key={c} type="button" className={`crumb${i <= lvl ? " on" : ""}`} onClick={() => setLvl(i)}>
            {c}
          </button>
        ))}
      </div>
      <div className="units">
        {UNITS.map((x, i) => (
          <button key={x.code} type="button" className={`unit${i === unit ? " is-on" : ""}`} onClick={() => setUnit(i)}>
            <span className={`pill ${ { available: "ok", reserved: "warn", booked: "brass", sold: "bad" }[x.status] }`}>{x.status}</span>
            <strong>{x.code}</strong>
            <span style={{ fontSize: 12, color: "var(--mute)" }}>{x.area} · {x.price}</span>
          </button>
        ))}
      </div>
      <div className="panel" style={{ marginTop: 12 }}>
        <h4>{u.code}</h4>
        <div className="row"><span>{lang === "ar" ? "المساحة" : "Area"}</span><b>{u.area}</b></div>
        <div className="row"><span>{lang === "ar" ? "السعر" : "Price"}</span><b>EGP {u.price}</b></div>
        <div className="row"><span>{lang === "ar" ? "الحالة" : "Status"}</span><span className={`pill ${st}`}>{u.status}</span></div>
        <div className="row"><span>{lang === "ar" ? "خطة السداد" : "Payment plan"}</span><b>10% DP</b></div>
      </div>
    </ProductShell>
  );
}

export function MasterPlanUI() {
  const { lang } = useLang();
  const [id, setId] = useState("A");
  const b =
    id === "A"
      ? { ar: "مبنى A", en: "Building A", floors: 8, units: 64, av: 18, re: 7, so: 39 }
      : id === "B"
        ? { ar: "مبنى B", en: "Building B", floors: 10, units: 80, av: 22, re: 11, so: 47 }
        : { ar: "مبنى C", en: "Building C", floors: 6, units: 48, av: 30, re: 4, so: 14 };
  return (
    <div className="ps" style={{ gridTemplateColumns: "1fr" }}>
      <div className="ps-main">
        <div className="ps-top">
          <b>{lang === "ar" ? "مصمم المخطط — الساحل الشمالي" : "Master plan — North Coast"}</b>
          <span>{lang === "ar" ? "مرحلة 1 · إصدار v3" : "Phase 1 · version v3"}</span>
        </div>
        <div className="plan">
          <svg viewBox="0 0 640 360">
            <rect width="640" height="360" fill="#14110e" />
            <g opacity="0.16" stroke="#d4b47a" strokeWidth="0.6">
              {Array.from({ length: 16 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="360" />
              ))}
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 40} x2="640" y2={i * 40} />
              ))}
            </g>
            {[
              { id: "A", x: 90, y: 70, w: 100, h: 150, fill: "#b8955f" },
              { id: "B", x: 230, y: 90, w: 120, h: 130, fill: "#8c6e3a" },
              { id: "C", x: 390, y: 60, w: 90, h: 170, fill: "#d4b47a" },
              { id: "E", x: 200, y: 250, w: 180, h: 60, fill: "#6b645a" },
            ].map((g) => (
              <rect
                key={g.id}
                x={g.x} y={g.y} width={g.w} height={g.h} rx="3"
                fill={g.fill} opacity={id === g.id ? 1 : 0.72}
                style={{ cursor: "pointer" }}
                onClick={() => setId(g.id === "E" ? id : g.id)}
              />
            ))}
          </svg>
          <div className="plan-card">
            <h4>{lang === "ar" ? b.ar : b.en}</h4>
            <div className="row"><span>{lang === "ar" ? "أدوار" : "Floors"}</span><b>{b.floors}</b></div>
            <div className="row"><span>{lang === "ar" ? "وحدات" : "Units"}</span><b>{b.units}</b></div>
            <div className="row"><span>{lang === "ar" ? "متاح" : "Available"}</span><b>{b.av}</b></div>
            <div className="row"><span>{lang === "ar" ? "محجوز" : "Reserved"}</span><b>{b.re}</b></div>
            <div className="row"><span>{lang === "ar" ? "مباع" : "Sold"}</span><b>{b.so}</b></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MatchUI() {
  const { lang } = useLang();
  return (
    <ProductShell module="inventory" title={lang === "ar" ? "مطابقة المشتري" : "Buyer matching"}>
      <div className="match">
        <div className="match-pane">
          <h4>{lang === "ar" ? "متطلبات المشتري" : "Buyer requirements"}</h4>
          {[
            [lang === "ar" ? "الميزانية" : "Budget", "EGP 8–12M"],
            [lang === "ar" ? "المساحة" : "Area", "160–200m²"],
            [lang === "ar" ? "الموقع" : "Location", lang === "ar" ? "الساحل" : "North Coast"],
            [lang === "ar" ? "غرف" : "Bedrooms", "3"],
            [lang === "ar" ? "السداد" : "Payment", lang === "ar" ? "أقساط" : "Installments"],
          ].map(([a, b]) => (
            <div className="row" key={a}><span>{a}</span><b>{b}</b></div>
          ))}
        </div>
        <div className="match-pane">
          <h4>{lang === "ar" ? "وحدات متوافقة" : "Matched inventory"}</h4>
          {[
            ["A-1204", "92%", lang === "ar" ? "مساحة وميزانية وإطلالة حديقة" : "Area, budget, garden view"],
            ["C-1106", "87%", lang === "ar" ? "نفس المرحلة، سعر أعلى قليلًا" : "Same phase, slightly higher price"],
            ["B-0412", "81%", lang === "ar" ? "3 غرف، مساحة أقل" : "3BR, smaller area"],
          ].map(([c, s, why]) => (
            <div className="row" key={c}>
              <div>
                <b>{c}</b>
                <div style={{ fontSize: 12, color: "var(--mute)" }}>{why}</div>
              </div>
              <span className="pill brass">{s}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
            <span className="btn" style={{ padding: "7px 12px", fontSize: 10 }}>{lang === "ar" ? "إنشاء ليد" : "Create lead"}</span>
            <span className="btn btn-ghost" style={{ padding: "7px 12px", fontSize: 10 }}>{lang === "ar" ? "حجز" : "Reserve"}</span>
          </div>
        </div>
      </div>
    </ProductShell>
  );
}

export function DealUI() {
  const { lang } = useLang();
  const steps = lang === "ar"
    ? ["اختيار الوحدة", "حجز", "اعتماد", "قفل المخزون", "صفقة", "توزيع", "عقد"]
    : ["Unit", "Reservation", "Approval", "Lock", "Done deal", "Distribution", "Contract"];
  const [on, setOn] = useState(3);
  return (
    <ProductShell module="reservation" title={lang === "ar" ? "مسار الصفقة A-1204" : "Deal path A-1204"}>
      <div className="viz-flow">
        {steps.map((s, i) => (
          <button key={s} type="button" className={i <= on ? "on" : ""} onClick={() => setOn(i)} style={{ border: "1px solid rgba(184,149,95,.28)", background: i <= on ? "var(--ink)" : "transparent", color: i <= on ? "var(--champagne)" : "inherit", padding: "8px 10px", borderRadius: 3, fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700 }}>
            {s}
          </button>
        ))}
      </div>
      <div className="kpis" style={{ marginTop: 14 }}>
        <div className="kpi"><label>{lang === "ar" ? "الحالة" : "Status"}</label><b>{on >= 3 ? (lang === "ar" ? "مخزون مقفل" : "Inventory locked") : lang === "ar" ? "بانتظار الاعتماد" : "Pending approval"}</b></div>
        <div className="kpi"><label>{lang === "ar" ? "الوحدة" : "Unit"}</label><b>A-1204</b></div>
        <div className="kpi"><label>{lang === "ar" ? "القيمة" : "Value"}</label><b>11.2M</b></div>
        <div className="kpi"><label>{lang === "ar" ? "الإغلاق" : "Close"}</label><b>{on >= 4 ? (lang === "ar" ? "مغلق تجاريًا" : "Commercially closed") : "—"}</b></div>
      </div>
    </ProductShell>
  );
}

export function CommissionUI() {
  const { lang } = useLang();
  const rows = [
    { ar: "قيمة الصفقة", en: "Deal value", v: "10,000,000", w: 100 },
    { ar: "× نسبة العمولة 3٪", en: "× Commission rate 3%", v: "300,000", w: 30 },
    { ar: "عمولة إجمالية", en: "Gross commission", v: "300,000", w: 30 },
    { ar: "ملف الضريبة / الاستقطاع", en: "Tax / withholding", v: "−39,000", w: 12 },
    { ar: "صافي العمولة", en: "Net commission", v: "261,000", w: 26 },
    { ar: "توزيع: مبيعات · وسيط · TL · SM · شركة", en: "Split: sales · broker · TL · SM · company", v: "5 shares", w: 22 },
    { ar: "أقساط العمولة", en: "Commission installments", v: "3", w: 16 },
    { ar: "إيصالات محصّلة", en: "Receipts collected", v: "1 / 3", w: 8 },
  ];
  return (
    <ProductShell module="commission" title={lang === "ar" ? "محرك العمولة" : "Commission engine"}>
      <div className="water">
        {rows.map((r) => (
          <div className="water-row" key={r.en}>
            <div>
              <div>{lang === "ar" ? r.ar : r.en}</div>
              <div className="bar" style={{ marginTop: 6 }}><i style={{ width: `${r.w}%` }} /></div>
            </div>
            <b dir="ltr">{r.v}</b>
          </div>
        ))}
      </div>
    </ProductShell>
  );
}

export function InvestorUI() {
  const { lang } = useLang();
  const [tab, setTab] = useState(0);
  const tabs = lang === "ar"
    ? ["نظرة", "عقارات", "أقساط", "مدفوعات", "مستندات", "رسائل"]
    : ["Overview", "Properties", "Installments", "Payments", "Documents", "Messages"];
  return (
    <ProductShell module="investor" title={lang === "ar" ? "بوابة المستثمر" : "Investor portal"}>
      <div className="kpis">
        <div className="kpi"><label>{lang === "ar" ? "قيمة المحفظة" : "Portfolio"}</label><b>11.2M</b></div>
        <div className="kpi"><label>{lang === "ar" ? "المتبقي" : "Outstanding"}</label><b>2.4M</b></div>
        <div className="kpi"><label>{lang === "ar" ? "القسط القادم" : "Next payment"}</label><b>186K</b></div>
        <div className="kpi"><label>{lang === "ar" ? "وحدات" : "Properties"}</label><b>1</b></div>
      </div>
      <div className="filters" style={{ marginTop: 12 }}>
        {tabs.map((t, i) => (
          <em key={t} className={i === tab ? "on" : ""} onClick={() => setTab(i)} style={{ cursor: "pointer" }}>{t}</em>
        ))}
      </div>
      <p className="note">
        {lang === "ar"
          ? "بيع → حساب مستثمر → عقد → خطة سداد → أقساط → دفعات → كشف. الرسالة من خدمة العملاء تظهر في نفس البوابة."
          : "Sale → investor account → contract → payment plan → installments → payments → statement. Servicing messages live in the same portal."}
      </p>
    </ProductShell>
  );
}

export function FinanceUI() {
  const { lang } = useLang();
  return (
    <ProductShell module="finance" title={lang === "ar" ? "من الصفقة إلى الدفاتر" : "Deal to ledger"}>
      <div className="viz-flow" style={{ marginBottom: 14 }}>
        {(lang === "ar"
          ? ["صفقة مغلقة", "إيراد", "عمولة", "دفعة مستثمر", "راتب", "دفتر أستاذ", "تقارير"]
          : ["Closed deal", "Revenue", "Commission", "Investor payment", "Payroll", "Ledger", "Reports"]
        ).map((s, i) => (
          <span key={s} className={i < 4 ? "on" : ""}>{s}</span>
        ))}
      </div>
      <div className="kpis">
        <div className="kpi"><label>{lang === "ar" ? "إيراد مرحّل" : "Posted revenue"}</label><b>41.0M</b></div>
        <div className="kpi"><label>{lang === "ar" ? "مصروف" : "Expenses"}</label><b>6.2M</b></div>
        <div className="kpi"><label>{lang === "ar" ? "دخل تشغيلي" : "Operating P&L"}</label><b>34.8M</b></div>
        <div className="kpi"><label>{lang === "ar" ? "تدفّق" : "Cash flow"}</label><b>12.4M</b></div>
      </div>
    </ProductShell>
  );
}

export function MarketingUI() {
  const { lang } = useLang();
  const cols = [
    { ar: "إنفاق", en: "Spend", n: "250K", h: 40 },
    { ar: "ليدز", en: "Leads", n: "1,240", h: 88 },
    { ar: "مؤهَّل", en: "Qualified", n: "320", h: 58 },
    { ar: "فرص", en: "Opps", n: "94", h: 42 },
    { ar: "حجوزات", en: "Res.", n: "28", h: 30 },
    { ar: "صفقات", en: "Deals", n: "12", h: 22 },
    { ar: "إيراد", en: "Revenue", n: "62M", h: 70 },
    { ar: "ROI", en: "ROI", n: "34×", h: 78 },
  ];
  return (
    <ProductShell module="intel" title={lang === "ar" ? "من أين جاء الإيراد؟" : "Where did revenue come from?"}>
      <div className="funnel">
        {cols.map((c) => (
          <div key={c.en}>
            <div className="h" style={{ height: c.h }} />
            <span>{lang === "ar" ? c.ar : c.en}</span>
            <span><b>{c.n}</b></span>
          </div>
        ))}
      </div>
      <p className="note">
        {lang === "ar"
          ? "أول لمسة تنسب الحملة التي فتحت العلاقة. آخر لمسة تنسب ما أغلق الصفقة. التوزيع الخطي يقسم الإيراد على نقاط التواصل."
          : "First-touch credits the campaign that opened the relationship. Last-touch credits what closed the deal. Linear splits revenue across touchpoints."}
      </p>
    </ProductShell>
  );
}

export function ExecUI() {
  const { lang } = useLang();
  return (
    <ProductShell module="intel" title={lang === "ar" ? "مركز الذكاء التنفيذي" : "Executive intelligence center"}>
      <div className="kpis">
        <div className="kpi"><label>{lang === "ar" ? "بايبلاين" : "Pipeline"}</label><b>186M</b></div>
        <div className="kpi"><label>{lang === "ar" ? "توقّع" : "Forecast"}</label><b>62M</b></div>
        <div className="kpi"><label>{lang === "ar" ? "مغلق" : "Closed won"}</label><b>41M</b></div>
        <div className="kpi"><label>{lang === "ar" ? "تحصيل" : "Collections"}</label><b>12.4M</b></div>
      </div>
      <div className="kpis" style={{ marginTop: 8 }}>
        <div className="kpi"><label>{lang === "ar" ? "تحويل" : "Conversion"}</label><b>18.6%</b></div>
        <div className="kpi"><label>{lang === "ar" ? "صحة المحفظة" : "Portfolio health"}</label><b>82 / 100</b></div>
        <div className="kpi"><label>{lang === "ar" ? "مخاطر متابعة" : "Follow-up risk"}</label><b>7</b></div>
        <div className="kpi"><label>{lang === "ar" ? "عائد التسويق" : "Marketing ROI"}</label><b>34×</b></div>
      </div>
    </ProductShell>
  );
}

export function MockFor({ id }: { id: NodeId }) {
  switch (id) {
    case "leads":
      return <LeadUI />;
    case "pipeline":
      return <PipelineUI />;
    case "inventory":
      return <InventoryUI />;
    case "reservation":
    case "closed":
    case "contract":
      return <DealUI />;
    case "commission":
      return <CommissionUI />;
    case "investor":
      return <InvestorUI />;
    case "finance":
      return <FinanceUI />;
    default:
      return <ExecUI />;
  }
}
