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
        <div className="pg pg-journey">
          {(
            [
              {
                key: "comm",
                title: tx("المحرك التجاري", "Commercial engine"),
                steps: [
                  { icon: "megaphone" as const, en: "Marketing", ar: "الحملة" },
                  { icon: "lead" as const, en: "Lead", ar: "الليد" },
                  { icon: "assign" as const, en: "Assignment", ar: "التوزيع" },
                  { icon: "target" as const, en: "Qualify", ar: "التأهيل" },
                  { icon: "handshake" as const, en: "Opportunity", ar: "فرصة البيع" },
                  { icon: "match" as const, en: "Matching", ar: "المطابقة" },
                  { icon: "lock" as const, en: "Reservation", ar: "الحجز" },
                  { icon: "won" as const, en: "Closed Won", ar: "إتمام البيع", hot: true },
                ],
              },
              {
                key: "fin",
                title: tx("المحرك المالي", "Financial engine"),
                steps: [
                  { icon: "contract" as const, en: "Contract", ar: "العقد" },
                  { icon: "calendar" as const, en: "Payment Plan", ar: "خطة السداد" },
                  { icon: "receipt" as const, en: "Collections", ar: "التحصيل" },
                  { icon: "percent" as const, en: "Commission", ar: "العمولة" },
                  { icon: "ledger" as const, en: "Accounting", ar: "الحسابات" },
                ],
              },
              {
                key: "intel",
                title: tx("رؤية الإدارة", "Executive view"),
                steps: [
                  { icon: "investor" as const, en: "Investor", ar: "المستثمر" },
                  { icon: "chart" as const, en: "Reports", ar: "التقارير" },
                  { icon: "radar" as const, en: "Intelligence", ar: "الإدارة" },
                  { icon: "decision" as const, en: "Decision", ar: "القرار" },
                ],
              },
            ] as const
          ).map((band) => (
            <section key={band.key} className={`j-band j-${band.key}`}>
              <header className="j-band-h">
                <H3 c={band.title} />
              </header>
              <ol className="j-rail">
                {band.steps.map((s, i) => (
                  <li key={s.en} className={"hot" in s && s.hot ? "is-hot" : undefined}>
                    <em>{String(i + 1).padStart(2, "0")}</em>
                    <span className="tile-ico">
                      <Icon name={s.icon} />
                    </span>
                    <div>
                      <b>{lang === "ar" ? s.ar : s.en}</b>
                      <i dir="ltr">{lang === "ar" ? s.en : s.ar}</i>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
          <Cap
            c={
              page.value ??
              tx(
                "كل خطوة بتسلّم اللي بعدها جوه نفس النظام — من غير ما الشغل يتقطع.",
                "Each step hands off to the next inside the same system — without breaking the work."
              )
            }
          />
        </div>
      );

    case "roadmap":
      return (
        <div className="pg pg-lead">
          <div className="src">
            <H3 c={tx("منين بييجي الليد", "Where the Lead comes from")} />
            <Tile icon="megaphone" en="Campaigns" ar="الحملات" />
            <Tile icon="portal" en="Website" ar="الموقع" />
            <Tile icon="nodes" en="API" ar="ربط خارجي" />
            <Tile icon="files" en="Import" ar="ملف" />
            <Tile icon="lead" en="Manual" ar="تسجيل يدوي" />
          </div>
          <div className="src-flow">
            <Arrow />
            <Tile icon="lead" en="Lead" ar="سجل الفرصة" gold />
            <Arrow />
            <Tile icon="assign" en="Assignment" ar="تحديد المسؤول" />
            <Arrow />
            <Tile icon="target" en="Qualification" ar="فهم الاحتياج" />
            <Arrow />
            <Tile icon="clock" en="Follow-up" ar="المتابعة" />
            <Arrow />
            <Tile icon="handshake" en="Opportunity" ar="فرصة بيع" gold />
          </div>
          <Cap c={page.value!} />
        </div>
      );

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
            <Tile icon="lead" en="Lead" ar="الليد" gold />
            <Arrow />
            <Tile icon="employee" en="Owner" ar="المسؤول" />
            <Arrow />
            <Tile icon="clock" en="Follow-up" ar="المتابعة" />
            <Arrow />
            <Tile icon="pipeline" en="Pipeline" ar="البايبلاين" />
            <Arrow />
            <Tile icon="handshake" en="Opportunity" ar="فرصة البيع" gold />
          </div>
          <Cap c={page.value!} />
        </div>
      );

    case "pipeline":
      return (
        <div className="pg pg-pipe">
          {[
            { n: "01", icon: "lead" as const, en: "Fresh Lead", ar: "ليد جديد", w: tx("دخول الاستفسار", "Inquiry enters"), r: tx("مصدر + مسؤول", "Source + Owner"), nx: tx("تواصل", "Contact") },
            { n: "02", icon: "chat" as const, en: "Contacted", ar: "تم التواصل", w: tx("أول مكالمة أو رسالة", "First call or message"), r: tx("نتيجة التواصل", "Contact result"), nx: tx("تأهيل", "Qualify") },
            { n: "03", icon: "target" as const, en: "Qualified", ar: "مؤهّل", w: tx("الاحتياج والجدية", "Need and seriousness"), r: tx("ميزانية + طلب", "Budget + need"), nx: tx("فرصة", "Opportunity") },
            { n: "04", icon: "handshake" as const, en: "Opportunity", ar: "فرصة بيع", w: tx("فتح مسار بيع", "Open a sales path"), r: tx("مطابقة", "Matching"), nx: tx("اجتماع", "Meeting") },
            { n: "05", icon: "search" as const, en: "Meeting", ar: "اجتماع / معاينة", w: tx("قرار العميل", "Client decision"), r: tx("وحدة مرشّحة", "Candidate unit"), nx: tx("حجز", "Reservation") },
            { n: "06", icon: "lock" as const, en: "Reservation", ar: "الحجز", w: tx("قفل الوحدة", "Lock the unit"), r: tx("اعتماد", "Approval"), nx: tx("إتمام", "Close") },
            { n: "07", icon: "won" as const, en: "Closed Won", ar: "إتمام البيع", w: tx("قفل الصفقة", "Lock the deal"), r: tx("قيمة + أطراف", "Value + parties"), nx: tx("عقد ومالية", "Contract & finance") },
          ].map((s) => (
            <article key={s.n} className={`pipe-st${s.n === "07" ? " is-gold" : ""}`}>
              <em>{s.n}</em>
              <span className="tile-ico">
                <Icon name={s.icon} />
              </span>
              <span className="tile-en" dir={lang === "ar" ? "ltr" : "rtl"}>
                {lang === "ar" ? s.en : s.ar}
              </span>
              <strong dir={lang === "ar" ? "rtl" : "ltr"}>{lang === "ar" ? s.ar : s.en}</strong>
              <p>
                {lang === "ar" ? "بيحصل: " : "Happens: "}
                {t(s.w)}
              </p>
              <p>
                {lang === "ar" ? "مطلوب: " : "Required: "}
                {t(s.r)}
              </p>
              <b>
                {lang === "ar" ? "بعدين: " : "Next: "}
                {t(s.nx)}
              </b>
            </article>
          ))}
          <Cap
            c={tx(
              "البايبلاين مسار بيع كامل: كل مرحلة ليها شغل، شرط، وخطوة تالية.",
              "The pipeline is a full sales path: work, condition, and a next step at every stage."
            )}
          />
        </div>
      );

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
