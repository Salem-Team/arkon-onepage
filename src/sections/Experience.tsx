import { useState } from "react";
import {
  CommissionUI,
  DealUI,
  ExecUI,
  FinanceUI,
  InventoryUI,
  InvestorUI,
  LeadUI,
  MarketingUI,
  MasterPlanUI,
  MatchUI,
  MockFor,
  PipelineUI,
  ProductShell,
} from "../components/Product";
import { Reveal, SectionHeader } from "../components/ui";
import { ALERTS, EXPLORER, REPORTS, ROLES } from "../content";
import { BEFORE, DEMO, ENGINE, HERO_NODES, WITH, type NodeId } from "../data";
import { useLang } from "../lang";

export function Hero() {
  const { t, lang } = useLang();
  const [id, setId] = useState<NodeId>("leads");
  const node = HERO_NODES.find((n) => n.id === id) ?? HERO_NODES[0];
  return (
    <section className="band band--dark" id="hero">
      <div className="wrap hero-grid">
        <Reveal>
          <p className="kicker">ARKON × ROOTK SYSTEMS</p>
          <h1 className="display">
            {lang === "ar" ? (
              <>
                نظام التشغيل
                <br />
                <span className="gold">لمبيعات العقارات.</span>
              </>
            ) : (
              <>
                THE OPERATING SYSTEM
                <br />
                <span className="gold">FOR REAL ESTATE SALES.</span>
              </>
            )}
          </h1>
          <p className="lede">
            {lang === "ar"
              ? "من أول ليد حتى الحجز وإغلاق الصفقة والعقد والعمولة والتحصيل وخدمة المستثمر — ROOTK يربط التشغيل التجاري كله في نظام واحد."
              : "From the first lead to reservation, closed deal, contract, commission, collections and investor servicing — ROOTK connects the entire commercial operation in one system."}
          </p>
          <div style={{ marginTop: 22, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn" href="#engine">{lang === "ar" ? "كيف يعمل" : "See how it works"}</a>
            <a className="btn btn-ghost" href="#offer">{lang === "ar" ? "الباقات والاستثمار" : "Packages & investment"}</a>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="graph">
            <div className="graph-nodes">
              {HERO_NODES.map((n, i) => (
                <button key={n.id} type="button" className={`gnode${id === n.id ? " is-on" : ""}`} onClick={() => setId(n.id)}>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  {t(n.t)}
                </button>
              ))}
            </div>
          </div>
          <div className="side" style={{ marginTop: 10 }}>
            <p className="kicker">{lang === "ar" ? "ماذا يتحكم ROOTK" : "What ROOTK controls"}</p>
            <h3>{t(node.t)}</h3>
            <p>{t(node.d)}</p>
            <ul className="caps">
              {node.caps.map((c) => (
                <li key={c.en}>{t(c)}</li>
              ))}
            </ul>
            <div className="outcome">{t(node.value)}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Compare() {
  const { t, lang } = useLang();
  return (
    <section className="band band--ink" id="overview">
      <div className="wrap">
        <SectionHeader
          kicker={{ ar: "التحول", en: "The shift" }}
          title={{ ar: "من أدوات متفرقة إلى محرك تجاري واحد.", en: "From scattered tools to one commercial engine." }}
          lede={{
            ar: "لا نقلل من طريقة العمل الحالية. نوضح كيف تصبح الرؤية واحدة عندما تتصل الخطوات.",
            en: "This does not dismiss the current way of working. It shows how visibility becomes one when the steps connect.",
          }}
        />
        <div className="compare">
          <Reveal className="col">
            <h3>{lang === "ar" ? "قبل ROOTK" : "Before ROOTK"}</h3>
            <ul>{BEFORE.map((x) => <li key={x.en}>{t(x)}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.08} className="col col--on">
            <h3>{lang === "ar" ? "مع ROOTK" : "With ROOTK"}</h3>
            <ul>{WITH.map((x) => <li key={x.en}>{t(x)}</li>)}</ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Engine() {
  const { t, lang } = useLang();
  const [i, setI] = useState(0);
  const step = ENGINE[i];
  return (
    <section className="band band--dark" id="engine">
      <div className="wrap">
        <SectionHeader
          kicker={{ ar: "المحرك التجاري", en: "The commercial engine" }}
          title={{ ar: "كيف تُدار دورة العقار — خطوة بخطوة.", en: "How the real-estate cycle is run — step by step." }}
          lede={{
            ar: "اختر خطوة. سترى المشكلة، ما يفعله ROOTK، الواجهة، وما الذي يتغير للإدارة.",
            en: "Select a step. You will see the problem, what ROOTK does, the interface, and what changes for management.",
          }}
        />
        <div className="studio">
          <div className="rail">
            {ENGINE.map((s, idx) => (
              <button key={s.id} type="button" className={`rstep${i === idx ? " is-on" : ""}`} onClick={() => setI(idx)}>
                <span className="n">{s.n}</span>
                <span>{t(s.t)}</span>
              </button>
            ))}
          </div>
          <div className="studio-copy">
            <h3>{t(step.t)}</h3>
            <p><b>{lang === "ar" ? "المشكلة. " : "The problem. "}</b>{t(step.problem)}</p>
            <p><b>{lang === "ar" ? "كيف يعمل. " : "How it works. "}</b>{t(step.how)}</p>
            <MockFor id={step.mock} />
            <p className="outcome" style={{ marginTop: 14 }}>{t(step.outcome)}</p>
          </div>
          <div className="panel">
            <h4>{lang === "ar" ? "ماذا يتحكم ROOTK" : "What ROOTK controls"}</h4>
            <ul className="caps">
              {step.controls.map((c) => (
                <li key={c.en}>{t(c)}</li>
              ))}
            </ul>
            <h4 style={{ marginTop: 16 }}>{lang === "ar" ? "الأثر على الإدارة" : "Business outcome"}</h4>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "inherit" }}>{t(step.outcome)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductDeep() {
  const { lang } = useLang();
  return (
    <section className="band band--paper" id="product">
      <div className="wrap">
        <SectionHeader
          kicker={{ ar: "المنتج", en: "The product" }}
          title={{ ar: "التقاط. توزيع. تأهيل. متابعة. تحويل.", en: "Capture. Assign. Qualify. Follow Up. Convert." }}
          lede={{
            ar: "ROOTK يجمع كل استفسار أيًا كان مصدره في مساحة عمل واحدة، ثم يمرّره في مسار لا يختفي بعد أول مكالمة.",
            en: "ROOTK centralizes every inquiry regardless of source, then moves it through a path that does not vanish after the first call.",
          }}
        />
        <Reveal>
          <div className="viz-flow" style={{ marginBottom: 16 }}>
            {(lang === "ar"
              ? ["موقع", "حملات", "API", "استيراد", "يدوي"]
              : ["Website", "Campaigns", "API", "Import", "Manual"]
            ).map((s) => <span key={s}>{s}</span>)}
            <span className="on">{lang === "ar" ? "سجل ليد" : "Lead record"}</span>
            {(lang === "ar"
              ? ["تكرار", "إسناد", "توزيع", "تأهيل", "متابعة", "فرصة"]
              : ["Duplicate", "Attribution", "Assign", "Qualify", "Follow-up", "Opportunity"]
            ).map((s) => <span key={s}>{s}</span>)}
          </div>
          <LeadUI />
        </Reveal>
        <div className="groups">
          {[
            { h: { ar: "التقاط", en: "CAPTURE" }, i: [{ ar: "موقع", en: "Website" }, { ar: "API", en: "API" }, { ar: "استيراد", en: "Import" }, { ar: "يدوي", en: "Manual" }] },
            { h: { ar: "سيطرة", en: "CONTROL" }, i: [{ ar: "توزيع", en: "Assignment" }, { ar: "ملكية", en: "Ownership" }, { ar: "تكرار", en: "Duplicates" }, { ar: "ظهور", en: "Visibility" }] },
            { h: { ar: "عمل", en: "WORK" }, i: [{ ar: "أنشطة", en: "Activities" }, { ar: "متابعة", en: "Follow-ups" }, { ar: "مهام", en: "Tasks" }, { ar: "ملاحظات", en: "Feedback" }] },
            { h: { ar: "قياس", en: "MEASURE" }, i: [{ ar: "تحويل", en: "Conversion" }, { ar: "قمع", en: "Funnel" }, { ar: "حمل الفريق", en: "Workload" }, { ar: "ليدز متأخرة", en: "Delayed leads" }] },
          ].map((g) => (
            <div className="group" key={g.h.en}>
              <h5>{lang === "ar" ? g.h.ar : g.h.en}</h5>
              <ul>{g.i.map((x) => <li key={x.en}>{lang === "ar" ? x.ar : x.en}</li>)}</ul>
            </div>
          ))}
        </div>

        <div style={{ height: 64 }} />
        <SectionHeader
          kicker={{ ar: "البايبلاين", en: "Pipeline" }}
          title={{ ar: "لكل فرصة خطوة تالية.", en: "Every Opportunity Has a Next Step." }}
          lede={{
            ar: "الانتقال بين المراحل مضبوط ومسجّل. إذا غابت المتابعة تظهر الفرصة كمعرّضة للضياع — دون أن يتصرف النظام وحده في السجلات.",
            en: "Stage moves are controlled and recorded. If follow-up is missing, the opportunity surfaces as at risk — the system does not act on records by itself.",
          }}
        />
        <Reveal><PipelineUI /></Reveal>

        <div style={{ height: 64 }} />
        <SectionHeader
          kicker={{ ar: "المخزون", en: "Inventory" }}
          title={{ ar: "المبيعات والمخزون من نفس الحقيقة.", en: "Sales and Inventory Operate From the Same Source of Truth." }}
        />
        <Reveal><InventoryUI /></Reveal>
        <p className="note">
          {lang === "ar"
            ? "متاح: تُعرض للبيع. محجوز: اعتماد وقفل. محجوز نهائي/Booked: التزام أقوى. مباع: خرجت من العرض."
            : "Available: offered for sale. Reserved: approved and locked. Booked: stronger commitment. Sold: no longer offered."}
        </p>

        <div style={{ height: 64 }} />
        <SectionHeader
          kicker={{ ar: "المخطط", en: "Master plan" }}
          title={{ ar: "أرِ المشروع قبل أن تبيعه.", en: "See the Project Before You Sell It." }}
          lede={{
            ar: "تخطيط للمباني والمراحل والطبقات — ليس خريطة GIS لكل وحدة. من الصورة إلى التوافر دون مغادرة المسار التجاري.",
            en: "A layout of buildings, phases and layers — not per-unit GIS. From visualization to availability without leaving the commercial path.",
          }}
        />
        <Reveal><MasterPlanUI /></Reveal>

        <div style={{ height: 64 }} />
        <SectionHeader
          kicker={{ ar: "المطابقة", en: "Matching" }}
          title={{ ar: "مساعد مبيعات: المتطلبات مقابل المخزون الحي.", en: "A sales assistant: requirements versus live inventory." }}
        />
        <Reveal><MatchUI /></Reveal>

        <div style={{ height: 64 }} />
        <SectionHeader
          kicker={{ ar: "الحجز والإغلاق", en: "Reservation → close" }}
          title={{ ar: "القرار التجاري يحمي المخزون ويغذي المالية.", en: "The commercial decision protects inventory and feeds finance." }}
        />
        <Reveal><DealUI /></Reveal>

        <div style={{ height: 64 }} />
        <SectionHeader
          kicker={{ ar: "العمولة", en: "Commission" }}
          title={{ ar: "من قيمة الصفقة إلى كل جنيه عمولة — محسوب ومتتبَّع.", en: "From Deal Value to Every Commission Pound — Calculated and Tracked." }}
        />
        <Reveal><CommissionUI /></Reveal>
      </div>
    </section>
  );
}

export function Money() {
  return (
    <section className="band band--alt">
      <div className="wrap">
        <SectionHeader
          kicker={{ ar: "بعد البيع", en: "After the sale" }}
          title={{ ar: "العلاقة تستمر داخل ROOTK.", en: "The relationship continues inside ROOTK." }}
        />
        <Reveal><InvestorUI /></Reveal>
        <div style={{ height: 48 }} />
        <SectionHeader
          kicker={{ ar: "المالية", en: "Finance" }}
          title={{ ar: "الصفقة تتحول إلى مال ظاهر في الدفاتر.", en: "The deal becomes money visible in the books." }}
          lede={{
            ar: "قيود مزدوجة وتقارير دخل وميزانية وتدفّق. لا نَدّعي مطابقة كشوف بنكية.",
            en: "Double-entry journals and P&L, balance sheet and cash flow. Bank-statement matching is not claimed.",
          }}
        />
        <Reveal><FinanceUI /></Reveal>
        <div style={{ height: 48 }} />
        <SectionHeader
          kicker={{ ar: "التسويق", en: "Marketing" }}
          title={{ ar: "من أين جاء إيرادنا؟", en: "Where did our revenue come from?" }}
        />
        <Reveal><MarketingUI /></Reveal>
      </div>
    </section>
  );
}

export function Org() {
  const { lang } = useLang();
  return (
    <section className="band band--paper">
      <div className="wrap">
        <SectionHeader
          kicker={{ ar: "الأداء", en: "Performance" }}
          title={{ ar: "التارجت نظام تشغيل يومي — لا لوحة ألعاب.", en: "Targets are a daily operating system — not a game board." }}
        />
        <Reveal>
          <ProductShell module="intel" title={lang === "ar" ? "مركز أداء المبيعات" : "Sales performance center"}>
            <div className="kpis">
              <div className="kpi"><label>{lang === "ar" ? "المندوب" : "Rep"}</label><b>{lang === "ar" ? "أحمد" : "Ahmed"}</b></div>
              <div className="kpi"><label>{lang === "ar" ? "التارجت" : "Target"}</label><b>5.0M</b></div>
              <div className="kpi"><label>{lang === "ar" ? "المحقق" : "Achieved"}</label><b>3.8M</b></div>
              <div className="kpi"><label>{lang === "ar" ? "الإنجاز" : "Attainment"}</label><b>76%</b></div>
            </div>
            <div className="kpis" style={{ marginTop: 8 }}>
              <div className="kpi"><label>{lang === "ar" ? "أنشطة" : "Activities"}</label><b>82%</b></div>
              <div className="kpi"><label>{lang === "ar" ? "اجتماعات" : "Meetings"}</label><b>91%</b></div>
              <div className="kpi"><label>{lang === "ar" ? "تحويل" : "Conversions"}</label><b>68%</b></div>
              <div className="kpi"><label>XP / Level</label><b>12,480 · 7</b></div>
            </div>
          </ProductShell>
        </Reveal>
        <div style={{ height: 48 }} />
        <SectionHeader
          kicker={{ ar: "الموارد", en: "HR & payroll" }}
          title={{ ar: "من تسجيل الحضور إلى الراتب والقيد.", en: "From check-in to salary and the ledger." }}
        />
        <Reveal>
          <div className="viz-flow">
            {(lang === "ar"
              ? ["حضور", "سياسات", "إجازة", "راتب", "خصم", "تسوية", "كشف", "دفع", "قيد"]
              : ["Check-in", "Policies", "Leave", "Salary", "Deduction", "Adjust", "Slip", "Pay", "GL"]
            ).map((s) => <span key={s}>{s}</span>)}
          </div>
        </Reveal>
        <div style={{ height: 48 }} />
        <SectionHeader
          kicker={{ ar: "الوسطاء", en: "Brokers" }}
          title={{ ar: "شبكة الوسطاء تُدار كقناة أداء.", en: "The broker network is managed as a performance channel." }}
        />
        <Reveal>
          <ProductShell module="leads" title={lang === "ar" ? "شبكة الوسطاء" : "Broker network"}>
            <table className="table">
              <thead>
                <tr>
                  {(lang === "ar" ? ["الوسيط", "ليدز", "تحويل", "صفقات", "عمولة", "SLA"] : ["Broker", "Leads", "Conv.", "Deals", "Commission", "SLA"]).map((h) => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[["Cairo Partners", "86", "19%", "7", "420K", "96%"], ["Delta Homes", "54", "14%", "4", "210K", "88%"]].map((r) => (
                  <tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </ProductShell>
        </Reveal>
        <div style={{ height: 48 }} />
        <SectionHeader
          kicker={{ ar: "المخاطر", en: "Project risk" }}
          title={{ ar: "الإدارة تقيّم جودة المشروع بجانب أداء البيع.", en: "Management evaluates project quality alongside sales performance." }}
        />
        <Reveal>
          <div className="groups">
            {[
              { c: "ok", t: "LOW", p: lang === "ar" ? "الساحل — مرحلة 1" : "North Coast P1", d: lang === "ar" ? "تقدّم منتظم · تصنيف A" : "Steady progress · Class A" },
              { c: "warn", t: "MEDIUM", p: lang === "ar" ? "إيست بارك" : "East Park", d: lang === "ar" ? "تأخير توريد · مراقبة" : "Supply delay · watch" },
              { c: "bad", t: "HIGH", p: lang === "ar" ? "النيل" : "Nile", d: lang === "ar" ? "شدة مرتفعة · تجاوز موثّق" : "High severity · documented override" },
            ].map((x) => (
              <div className="group" key={x.t}>
                <h5>{x.t}</h5>
                <li style={{ fontWeight: 700 }}>{x.p}</li>
                <li>{x.d}</li>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Roles() {
  const { t } = useLang();
  const [id, setId] = useState("ceo");
  const role = ROLES.find((r) => r.id === id) ?? ROLES[0];
  return (
    <section className="band band--ink" id="roles">
      <div className="wrap">
        <SectionHeader
          kicker={{ ar: "كل دور", en: "Every role" }}
          title={{ ar: "كل دور يرى ما يهمّه.", en: "Every Role Sees What Matters." }}
          lede={{
            ar: "اختر دورًا. تتغير المؤشرات. نفس النظام، عدسة مختلفة.",
            en: "Select a role. The metrics change. Same system, different lens.",
          }}
        />
        <div className="roles">
          {ROLES.map((r) => (
            <button key={r.id} type="button" className={id === r.id ? "is-on" : ""} onClick={() => setId(r.id)}>
              {t(r.t)}
            </button>
          ))}
        </div>
        <p className="lede" style={{ marginTop: 0 }}>{t(role.sees)}</p>
        <div className="kpis" style={{ marginTop: 18 }}>
          {role.kpis.map((k) => (
            <div className="kpi" key={k.v} style={{ background: "rgba(255,252,250,0.04)", borderColor: "rgba(184,149,95,0.22)" }}>
              <label>{t(k.l)}</label>
              <b style={{ color: "var(--champagne)" }}>{k.v}</b>
            </div>
          ))}
        </div>
        <div className="viz-flow" style={{ marginTop: 16 }}>
          {role.dash.map((d) => <span key={d.en} className="on">{t(d)}</span>)}
        </div>
      </div>
    </section>
  );
}

export function Intelligence() {
  const { t, lang } = useLang();
  const [rep, setRep] = useState(0);
  return (
    <section className="band band--dark" id="intelligence">
      <div className="wrap">
        <SectionHeader
          kicker={{ ar: "الإدارة", en: "Executive" }}
          title={{ ar: "كل ما تحتاجه الإدارة التنفيذية — على شاشة واحدة.", en: "Everything the Executive Team Needs to Know — On One Screen." }}
        />
        <Reveal><ExecUI /></Reveal>
        <div style={{ marginTop: 20 }}>
          {ALERTS.map((a) => (
            <div className="alert" key={a.en}>{t(a)}</div>
          ))}
        </div>
        <p className="note">{lang === "ar" ? "تنبيهات استشارية لدعم القرار. النظام لا يغيّر السجلات من تلقاء نفسه." : "Advisory alerts for decision support. The system does not change records on its own."}</p>

        <div style={{ height: 56 }} />
        <SectionHeader
          kicker={{ ar: "التقارير", en: "Reporting" }}
          title={{ ar: "نظام تقارير لا قائمة من سبعين تقريرًا.", en: "A reporting ecosystem — not a list of seventy reports." }}
        />
        <div className="roles">
          {REPORTS.map((r, i) => (
            <button key={r.id} type="button" className={i === rep ? "is-on" : ""} onClick={() => setRep(i)}>
              {t(r.t)}
            </button>
          ))}
        </div>
        <div className="panel">
          <h4>{lang === "ar" ? "معاينة" : "Preview"}</h4>
          <p>{t(REPORTS[rep].sample)}</p>
          <div className="viz-flow" style={{ marginTop: 12 }}>
            <span>{lang === "ar" ? "تصفية" : "Filter"}</span>
            <span>{lang === "ar" ? "تحليل" : "Analyze"}</span>
            <span className="on">PDF</span>
            <span className="on">Excel</span>
            <span className="on">CSV</span>
          </div>
        </div>

        <div style={{ height: 56 }} />
        <SectionHeader
          kicker={{ ar: "الأتمتة", en: "Automation" }}
          title={{ ar: "أتمتة العمل مع الإبقاء على السيطرة.", en: "Automate the work. Keep control." }}
        />
        <div className="auto">
          <div className="box"><em>WHEN</em><b>{lang === "ar" ? "إنشاء ليد" : "Lead created"}</b></div>
          <div className="box"><em>IF</em><b>{lang === "ar" ? "المصدر = حملة" : "Source = campaign"}</b></div>
          <div className="box"><em>THEN</em><b>{lang === "ar" ? "تعيين + مهمة + إشعار" : "Assign + task + notify"}</b></div>
        </div>
        <p className="note">{lang === "ar" ? "تجربة تشغيل وسجل. ليست أتمتة مطلقة دون مراجعة." : "Dry run and history. Not unlimited autonomous automation."}</p>

        <div style={{ height: 56 }} />
        <SectionHeader
          kicker={{ ar: "الموبايل", en: "Mobile" }}
          title={{ ar: "نفس بيئة التشغيل على جهاز المندوب.", en: "The same operating environment on the salesperson’s device." }}
          lede={{ ar: "غلاف أصلي فوق النظام الحي. ليس CRM يعمل بالكامل دون اتصال.", en: "A native shell over the live CRM. Not a fully offline-first CRM." }}
        />
        <div className="mobile-row">
          {(lang === "ar" ? ["ليد", "بايبلاين", "وحدة", "مهام", "إشعار", "دردشة"] : ["Lead", "Pipeline", "Unit", "Tasks", "Alerts", "Chat"]).map((s) => (
            <div className="phone" key={s}>
              <h5>{s}</h5>
              <ul>
                <li>{lang === "ar" ? "سجل حي" : "Live record"}</li>
                <li>{lang === "ar" ? "إشعار دفع" : "Push"}</li>
                <li>{lang === "ar" ? "بصمة" : "Biometric"}</li>
              </ul>
            </div>
          ))}
        </div>

        <div style={{ height: 56 }} />
        <SectionHeader
          kicker={{ ar: "الحوكمة", en: "Security" }}
          title={{ ar: "مركز السيطرة على الوصول.", en: "Access control center." }}
        />
        <div className="sec-nums">
          <div className="stat"><b>35</b><span>{lang === "ar" ? "دورًا — كل شخص يرى نطاق عمله." : "Roles — each person sees their scope."}</span></div>
          <div className="stat"><b>64</b><span>{lang === "ar" ? "مورد صلاحيات يغطي المبيعات حتى المالية." : "Permission resources from sales to finance."}</span></div>
          <div className="stat"><b>364</b><span>{lang === "ar" ? "صلاحية دقيقة، مع MFA وسجلات تدقيق وعزل بوابة المستثمر." : "Fine permissions, with MFA, audit logs and investor isolation."}</span></div>
        </div>
      </div>
    </section>
  );
}

export function Explorer() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState<string | null>("sales");
  return (
    <section className="band band--paper" id="explore">
      <div className="wrap">
        <SectionHeader
          kicker={{ ar: "خريطة القدرات", en: "Capability map" }}
          title={{ ar: "استكشف كل القدرات — بشرح لا بأسماء فقط.", en: "Explore all capabilities — explained, not named." }}
        />
        <div className="explore">
          {EXPLORER.map((cat) => (
            <div key={cat.id}>
              <button type="button" className="ex-cat" onClick={() => setOpen(open === cat.id ? null : cat.id)}>
                {t(cat.t)} {open === cat.id ? "–" : "+"}
              </button>
              {open === cat.id ? (
                <div className="ex-body">
                  {cat.cards.map((c) => (
                    <article className="fcard" key={c.title.en}>
                      <h4>{t(c.title)}</h4>
                      <p>{t(c.one)}</p>
                      <div className="fmeta">
                        <div>
                          <b>{lang === "ar" ? "كيف يعمل" : "How it works"}</b>
                          {c.how.map((h) => <div key={h.en}>{t(h)}</div>)}
                        </div>
                        <div>
                          <b>{lang === "ar" ? "لماذا يهم" : "Why it matters"}</b>
                          <div>{t(c.why)}</div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { OfferDeck as Offer } from "../components/OfferDeck";

export function Close() {
  const { lang } = useLang();
  const bits = lang === "ar"
    ? ["ليدز", "مبيعات", "مخزون", "صفقات", "مالية", "مستثمرون", "تسويق", "أفراد", "ذكاء"]
    : ["Leads", "Sales", "Inventory", "Deals", "Finance", "Investors", "Marketing", "People", "Intelligence"];
  return (
    <section className="band band--ink">
      <div className="wrap close">
        <p className="kicker">ARKON × ROOTK SYSTEMS</p>
        <h2 className="display">{lang === "ar" ? "محرك تجاري واحد متصل." : "ONE CONNECTED COMMERCIAL ENGINE."}</h2>
        <div className="plus">
          {bits.map((b) => <span key={b}>{b}</span>)}
        </div>
        <p className="lede" style={{ fontFamily: "var(--font-ui)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          = ROOTK CRM
        </p>
        <p className="lede">
          {lang === "ar"
            ? "مصمم ليمنح المؤسسات العقارية رؤية تشغيلية كاملة — من أول استفسار إلى الصفقة المغلقة وما بعدها."
            : "Designed to give real-estate organizations complete operational visibility — from the first inquiry to the closed deal and beyond."}
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <a className="btn" href={DEMO.url} target="_blank" rel="noreferrer">{lang === "ar" ? "استكشف ROOTK CRM" : "Explore ROOTK CRM"}</a>
          <a className="btn btn-ghost" href="#explore">{lang === "ar" ? "خريطة القدرات الكاملة" : "View the complete capability map"}</a>
        </div>
        <div className="demo">
          <div>
            <p className="kicker">{lang === "ar" ? "تجربة حية" : "Live demo"}</p>
            <a className="btn" href={DEMO.url} target="_blank" rel="noreferrer">{DEMO.host}</a>
          </div>
          <div className="creds">
            <div><label>{lang === "ar" ? "البريد" : "Email"}</label><strong dir="ltr">{DEMO.email}</strong></div>
            <div><label>{lang === "ar" ? "كلمة المرور" : "Password"}</label><strong dir="ltr">{DEMO.password}</strong></div>
          </div>
        </div>
        <footer className="foot">
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <img src="/assets/arkon-logo.png" alt="Arkon" />
            <span>×</span>
            <img src="/assets/rootk-logo.png" alt="ROOTK" />
          </div>
          <span>Confidential · Arkon Real Estate Development</span>
        </footer>
      </div>
    </section>
  );
}
