import { Arrow, Cap, Domain, H3, Note, Tile } from "./ui";
import { Icon } from "./icons";
import { useLang, type Tx } from "../lang";
import type { ContentPage } from "./types";

const tx = (ar: string, en: string): Tx => ({ ar, en });

export function PageView({ page }: { page: ContentPage }) {
  const { lang, t } = useLang();

  switch (page.layout) {
    case "problem":
      return (
        <div className="pg pg-problem">
          <div className="prob-board">
            <section className="prob-pane prob-before">
              <header className="prob-head">
                <span className="prob-badge is-bad">{lang === "ar" ? "قبل" : "Before"}</span>
                <H3 c={tx("شغل متفرّق", "Scattered work")} />
                <p className="prob-lead">
                  {lang === "ar"
                    ? "كل قسم شايف جزء — والملفات مش بتلتقي."
                    : "Each department sees a fragment — the files never meet."}
                </p>
              </header>
              <div className="prob-scatter" aria-hidden={false}>
                {(
                  [
                    ["megaphone", "Marketing", "التسويق"],
                    ["lead", "Leads", "الليدز"],
                    ["handshake", "Sales", "السيلز"],
                    ["building", "Inventory", "المخزون"],
                    ["ledger", "Finance", "المالية"],
                    ["people", "HR", "الموارد"],
                    ["chart", "Reports", "التقارير"],
                  ] as const
                ).map(([icon, en, ar], i) => (
                  <span key={en} className={`prob-chip is-scatter s${i + 1}`}>
                    <span className="tile-ico">
                      <Icon name={icon} />
                    </span>
                    <b>{lang === "ar" ? ar : en}</b>
                    <i dir="ltr">{lang === "ar" ? en : ar}</i>
                  </span>
                ))}
              </div>
            </section>

            <div className="prob-bridge" aria-hidden="true">
              <span className="prob-bridge-line" />
              <em dir="ltr">ROOTK</em>
              <span className="prob-bridge-line" />
            </div>

            <section className="prob-pane prob-after">
              <header className="prob-head">
                <span className="prob-badge is-good">{lang === "ar" ? "بعد ROOTK" : "With ROOTK"}</span>
                <H3 c={tx("مسار واحد مترابط", "One connected path")} />
                <p className="prob-lead">
                  {lang === "ar"
                    ? "من الحملة لإتمام البيع… لنفس النظام."
                    : "From campaign to Closed Won — inside one system."}
                </p>
              </header>
              <ol className="prob-spine">
                {(
                  [
                    ["megaphone", "Marketing", "الحملة"],
                    ["lead", "Leads", "الليد"],
                    ["handshake", "Sales", "السيلز"],
                    ["building", "Inventory", "المخزون"],
                    ["lock", "Reservation", "الحجز"],
                    ["won", "Closed Won", "إتمام البيع"],
                    ["ledger", "Finance", "المالية"],
                    ["investor", "Investor", "المستثمر"],
                    ["radar", "Management", "الإدارة"],
                  ] as const
                ).map(([icon, en, ar], i) => (
                  <li key={en} className={en === "Closed Won" ? "is-hot" : undefined}>
                    <em>{String(i + 1).padStart(2, "0")}</em>
                    <span className="tile-ico">
                      <Icon name={icon} />
                    </span>
                    <div>
                      <b>{lang === "ar" ? ar : en}</b>
                      <i dir="ltr">{lang === "ar" ? en : ar}</i>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
          <Cap c={page.value!} />
        </div>
      );

    case "mind":
      return (
        <div className="pg pg-arch">
          <Domain
            icon="handshake"
            title={tx("التجاري", "Commercial")}
            items={[
              tx("الليدز", "Leads"),
              tx("السيلز", "Sales"),
              tx("المطابقة", "Matching"),
              tx("الحجز", "Reservation"),
              tx("العقد", "Contract"),
            ]}
          />
          <Domain
            icon="building"
            title={tx("التشغيل", "Operations")}
            items={[
              tx("المشاريع", "Projects"),
              tx("المخزون", "Inventory"),
              tx("الوحدة", "Unit"),
              tx("المخاطر", "Risk"),
            ]}
          />
          <Domain
            icon="megaphone"
            title={tx("التسويق", "Marketing")}
            items={[
              tx("الحملات", "Campaigns"),
              tx("المصدر", "Source"),
              tx("تكلفة الليد", "CPL"),
              tx("العائد", "ROI"),
            ]}
          />
          <div className="core core-os">
            <span className="core-os-glow" aria-hidden="true" />
            <img className="core-os-mark" src="/assets/rootk-mark-light.svg" alt="" />
            <div className="core-os-copy">
              <b dir="ltr">ROOTK</b>
              <em className="core-os-erp" dir="ltr">ERP</em>
              <Note c={tx("نظام تشغيل الشركة", "The company’s operating system")} />
            </div>
          </div>
          <Domain
            icon="ledger"
            title={tx("المالية", "Finance")}
            items={[
              tx("خطة السداد", "Payment plan"),
              tx("التحصيل", "Collections"),
              tx("العمولات", "Commissions"),
              tx("الحسابات", "Accounting"),
            ]}
          />
          <Domain
            icon="people"
            title={tx("الأفراد", "People")}
            items={[
              tx("الموارد البشرية", "HR"),
              tx("التارجت", "Targets"),
              tx("الأداء", "Performance"),
              tx("تحفيز الفريق", "Team motivation"),
            ]}
          />
          <Domain
            icon="chart"
            title={tx("الإدارة", "Management")}
            items={[
              tx("التقارير", "Reports"),
              tx("تحليل الأداء", "Performance insight"),
              tx("القرار", "Decision"),
            ]}
          />
          <Cap c={tx("كل أقسام الشركة على نظام واحد — مش كل قسم على برنامج لوحده.", "Every department on one system — not each on its own product.")} />
        </div>
      );

    case "layers":
      return (
        <div className="pg pg-engines">
          {(page.layers ?? []).map((band, bi) => {
            const rows = bi === 0 ? [band.steps.slice(0, 4), band.steps.slice(4)] : [band.steps];
            return (
              <section key={band.title.en} className={`eng-band eng-${bi}`}>
                {bi > 0 ? (
                  <p className="eng-bridge">
                    {lang === "ar" ? `↓ يسلّم لـ ${t(band.title)}` : `↓ hands off to ${t(band.title)}`}
                  </p>
                ) : null}
                <header className="eng-h">
                  <em>{String(bi + 1).padStart(2, "0")}</em>
                  <H3 c={band.title} />
                </header>
                {rows.map((row, ri) => (
                  <div key={`${band.title.en}-r${ri}`} className="eng-row-wrap">
                    {ri > 0 ? (
                      <p className="eng-continue">{lang === "ar" ? "↓ يكمل" : "↓ continues"}</p>
                    ) : null}
                    <ol className="eng-flow" style={{ ["--eng-cols" as string]: String(row.length) }}>
                      {row.map((s, i) => {
                        const n = String(ri * 4 + i + 1).padStart(2, "0");
                        return (
                          <li key={`${s.title.en}-${n}`} className={s.icon === "won" ? "is-hot" : undefined}>
                            <em>{n}</em>
                            <span className="tile-ico">
                              <Icon name={s.icon} />
                            </span>
                            <b>{t(s.title)}</b>
                            {i < row.length - 1 ? (
                              <span className="eng-arr" aria-hidden="true">
                                {lang === "ar" ? "←" : "→"}
                              </span>
                            ) : null}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                ))}
              </section>
            );
          })}
          <Cap c={page.value!} />
        </div>
      );

    case "roadmap": {
      const all = page.steps ?? [];
      const bands = [
        { key: "sale", title: tx("مسار البيع", "Sales path"), steps: all.slice(0, 11) },
        { key: "after", title: tx("بعد إتمام البيع", "After closed won"), steps: all.slice(11) },
      ];
      return (
        <div className="pg pg-track">
          <p className="track-hint">
            {lang === "ar" ? "١٦ خطوة متسلسلة — اقرأ من 01 إلى 16" : "16 sequential steps — read from 01 to 16"}
          </p>
          <div className="track-cols">
            {bands.map((band) => (
              <section key={band.key} className={`track-col track-${band.key}`}>
                <header className="track-h">
                  <H3 c={band.title} />
                  <span>
                    {band.key === "after"
                      ? lang === "ar"
                        ? `${band.steps[0]?.n} → ${band.steps[band.steps.length - 1]?.n} · يكمل من 11`
                        : `${band.steps[0]?.n} → ${band.steps[band.steps.length - 1]?.n} · continues from 11`
                      : `${band.steps[0]?.n} → ${band.steps[band.steps.length - 1]?.n}`}
                  </span>
                </header>
                <div className="track-legend" aria-hidden="true">
                  <span>{lang === "ar" ? "الخطوة" : "Step"}</span>
                  <span>{lang === "ar" ? "بيحصل" : "Happens"}</span>
                  <span>{lang === "ar" ? "يسلّم" : "Hands off"}</span>
                </div>
                <ol className="track-list">
                  {band.steps.map((s, i) => (
                    <li key={s.n ?? s.title.en} className={s.icon === "won" ? "is-hot" : undefined}>
                      <em>{s.n ?? String(i + 1).padStart(2, "0")}</em>
                      <span className="tile-ico">
                        <Icon name={s.icon} />
                      </span>
                      <strong>{t(s.title)}</strong>
                      {s.body ? <p>{t(s.body)}</p> : <p />}
                      <b>{s.data ? t(s.data) : "—"}</b>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
          <Cap c={page.value!} />
        </div>
      );
    }

    case "funnel":
      return (
        <div className="pg pg-funnel">
          <div className="fun">
            {[
              ["Campaign", "الحملة", "megaphone"],
              ["Spend", "الصرف", "cash"],
              ["Lead Source", "المصدر", "lead"],
              ["Captured", "الليدز المسجّلة", "lead"],
              ["Qualified", "المؤهلة", "target"],
              ["Opportunities", "فرص البيع", "handshake"],
              ["Closed Deals", "صفقات مقفولة", "won"],
              ["Revenue", "الإيراد", "cash"],
              ["ROI", "العائد", "chart"],
            ].map(([en, ar, icon]) => (
              <div key={en} className="fun-row">
                <Tile icon={icon as "megaphone"} en={en} ar={ar} gold={en === "ROI"} />
              </div>
            ))}
          </div>
          <aside>
            <Tile icon="cash" en="CPL" ar="تكلفة الليد" />
            <Tile icon="forecast" en="Conversion" ar="نسبة التحويل" />
            <Tile icon="cash" en="Revenue" ar="الإيراد الفعلي" gold />
            <Tile icon="chart" en="ROI" ar="عائد الحملة" gold />
          </aside>
          <Cap c={page.value!} />
        </div>
      );

    case "leadlife":
      return (
        <div className="pg pg-record">
          <article className="record">
            <header>
              <span className="tile-ico is-lg">
                <Icon name="lead" />
              </span>
              <div>
                <span className="tile-en" dir={lang === "ar" ? "ltr" : "rtl"}>
                  {lang === "ar" ? "Lead" : "سجل الفرصة"}
                </span>
                <strong dir={lang === "ar" ? "rtl" : "ltr"}>
                  {lang === "ar" ? "سجل الفرصة" : "Opportunity record"}
                </strong>
              </div>
            </header>
            <ul>
              {(
                [
                  tx("المسؤول", "Owner"),
                  tx("المصدر", "Source"),
                  tx("الحملة", "Campaign"),
                  tx("الأولوية", "Priority"),
                  tx("المرحلة", "Stage"),
                  tx("المتابعة الجاية", "Next Follow-up"),
                  tx("الأنشطة", "Activities"),
                  tx("الفيدباك", "Feedback"),
                  tx("الملاحظات", "Notes"),
                  tx("المرفقات", "Attachments"),
                ] as Tx[]
              ).map((x) => (
                <li key={x.en}>{t(x)}</li>
              ))}
            </ul>
          </article>
          <div className="record-flow">
            <Tile icon="lead" en="Lead" ar="الليد" gold body={tx("يشوف الاستفسار من أول ما يدخل", "Sees the inquiry the moment it enters")} />
            <Arrow />
            <Tile icon="employee" en="Owner" ar="المسؤول" body={tx("يمسك الملف ويعرف الخطوة الجاية", "Takes the file and knows the next step")} />
            <Arrow />
            <Tile icon="clock" en="Follow-up" ar="المتابعة" body={tx("يحافظ على التواصل من غير ما الليد يضيع", "Keeps contact alive so the Lead is not lost")} />
            <Arrow />
            <Tile icon="pipeline" en="Pipeline" ar="البايبلاين" body={tx("يحرك المرحلة حسب شغل فعلي مسجّل", "Moves the stage based on recorded work")} />
            <Arrow />
            <Tile icon="handshake" en="Opportunity" ar="فرصة البيع" gold body={tx("يفتح فرصة بيع واضحة للفريق", "Opens a clear sales opportunity for the team")} />
          </div>
          <Cap c={page.value!} />
        </div>
      );

    case "pipeline": {
      const stages = page.pipe ?? [];
      return (
        <div className="pg pg-stages">
          <div className="stg-head" aria-hidden="true">
            <span>{lang === "ar" ? "المرحلة" : "Stage"}</span>
            <span>{lang === "ar" ? "الغرض" : "Purpose"}</span>
            <span>{lang === "ar" ? "الخطوة التالية" : "Next step"}</span>
          </div>
          <ol className="stg-list">
            {stages.map((s, i) => (
              <li key={s.n} className={s.icon === "won" ? "is-hot" : undefined}>
                <em>{s.n}</em>
                <span className="tile-ico">
                  <Icon name={s.icon} />
                </span>
                <strong>{t(s.title)}</strong>
                <p>{t(s.purpose)}</p>
                <b>
                  {i < stages.length - 1 ? (lang === "ar" ? "بعدين ← " : "Next → ") : ""}
                  {t(s.next)}
                </b>
              </li>
            ))}
          </ol>
          <Cap
            c={
              page.value ??
              tx(
                "البايبلاين مسار بيع كامل: كل مرحلة ليها شغل، وخطوة تالية واضحة.",
                "The pipeline is a full sales path: work, and a clear next step at every stage."
              )
            }
          />
        </div>
      );
    }

    case "inventory":
      return (
        <div className="pg pg-inv">
          <div className="inv-h">
            <Tile icon="building" en="Developer" ar="المطوّر" />
            <Arrow v />
            <Tile icon="building" en="Project" ar="المشروع" />
            <Arrow v />
            <Tile icon="building" en="Building" ar="العمارة" />
            <Arrow v />
            <Tile icon="unit" en="Floor" ar="الدور" />
            <Arrow v />
            <Tile icon="unit" en="Unit" ar="الوحدة" gold />
          </div>
          <div className="inv-u">
            <H3 c={tx("نفس الوحدة مربوطة بـ", "The same unit is tied to")} />
            <Tile icon="stack" en="Availability" ar="الإتاحة" />
            <Tile icon="cash" en="Pricing" ar="السعر" />
            <Tile icon="unit" en="Area / Type" ar="المساحة والنوع" />
            <Tile icon="calendar" en="Payment Plan" ar="خطة السداد" />
            <Tile icon="lock" en="Reservation" ar="الحجز" gold />
            <Tile icon="won" en="Sale" ar="البيع" gold />
          </div>
          <Cap c={page.value!} />
        </div>
      );

    case "match":
      return (
        <div className="pg pg-match">
          <section>
            <H3 c={tx("طلب العميل", "Client need")} />
            <Tile icon="cash" en="Budget" ar="الميزانية" />
            <Tile icon="building" en="Location" ar="الموقع" />
            <Tile icon="unit" en="Area" ar="المساحة" />
            <Tile icon="unit" en="Bedrooms" ar="غرف النوم" />
            <Tile icon="calendar" en="Payment Plan" ar="خطة السداد" />
            <Tile icon="building" en="Project" ar="المشروع" />
          </section>
          <section className="match-mid">
            <Arrow />
            <Tile icon="match" en="Matching Engine" ar="مطابقة الاحتياج بالمخزون" gold />
            <Arrow />
          </section>
          <section>
            <H3 c={tx("أنسب الوحدات", "Best-fit units")} />
            <Tile icon="unit" en="Unit A" ar="وحدة أ" score="96%" gold />
            <Tile icon="unit" en="Unit B" ar="وحدة ب" score="88%" />
            <Tile icon="unit" en="Unit C" ar="وحدة ج" score="74%" />
            <Arrow v />
            <Tile icon="handshake" en="Sales Selection" ar="اختيار السيلز" />
            <Arrow v />
            <Tile icon="lock" en="Reservation" ar="الحجز" gold />
          </section>
          <Cap c={page.value!} />
        </div>
      );

    case "reserve":
      return (
        <div className="pg pg-rsv">
          <div className="rsv-flow">
            <Tile icon="building" en="Available" ar="متاح" />
            <Arrow v />
            <Tile icon="search" en="Selected" ar="اتختار" />
            <Arrow v />
            <Tile icon="files" en="Request" ar="طلب حجز" />
            <Arrow v />
            <Tile icon="won" en="Approval" ar="الاعتماد" />
            <Arrow v />
            <Tile icon="lock" en="Inventory Lock" ar="قفل المخزون" gold />
            <Arrow v />
            <Tile icon="lock" en="Reserved" ar="محجوز" gold />
            <Arrow v />
            <Tile icon="calendar" en="Payment Plan" ar="خطة السداد" />
            <Arrow v />
            <Tile icon="contract" en="Contract" ar="العقد" />
          </div>
          <aside>
            <Tile icon="clock" en="Pending" ar="حجز معلّق — لسه متعتمدش" />
            <Tile icon="lock" en="Approved" ar="حجز معتمد — الوحدة اتقفلت" gold />
          </aside>
          <Cap c={page.value!} />
        </div>
      );

    case "branch":
      return (
        <div className="pg pg-hero">
          <div className="hero-core">
            <span className="tile-ico is-lg">
              <Icon name="won" />
            </span>
            <span className="tile-en" dir={lang === "ar" ? "ltr" : "rtl"}>
              {lang === "ar" ? "Closed Won" : "إتمام البيع"}
            </span>
            <b dir={lang === "ar" ? "rtl" : "ltr"}>{lang === "ar" ? "إتمام البيع" : "Deal closed"}</b>
            <Note
              c={tx(
                "هنا البيع بيكمل للمالية والتشغيل",
                "Here the sale continues into finance and operations"
              )}
            />
          </div>
          <div className="hero-br">
            <Tile icon="contract" en="Contract" ar="العقد" body={tx("توثيق الاتفاق", "Document the agreement")} />
            <Tile icon="calendar" en="Payment Plan" ar="خطة السداد" body={tx("جدول الأقساط", "Installment schedule")} />
            <Tile icon="receipt" en="Collections" ar="التحصيل" body={tx("متابعة المستحق", "Follow what is due")} />
            <Tile icon="percent" en="Commission" ar="العمولة" body={tx("حساب التوزيع", "Calculate the split")} />
            <Tile icon="ledger" en="Accounting" ar="الحسابات" body={tx("بيتسجل في الحسابات", "Posted to the books")} />
            <Tile icon="investor" en="Investor" ar="المستثمر" body={tx("بورتال خاص للمستثمر", "Dedicated investor portal")} />
          </div>
          <Cap c={page.value!} />
        </div>
      );

    case "collect":
      return (
        <div className="pg pg-time">
          <div className="time">
            <Tile icon="contract" en="Contract" ar="العقد" />
            <Arrow />
            <Tile icon="calendar" en="Payment Plan" ar="خطة السداد" />
            <Arrow />
            <Tile icon="cash" en="Installments" ar="الأقساط" />
            <Arrow />
            <Tile icon="clock" en="Due Dates" ar="الاستحقاق" />
            <Arrow />
            <Tile icon="bell" en="Reminders" ar="تنبيه قبل القسط" />
            <Arrow />
            <Tile icon="portal" en="Portal Pay" ar="دفع من البوابة" gold />
            <Arrow />
            <Tile icon="files" en="Cheques" ar="إدارة الشيكات" />
            <Arrow />
            <Tile icon="receipt" en="Payments" ar="الدفعات" />
            <Arrow />
            <Tile icon="files" en="Receipts" ar="الإيصالات" />
            <Arrow />
            <Tile icon="chart" en="Outstanding" ar="المتبقي" />
            <Arrow />
            <Tile icon="radar" en="Status" ar="حالة التحصيل" gold />
          </div>
          <div className="who">
            <Tile icon="handshake" en="Sales" ar="السيلز" />
            <Arrow />
            <Tile icon="ledger" en="Finance" ar="المالية" />
            <Arrow />
            <Tile icon="radar" en="Management" ar="الإدارة" gold />
          </div>
          <Cap c={page.value!} />
        </div>
      );

    case "commission":
      return (
        <div className="pg pg-comm">
          <div className="comm-f">
            <Tile icon="won" en="Closed Won" ar="إتمام البيع" gold />
            <Arrow v />
            <Tile icon="nodes" en="Rule" ar="قاعدة العمولة" />
            <Arrow v />
            <Tile icon="percent" en="Gross" ar="العمولة الإجمالية" />
            <Arrow v />
            <Tile icon="calc" en="VAT / Tax" ar="الضريبة حسب البروفايل" />
            <Arrow v />
            <Tile icon="people" en="Distribution" ar="التوزيع حسب الدور" />
            <Arrow v />
            <Tile icon="calendar" en="Schedule" ar="جدول الأقساط" />
            <Arrow v />
            <Tile icon="receipt" en="Collections" ar="التحصيل" />
            <Arrow v />
            <Tile icon="ledger" en="Accounting" ar="الحسابات" />
          </div>
          <aside>
            <H3 c={tx("مين بياخد حصة", "Who gets a share")} />
            <Tile icon="handshake" en="Sales" ar="السيلز" />
            <Tile icon="people" en="Team Leader" ar="تيم ليدر" />
            <Tile icon="handshake" en="Sales Manager" ar="مدير مبيعات" />
            <Tile icon="radar" en="Sales Director" ar="دايركتور" />
            <Tile icon="broker" en="Broker" ar="الوسيط" />
            <Tile icon="building" en="Company" ar="الشركة" gold />
          </aside>
          <Cap
            c={tx(
              "من أول ما الصفقة تتقفل، العمولة بتتوزع أوتوماتيك حسب نسب السيلز والتيم والشركة.",
              "The moment the deal closes, commission is split automatically by sales, team, and company shares."
            )}
          />
        </div>
      );

    case "accounting":
      return (
        <div className="pg pg-acct">
          <section>
            <H3 c={tx("إيه اللي بيأثر على الحسابات", "What hits the books")} />
            <Tile icon="won" en="Deal → Revenue" ar="الصفقة → إيراد" />
            <Tile icon="percent" en="Commission → Entry" ar="العمولة → قيد" />
            <Tile icon="receipt" en="Client payment → Books" ar="دفعة العميل → حسابات" />
            <Tile icon="cash" en="Payroll → Books" ar="الرواتب → حسابات" />
          </section>
          <section className="acct-mid">
            <Arrow />
            <Tile icon="ledger" en="Accounting" ar="الحسابات" gold />
            <Arrow />
          </section>
          <section>
            <H3 c={tx("بيظهر في الحسابات", "Shows up in accounting")} />
            <Tile icon="files" en="Chart of Accounts" ar="دليل الحسابات" />
            <Tile icon="calc" en="Journal" ar="القيود" />
            <Tile icon="cash" en="Revenue / Expenses" ar="إيراد ومصروف" />
            <Tile icon="chart" en="Statements" ar="القوائم والتقارير" gold />
            <Tile icon="files" en="Accounting reports" ar="تقارير الحسابات بضغطة زر" />
          </section>
          <Cap c={page.value!} />
        </div>
      );

    case "people":
      return (
        <div className="pg pg-peop">
          <section>
            <H3 c={tx("من شغل السيلز للتقرير", "From sales work to the report")} />
            <Tile icon="handshake" en="Sales action" ar="أكشن على الليد" />
            <Arrow v />
            <Tile icon="activity" en="Live activity" ar="الحركة تتسجل فورًا" />
            <Arrow v />
            <Tile icon="chart" en="Daily report" ar="تقرير أداء يومي" gold />
            <Arrow v />
            <Tile icon="radar" en="One click" ar="بضغطة زر — دقيق واحترافي" gold />
          </section>
          <section className="peop-mid">
            <Tile icon="task" en="Create task" ar="إنشاء تاسك باحترافية" gold />
            <Note
              className="ops-note"
              c={tx(
                "متابعة، مسؤول، وميعاد — من غير شغل على جمب.",
                "Follow-up, owner, and due date — no side work."
              )}
            />
          </section>
          <section>
            <H3 c={tx("التقارير", "Reports")} />
            <div className="inv-acts">
              <Tile icon="trophy" en="Sales performance" ar="أداء كل السيلز" gold />
              <Tile icon="ledger" en="Accounting" ar="تقارير الحسابات" />
              <Tile icon="target" en="Targets" ar="تقارير التارجت" />
              <Tile icon="task" en="Tasks" ar="تقارير التاسكات" />
            </div>
          </section>
          <Cap c={page.value!} />
        </div>
      );

    case "dual":
      return (
        <div className="pg pg-eco">
          <section className="eco-chat-in">
            <H3 c={tx("الشات الداخلي", "Internal chat")} />
            <Tile icon="chat" en="Company chat" ar="شات بين الشركة كلها" gold />
            <Arrow v />
            <Tile icon="people" en="All teams" ar="السيلز · المالية · التشغيل" />
            <Arrow v />
            <Tile icon="shield" en="Admin oversight" ar="الأدمن مطّلع على الكل" gold />
            <Note
              className="ops-note"
              c={tx(
                "بديل واتساب — المحادثة متسجّلة جوه النظام.",
                "A WhatsApp alternative — the conversation is recorded inside the system."
              )}
            />
          </section>
          <div className="core">
            <span className="tile-ico is-lg">
              <Icon name="chat" />
            </span>
            <b dir="ltr">CHAT</b>
            <Note c={tx("تواصل موحّد", "Unified communication")} />
          </div>
          <section className="inv-portal eco-chat-out">
            <H3 c={tx("شات العملاء والدعم", "Client & support chat")} />
            <Tile icon="chat" en="Client chat" ar="شات مع العميل" gold />
            <Arrow v />
            <div className="inv-acts">
              <Tile icon="radar" en="Management" ar="الإدارة" />
              <Tile icon="people" en="Support" ar="الدعم الفني" />
              <Tile icon="investor" en="Investor portal" ar="بورتال المستثمر" gold />
              <Tile icon="assign" en="Access" ar="إيميل وباسورد مخصص" />
            </div>
            <div className="inv-acts eco-portal-row">
              <Tile icon="calendar" en="Installments" ar="متابعة الأقساط" />
              <Tile icon="bell" en="Reminders" ar="تنبيه قبل الاستحقاق" />
              <Tile icon="cash" en="Portal pay" ar="دفع من البوابة" gold />
              <Tile icon="files" en="Cheques" ar="إدارة الشيكات" />
            </div>
          </section>
          <Cap c={page.value!} />
        </div>
      );

    case "event":
      return (
        <div className="pg pg-auto">
          <Tile icon="won" en="Closed Won event" ar="حدث إتمام البيع" gold />
          <Arrow v />
          <Tile icon="nodes" en="Approved deal" ar="الصفقة معتمدة" />
          <Arrow v />
          <div className="auto-acts">
            <Tile icon="building" en="Unit" ar="تحديث حالة الوحدة" />
            <Tile icon="calendar" en="Payment Plan" ar="تشغيل خطة السداد" />
            <Tile icon="receipt" en="Collections" ar="فتح جدول التحصيل" />
            <Tile icon="percent" en="Commission" ar="حساب العمولة" />
            <Tile icon="chat" en="Notify" ar="إشعار المسؤولين" />
            <Tile icon="files" en="Audit" ar="سجل التنفيذ" />
          </div>
          <Cap
            c={tx(
              "حركة واحدة. باقي الأقسام بتكمل أوتوماتيك من غير شغل يدوي.",
              "One action. The rest of the company continues automatically — without manual work."
            )}
          />
        </div>
      );

    case "truth":
      return (
        <div className="pg pg-truth">
          <div className="truth-ring">
            <Tile icon="megaphone" en="Marketing" ar="التسويق" />
            <Tile icon="handshake" en="Sales" ar="السيلز" />
            <Tile icon="building" en="Inventory" ar="المخزون" />
            <Tile icon="building" en="Projects" ar="المشاريع" />
            <Tile icon="receipt" en="Collections" ar="التحصيل" />
            <div className="core">
              <b dir="ltr">ROOTK</b>
              <Note c={tx("مصدر بيانات واحد", "One data source")} />
            </div>
            <Tile icon="percent" en="Commission" ar="العمولات" />
            <Tile icon="ledger" en="Accounting" ar="الحسابات" />
            <Tile icon="people" en="HR" ar="الموارد" />
            <Tile icon="target" en="Targets" ar="التارجت" />
            <Tile icon="investor" en="Investors" ar="المستثمرين" />
            <Tile icon="chart" en="Reports" ar="التقارير" />
          </div>
          <div className="truth-out">
            <Tile icon="radar" en="Executive Intelligence" ar="رؤية الإدارة" gold />
            <Tile icon="shield" en="Portfolio Health" ar="صحة المحفظة" />
            <Tile icon="forecast" en="Revenue Forecast" ar="توقّع الإيراد" />
            <Tile icon="trophy" en="Performance" ar="الأداء" />
            <Tile icon="shield" en="Risk" ar="المخاطر" />
            <Tile icon="radar" en="Decision" ar="القرار" gold />
          </div>
          <Cap
            c={tx(
              "الإدارة مش محتاجة تجمع أرقام من أكتر من قسم. القرار مبني على الصورة الكاملة.",
              "Management does not assemble numbers from several departments. The decision is built on the full picture."
            )}
          />
        </div>
      );

    case "intel":
      return (
        <div className="pg pg-roles">
          <Domain
            icon="radar"
            title={tx("المالك / المدير التنفيذي", "Owner / CEO")}
            items={[
              tx("التقارير", "Reports"),
              tx("المحفظة", "Portfolio"),
              tx("الإيراد", "Revenue"),
              tx("المخاطر", "Risk"),
              tx("القرار", "Decision"),
            ]}
          />
          <Domain
            icon="handshake"
            title={tx("دايركتور المبيعات", "Sales Director")}
            items={[
              tx("الليدز", "Leads"),
              tx("البايبلاين", "Pipeline"),
              tx("المتابعة", "Follow-up"),
              tx("التارجت", "Targets"),
              tx("التيم", "Team"),
            ]}
          />
          <Domain
            icon="megaphone"
            title={tx("التسويق", "Marketing")}
            items={[
              tx("الحملات", "Campaigns"),
              tx("المصدر", "Source"),
              tx("تكلفة الليد", "CPL"),
              tx("العائد", "ROI"),
            ]}
          />
          <div className="core">
            <b dir="ltr">ROOTK</b>
            <Note c={tx("تخصيص حسب الدور", "Customised by role")} />
          </div>
          <Domain
            icon="ledger"
            title={tx("المالية", "Finance")}
            items={[
              tx("التحصيل", "Collections"),
              tx("الدفعات", "Payments"),
              tx("العمولات", "Commissions"),
              tx("الحسابات", "Accounting"),
            ]}
          />
          <Domain
            icon="building"
            title={tx("التشغيل", "Operations")}
            items={[
              tx("المشاريع", "Projects"),
              tx("المخزون", "Inventory"),
              tx("الوحدة", "Unit"),
              tx("المخاطر", "Risk"),
            ]}
          />
          <Domain
            icon="people"
            title={tx("الموارد البشرية", "HR")}
            items={[
              tx("الموظفين", "Employees"),
              tx("الحضور", "Attendance"),
              tx("الرواتب", "Payroll"),
              tx("الأداء", "Performance"),
            ]}
          />
          <div className="roles-cust">
            <Tile icon="people" en="Roles" ar="الأدوار" />
            <Tile icon="shield" en="Permissions" ar="الصلاحيات" />
            <Tile icon="match" en="Customization" ar="التخصيص" gold />
          </div>
          <Cap
            c={tx(
              "مش شاشات ثابتة. الأدوار والصلاحيات والتخصيص بيتظبطوا على شغل الشركة.",
              "Not fixed screens. Roles, permissions and customization are set to how the company works."
            )}
          />
        </div>
      );

    case "outcomes":
      return (
        <div className="pg pg-out">
          <section className="iso">
            <H3 c={tx("قبل", "Before")} />
            <Note
              c={tx(
                "كل قسم شايف ملفّه. الأرقام بتتجمع بالإيد. البيع بعيد عن المخزون. التحصيل بعيد عن الصفقة.",
                "Each department sees its own file. Numbers are assembled by hand. Sales sits apart from inventory. Collections sits apart from the deal."
              )}
            />
          </section>
          <section className="conn">
            <H3 c={tx("بعد ROOTK", "After ROOTK")} />
            <ol>
              {(
                [
                  tx("صورة واحدة واضحة للشركة كلها", "One clear picture of the whole company"),
                  tx("متابعة أوضح للليدز والمتابعات", "Clearer Lead and follow-up visibility"),
                  tx("تحكّم أكبر في المخزون والوحدات", "Stronger control of inventory and units"),
                  tx("دورة بيع من الليد لإتمام البيع", "A sales cycle from Lead to Closed Won"),
                  tx("تحصيل أوضح على نفس الصفقة", "Clearer collections on the same deal"),
                  tx("عمولات تتحسب من نفس القاعدة", "Commissions calculated from the same rule"),
                  tx("أداء التيم والتارجت في مكان واحد", "Team performance and targets in one place"),
                  tx("قرار مبني على شغل فعلي مش تقدير", "Decisions built on real work, not guesswork"),
                  tx("الإدارة تشوف الشركة من منظور واحد", "Leadership sees the company from one view"),
                ] as Tx[]
              ).map((x) => (
                <li key={x.en}>{t(x)}</li>
              ))}
            </ol>
          </section>
          <Cap c={page.value!} />
        </div>
      );

    default:
      return null;
  }
}
