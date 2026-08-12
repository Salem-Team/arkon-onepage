import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { DEMO, LEGAL, PACKAGES } from "../data";
import { useLang } from "../lang";
import "../styles/deck.css";

const TOTAL = 10;

function useDate() {
  const { lang } = useLang();
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function Page({
  n,
  cover,
  children,
  onVisible,
}: {
  n: number;
  cover?: boolean;
  children: ReactNode;
  onVisible: (n: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          onVisible(n);
        }
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [n, onVisible]);

  return (
    <motion.article
      ref={ref}
      id={`offer-p${n}`}
      className={`opage${on ? " is-on" : ""}${cover ? " is-cover" : ""}`}
      initial={{ opacity: 0, y: 48, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="owash" />
      <div className="omesh" />
      <div className="oframe" />
      <div className="opad">{children}</div>
    </motion.article>
  );
}

function Top({ investment }: { investment?: boolean }) {
  const { lang } = useLang();
  return (
    <header className="otop">
      <div className="by">
        <span>{lang === "ar" ? "مقدَّم من" : "Presented by"}</span>
        <img src="/assets/rootk-logo.png" alt="Rootk Systems" />
      </div>
      <span className="badge">{investment ? (lang === "ar" ? "عرض استثماري" : "Investment offer") : lang === "ar" ? "عرض سرّي" : "Confidential"}</span>
    </header>
  );
}

function Foot({ n }: { n: number }) {
  const { lang } = useLang();
  const date = useDate();
  return (
    <footer className="ofoot">
      <div className="meta">
        <div>
          <label>{lang === "ar" ? "العميل" : "Client"}</label>
          <strong>Arkon Developments</strong>
        </div>
        <div>
          <label>{lang === "ar" ? "مقدَّم من" : "Presented by"}</label>
          <strong>Rootk Systems</strong>
        </div>
        <div>
          <label>{lang === "ar" ? "التاريخ" : "Date"}</label>
          <strong>{date}</strong>
        </div>
      </div>
      <div className="pg">
        {String(n).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
      </div>
    </footer>
  );
}

export function OfferDeck() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(1);
  const [live, setLive] = useState(false);
  const date = useDate();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), {
      threshold: 0.08,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`odek${live ? " is-live" : ""}`} id="offer" ref={root}>
      <div className="odek-intro">
        <p className="kicker">ARKON × ROOTK SYSTEMS</p>
        <h2 className="display">{lang === "ar" ? "العرض الفني والتجاري" : "Technical & commercial proposal"}</h2>
      </div>

      <div className="orail" aria-hidden="true">
        <div className="orail-inner">
          {Array.from({ length: TOTAL }, (_, i) => (
            <button
              key={i}
              type="button"
              className={active === i + 1 ? "is-on" : ""}
              onClick={() => document.getElementById(`offer-p${i + 1}`)?.scrollIntoView({ behavior: "smooth", block: "center" })}
            />
          ))}
        </div>
      </div>

      <div className="odek-deck">
        <Page n={1} cover onVisible={setActive}>
          <Top />
          <div className="obody ocover">
            <div className="brand">
              <div className="glow" />
              <img src="/assets/arkon-logo@2x.png" alt="Arkon Developments" />
            </div>
            <p className="eye">
              {lang === "ar" ? "عرض فنّي وتجاري · " : "Technical & commercial proposal · "}
              {date}
            </p>
            <h1>
              {lang === "ar" ? "منصّة رقمية" : "A digital platform"}
              <br />
              <span className="gold">{lang === "ar" ? "بمقياس المطوّر العقاري" : "at developer scale"}</span>
            </h1>
            <p className="lede">
              {lang === "ar"
                ? "نقترح على Arkon Developments منصّة تشغيل واحدة تدير المشاريع والوحدات والمبيعات ورحلة العميل — بمسار تسليم واضح من التحليل إلى الإطلاق."
                : "We propose to Arkon Developments a single operating platform for projects, units, sales and the customer journey — with a clear path from analysis to go-live."}
            </p>
            <div className="odemo">
              <div className="odemo-top">
                <span>{lang === "ar" ? "جرّب النظام الآن" : "Try the system now"}</span>
                <a href={DEMO.url} target="_blank" rel="noreferrer">
                  {lang === "ar" ? "فتح التجربة" : "Open demo"} ↗
                </a>
              </div>
              <p className="url" dir="ltr">
                {DEMO.host}
              </p>
              <div className="pair">
                <div>
                  <label>{lang === "ar" ? "البريد" : "Email"}</label>
                  <strong dir="ltr">{DEMO.email}</strong>
                </div>
                <div>
                  <label>{lang === "ar" ? "كلمة المرور" : "Password"}</label>
                  <strong dir="ltr">{DEMO.password}</strong>
                </div>
              </div>
              <p className="hint">
                {lang === "ar"
                  ? "حساب أدمن جاهز للمعاينة — الأسعار والباقات في الصفحة الأخيرة."
                  : "An admin account is ready for preview — packages and pricing are on the last page."}
              </p>
            </div>
          </div>
          <Foot n={1} />
        </Page>

        <Page n={2} onVisible={setActive}>
          <Top />
          <div className="obody">
            <h2 className="opage-title">{lang === "ar" ? "نظرة تنفيذية" : "Executive view"}</h2>
            <p className="opage-lede">
              {lang === "ar"
                ? "Rootk CRM منصّة تشغيل عقارية متكاملة تربط المبيعات والمخزون والمالية في نظام واحد — من أول استفسار حتى إغلاق الصفقة وتحصيل العمولات وخدمة المستثمر."
                : "Rootk CRM is an integrated real-estate operating platform. It connects sales, inventory and finance in one system — from the first inquiry to closed deal, commission collection and investor servicing."}
            </p>
            <div className="ocols">
              {[
                { h: { ar: "مسار بيع كامل", en: "A complete sales path" }, p: { ar: "يُتتبَّع العميل من أول اتصال حتى الحجز وإغلاق الصفقة والعقد والعمولة، دون فجوات بين الفرق.", en: "The customer is tracked from first contact through reservation, close, contract and commission — without gaps between teams." } },
                { h: { ar: "مخطط المشروع", en: "Project master plan" }, p: { ar: "تُصمَّم مخططات المشروع تفاعليًا وتُعرض للعملاء بشكل يوضح اختيار الوحدة دون مغادرة مسار البيع.", en: "Project layouts are designed interactively and shown to clients in a way that makes unit choice part of the sales path." } },
                { h: { ar: "محرّك العمولات", en: "Commission engine" }, p: { ar: "تُحسب العمولة والضريبة والأقساط والتحصيل من الصفقة نفسها، مع إمكانية ترحيلها للحسابات عند الحاجة.", en: "Commission, tax, installments and collection are calculated from the deal itself, with optional posting to the ledger." } },
                { h: { ar: "بوابة المستثمر", en: "Investor portal" }, p: { ar: "يرى المستثمر أقساطه وكشوفه ومستنداته ويتابع العلاقة بعد البيع من بوابة منظّمة.", en: "The investor sees installments, statements and documents, and continues the relationship after the sale from a structured portal." } },
                { h: { ar: "ذكاء تنفيذي", en: "Executive intelligence" }, p: { ar: "تعرض لوحات الإدارة صحة المحفظة وتوقعات الإيراد وأولويات المتابعة اليومية دون انتظار تقرير أسبوعي.", en: "Leadership dashboards show portfolio health, revenue forecasts and daily follow-up priorities — without waiting for a weekly report." } },
                { h: { ar: "تشغيل يومي", en: "Daily operations" }, p: { ar: "شراكات البنوك والضيافة والحركة وإدارة الصرف التشغيلي تبقى داخل المنصّة نفسها.", en: "Banking, hospitality and movement partnerships, and operational currency management, remain inside the same platform." } },
                { h: { ar: "تشغيل ميداني", en: "Field operation" }, p: { ar: "تطبيق iOS وAndroid يضع المندوب على نفس السجلات الحية: إشعارات، بصمة، وربط مكالمات.", en: "An iOS and Android experience puts the salesperson on the same live records: notifications, biometrics and call bridging." } },
                { h: { ar: "حوكمة الوصول", en: "Access governance" }, p: { ar: "صلاحيات دقيقة حسب الدور والنطاق، حتى ترى كل إدارة ما يخص عملها فقط.", en: "Fine permissions by role and scope, so each department sees only what its work requires." } },
              ].map((b) => (
                <div className="oblock" key={b.h.en}>
                  <h3>{t(b.h)}</h3>
                  <p>{t(b.p)}</p>
                </div>
              ))}
            </div>
          </div>
          <Foot n={2} />
        </Page>

        <Page n={3} onVisible={setActive}>
          <Top />
          <div className="obody">
            <h2 className="opage-title">{lang === "ar" ? "المبيعات والعملاء" : "Sales & customers"}</h2>
            <p className="opage-lede">
              {lang === "ar"
                ? "من أول استفسار حتى إغلاق الصفقة — يعمل فريق المبيعات من مساحة واحدة واضحة، لا من شيت وواتساب متفرقين."
                : "From the first inquiry to closed deal — the sales team works from one clear workspace, not from scattered sheets and WhatsApp."}
            </p>
            <div className="ocols">
              <div className="oblock">
                <h3>{lang === "ar" ? "الاستفسارات" : "Inquiries"}</h3>
                <p>
                  {lang === "ar"
                    ? "تدخل الاستفسارات من الموقع أو واجهة خارجية أو استيراد Excel/CSV أو الإدخال اليدوي إلى سجل واحد. يُحفظ المصدر والحملة حتى لو مرّ العميل بعدة خطوات، ويُكشف التكرار بالهاتف أو البريد قبل أن تتفتت الملكية."
                    : "Inquiries from the website, an external API, Excel/CSV import or manual entry land in one record. Source and campaign are kept even across several steps, and phone or email duplicates are detected before ownership fragments."}
                </p>
                <p>
                  {lang === "ar"
                    ? "يُوزَّع الليد يدويًا أو تلقائيًا على أقل حمل، أو إلى وسيط حسب القاعدة. لكل سجل تقييم وملاحظات ومرفقات، وقوائم جاهزة للمتأخر والمتابعة الفائتة."
                    : "The lead is assigned manually, by lowest load, or to a broker by rule. Each record carries rating, notes and attachments, with ready lists for delayed leads and missed follow-ups."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "مسار البيع" : "The sales path"}</h3>
                <p>
                  {lang === "ar"
                    ? "المراحل قابلة للضبط حسب طريقة عمل Arkon. كل فرصة تظهر في مرحلتها الحالية، والانتقال لا يتم إلا بصلاحية وسجل. يمكن اشتراط ملاحظة، موعد متابعة، أو اختيار وحدة قبل التقدّم."
                    : "Stages follow Arkon’s way of working. Every opportunity sits in its current stage, and a move requires permission and a history. A note, a follow-up date, or a unit can be required before progress."}
                </p>
                <p>
                  {lang === "ar"
                    ? "الصفقات المفقودة تُسجَّل بسبب الخسارة. العمليات الجماعية — تعيين أو تغيير مرحلة أو تصدير — تبقى تحت السيطرة."
                    : "Lost deals are recorded with a reason. Bulk assignment, stage change or export remains under control."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "المتابعة" : "Follow-up"}</h3>
                <p>
                  {lang === "ar"
                    ? "لكل عميل موعد متابعة قادم ظاهر للفريق. المكالمات والاجتماعات والمعاينات والملاحظات تُحفظ في سجل واحد. المهام التشغيلية مستقلة عن تغيير المرحلة، والتنبيه يصل قبل ضياع الفرصة."
                    : "Every customer has a next follow-up visible to the team. Calls, meetings, visits and notes sit in one ledger. Operational tasks are independent of stage change, and an alert arrives before the opportunity is lost."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "العلاقة بعد الإغلاق" : "The relationship after close"}</h3>
                <p>
                  {lang === "ar"
                    ? "ملف العميل يبقى موحّدًا ويرتبط بالعقود والوحدات المباعة. مشاركة روابط الوحدات للعروض الخارجية لا تقطع الخط الزمني للتفاعلات."
                    : "The customer file stays unified and links to contracts and sold units. Sharing unit links for external offers does not break the interaction timeline."}
                </p>
              </div>
            </div>
          </div>
          <Foot n={3} />
        </Page>

        <Page n={4} onVisible={setActive}>
          <Top />
          <div className="obody">
            <h2 className="opage-title">{lang === "ar" ? "المخزون والحجز والصفقات" : "Inventory, reservation and deals"}</h2>
            <p className="opage-lede">
              {lang === "ar"
                ? "تُدار الوحدات من الكتالوج حتى الحجز وإغلاق الصفقة. المبيعات لا تحتاج ملف مخزون موازيًا."
                : "Units are managed from catalogue through reservation and close. Sales does not need a parallel inventory file."}
            </p>
            <div className="ocols">
              <div className="oblock">
                <h3>{lang === "ar" ? "الكتالوج" : "Catalogue"}</h3>
                <p>
                  {lang === "ar"
                    ? "المطوّر والمشروع والمبنى والوحدة في هيكل واحد: السعر، المساحة، النوع، والحالة — متاحة أو محجوزة أو مباعة أو مخفية. الاستيراد والتحديث الجماعي، وتعبير الاهتمام حسب المرحلة، وقوالب السداد وحاسبة الأقساط، كلها على الوحدة نفسها."
                    : "Developer, project, building and unit sit in one hierarchy: price, area, type and status — available, reserved, sold or hidden. Import, bulk update, EOI by phase, payment-plan templates and the installment calculator all live on the same unit."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "المخطط التفاعلي" : "Interactive master plan"}</h3>
                <p>
                  {lang === "ar"
                    ? "يُرسم مخطط المشروع بطبقات للمباني والمراحل، مع إصدارات وقوالب. يرى العميل المشروع في عارض عام، ويرى الفريق مصفوفة الأدوار داخل المبنى. المطابقة تربط طلب المشتري بالوحدات المتاحة دون ادعاء خريطة GIS لكل وحدة."
                    : "The project layout is drawn in layers for buildings and phases, with versions and templates. The client explores a public viewer; the team sees the floor matrix. Matching links buyer need to available units — without claiming per-unit GIS."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "الحجز" : "Reservation"}</h3>
                <p>
                  {lang === "ar"
                    ? "يمكن حجز أكثر من وحدة لنفس العميل. بعد موافقة الإدارة تُقفل الوحدة في المخزون، وينتقل مسار البيع إلى مرحلة الحجز، ويصدر PDF للنموذج. الرفض أو الإلغاء يحرّر الوحدات تلقائيًا."
                    : "More than one unit can be reserved for the same client. After management approval the unit is locked, the sales path moves to reservation, and a PDF is issued. Rejection or cancellation releases the units automatically."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "إغلاق الصفقة والعقد" : "Close and contract"}</h3>
                <p>
                  {lang === "ar"
                    ? "الإغلاق الرسمي يسجّل القيمة وتوزيع نسب الفريق والوسطاء — بحد أقصى 100٪ — مع طابور موافقة قبل الترحيل المالي. عقد البيع يمر بمسودة ومعاينة وإنهاء وتصدير PDF، ويرتبط بالعميل والوحدة."
                    : "A formal close records value and team/broker shares — capped at 100% — with an approval queue before financial posting. The sale contract moves through draft, preview, finalization and PDF, and is linked to the client and the unit."}
                </p>
              </div>
            </div>
          </div>
          <Foot n={4} />
        </Page>

        <Page n={5} onVisible={setActive}>
          <Top />
          <div className="obody">
            <h2 className="opage-title">{lang === "ar" ? "العمولات والمستثمرون والمالية" : "Commissions, investors and finance"}</h2>
            <p className="opage-lede">
              {lang === "ar"
                ? "من حساب العمولة وخدمة ما بعد البيع حتى التقارير المالية — الإدارة المالية تعمل على أرقام آتية من التشغيل نفسه."
                : "From commission calculation and after-sales service to financial reports — finance works on figures that come from operations themselves."}
            </p>
            <div className="ocols">
              <div className="oblock">
                <h3>{lang === "ar" ? "العمولات" : "Commissions"}</h3>
                <p>
                  {lang === "ar"
                    ? "تُضبط القواعد للفريق الداخلي والوسطاء. تُحسب الضريبة والاستقطاع حسب السياسة، وتُقسَّم العمولة على المبيعات والوسيط والقيادة والشركة. الأقساط والتحصيل والكشوف والتصدير تظهر في مركز واحد، مع تنبيه للمستحق والمتأخر، وترحيل اختياري لدفتر الأستاذ."
                    : "Rules are set for internal teams and brokers. Tax and withholding follow policy, and commission is split across sales, broker, leadership and company. Installments, collection, statements and export live in one hub, with due and overdue alerts, and optional general-ledger posting."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "المستثمرون" : "Investors"}</h3>
                <p>
                  {lang === "ar"
                    ? "بعد إتمام البيع يُفتح حساب مرتبط بالعقد وجدول الأقساط. تُسجَّل المدفوعات والتسويات، وتصدر الكشوف PDF أو CSV. البوابة تعرض اللوحة والأقساط والمستندات وتقدّم الأعمال. التوصية الاستشارية تظهر بموافقة الإدارة. تسهيل الدفع عبر الحدود مسار تشغيلي، وليس بوابة بطاقات."
                    : "After the sale an account opens, linked to the contract and installment plan. Payments and adjustments are recorded, and statements issue as PDF or CSV. The portal shows the dashboard, installments, documents and construction progress. Advisory notes appear with management approval. Cross-border payment facilitation is an operations workflow, not a card gateway."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "المحاسبة" : "Accounting"}</h3>
                <p>
                  {lang === "ar"
                    ? "دليل حسابات وقيود مزدوجة: مسودة أو ترحيل أو إلغاء. الإيراد والمصروف التشغيلي يظهران في الميزانية وقائمة الدخل والتدفّق ودفتر الأستاذ. إيراد الصفقة المعتمدة والراتب ومدفوع المستثمر يمكن مزامنتهما. لا يُدَّعى هنا مطابقة كشوف بنكية."
                    : "A chart of accounts and double-entry journals: draft, post or void. Operating revenue and expense appear in the balance sheet, income statement, cash flow and ledger. Approved deal revenue, payroll and investor payments can be synced. Bank-statement reconciliation is not claimed."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "الصرف التشغيلي" : "Operational currency"}</h3>
                <p>
                  {lang === "ar"
                    ? "أسعار من مصادر متعددة، سياسات هامش، وتحويلات بموافقة الإدارة، مع تقارير يومية وشهرية. هذا إدارة تشغيلية للعملة — ليست خدمات مصرفية، ولا ترحيلًا تلقائيًا لدفتر الأستاذ."
                    : "Rates from multiple providers, markup policy, and conversions with management approval, with daily and monthly reports. This is operational currency management — not banking, and not automatic ledger posting."}
                </p>
              </div>
            </div>
          </div>
          <Foot n={5} />
        </Page>

        <Page n={6} onVisible={setActive}>
          <Top />
          <div className="obody">
            <h2 className="opage-title">{lang === "ar" ? "التسويق والأداء والموارد" : "Marketing, performance and people"}</h2>
            <p className="opage-lede">
              {lang === "ar"
                ? "يُقاس الإنفاق بالإيراد، ويُدار التارجت كتشغيل يومي، وتبقى الموارد والوسطاء داخل المنصّة نفسها."
                : "Spend is measured by revenue, targets are run as daily operations, and HR and brokers remain inside the same platform."}
            </p>
            <div className="ocols">
              <div className="oblock">
                <h3>{lang === "ar" ? "الحملات" : "Campaigns"}</h3>
                <p>
                  {lang === "ar"
                    ? "تُدار الحملة وتكلفتها على كل قناة. يُعرف أي حملة جلبت العميل فعلًا — بأول لمسة أو آخر لمسة أو توزيع خطي. تظهر تكلفة الليد ومعدل التحويل والعائد، مع تنبيه عند انخفاض الأداء، وتقارير أسبوعية وشهرية. يمكن إيقاف حملة أو تعديل ميزانية أو إشعار الفريق ضمن شروط واضحة."
                    : "Each campaign and its spend is managed by channel. Which campaign actually brought the client is known — first-touch, last-touch or linear. CPL, conversion and ROI appear, with an alert when performance drops, and weekly and monthly reports. A campaign can be paused, a budget adjusted, or the team notified under clear conditions."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "الأهداف والتحفيز" : "Targets and motivation"}</h3>
                <p>
                  {lang === "ar"
                    ? "لكل مندوب هدف شهري للإيراد والأنشطة، مع أهداف للشركة والفريق. الإنجاز يُحسب من الصفقات والأنشطة الفعلية. النقاط والمستويات والشارات ولوحات الترتيب مصمَّمة كتحفيز مؤسسي، لا كلعبة."
                    : "Each salesperson has a monthly revenue and activity target, with company and team targets. Attainment is calculated from real deals and activities. Points, levels, badges and leaderboards are designed as enterprise motivation, not as a game."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "الموارد البشرية" : "Human resources"}</h3>
                <p>
                  {lang === "ar"
                    ? "ملفات الموظفين والأقسام والمسميات، والحضور مع مراجعة للحالات المشبوهة، والإجازات والأذونات، وكشوف الراتب وتصدير التحويل البنكي، والسلف والخصوم وقفل الفترة، وتقييم شهري — مع ترحيل اختياري للحسابات."
                    : "Employee files, departments and titles; attendance with review of suspicious cases; leave and short permissions; payslips and bank-transfer export; advances, deductions and period lock; monthly scoring — with optional ledger posting."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "الوسطاء والفرق" : "Brokers and teams"}</h3>
                <p>
                  {lang === "ar"
                    ? "ملفات شركات الوسطاء ووثائقهم، وتوزيع الليد حسب الأداء والحمل، وقواعد عمولة مخصّصة، ومراقبة المواعيد. فرق المبيعات تُنظَّم بمدير وقائد وأعضاء دون جداول مشتتة."
                    : "Broker companies and their documents, lead routing by performance and load, dedicated commission rules, and SLA monitoring. Sales teams are organised with manager, team lead and members — without scattered spreadsheets."}
                </p>
              </div>
            </div>
          </div>
          <Foot n={6} />
        </Page>

        <Page n={7} onVisible={setActive}>
          <Top />
          <div className="obody">
            <h2 className="opage-title">{lang === "ar" ? "التقارير والذكاء والشراكات" : "Reporting, intelligence and partners"}</h2>
            <p className="opage-lede">
              {lang === "ar"
                ? "التقارير ليست قائمة طويلة. هي طبقة واحدة للإدارة: ماذا يحدث، أين الخطر، وما القرار التالي."
                : "Reporting is not a long list. It is one layer for leadership: what is happening, where the risk is, and what the next decision is."}
            </p>
            <div className="ocols">
              <div className="oblock">
                <h3>{lang === "ar" ? "التقارير التشغيلية" : "Operating reports"}</h3>
                <p>
                  {lang === "ar"
                    ? "مؤشرات الأداء والقمع والأنشطة والأهداف ودورة البيع، مع تنبيه لليدز التي تحتاج تدخلًا، ورؤى حسب المشروع ومصدر العميل. التصدير إلى Excel أو CSV أو PDF، وحزمة جاهزة لاجتماع الإدارة."
                    : "Performance, funnel, activity, targets and sales-cycle reports, with an alert for leads that need intervention, and insight by project and source. Export to Excel, CSV or PDF, and a pack ready for the management meeting."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "الذكاء التنفيذي" : "Executive intelligence"}</h3>
                <p>
                  {lang === "ar"
                    ? "لقطة للأداء، ودرجة لصحة المحفظة، وتوقعات إيراد بسيناريوهات، وأولويات متابعة لليوم. تقييم احتمالية الإغلاق استشاري لدعم القرار — وليس توليد نصوص من نموذج خارجي."
                    : "A snapshot of performance, a portfolio-health score, scenario revenue forecasts, and today’s follow-up priorities. Close-likelihood scoring is advisory decision support — not generated copy from an external model."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "المخاطر والتصنيف" : "Risk and rating"}</h3>
                <p>
                  {lang === "ar"
                    ? "تُقيَّم مخاطر المشروع بدرجات وتنبيهات وتقدّم إنشاء. التصنيف A/B/C للمطوّر يُراجع بلجان واستثناءات مؤقتة، مع سجل تدقيق لكل تغيير. الإدارة ترى الجودة بجانب رقم البيع."
                    : "Project risk is scored with alerts and construction progress. Developer class A/B/C is reviewed with committees and time-bound overrides, with an audit trail for every change. Leadership sees quality beside the sales number."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "الشراكات والموقع" : "Partnerships and the public site"}</h3>
                <p>
                  {lang === "ar"
                    ? "مؤسسات وبرامج التمويل، وشركاء الضيافة وتسجيل الزيارات، وأنشطة الحركة والشراكات — قدرات مساندة حول المحرك التجاري. الموقع العام يعرض المشاريع والوحدات ونموذج التواصل وحاسبة الأقساط، ويُدخل الليد إلى النظام مع تتبّع المصدر."
                    : "Financing institutions and programmes, hospitality partners and visit logging, and movement partnerships — supporting capabilities around the commercial core. The public site shows projects, units, a contact form and a payment calculator, and sends the lead into the system with source tracking."}
                </p>
              </div>
            </div>
          </div>
          <Foot n={7} />
        </Page>

        <Page n={8} onVisible={setActive}>
          <Top />
          <div className="obody">
            <h2 className="opage-title">{lang === "ar" ? "الأمان والموبايل والحوكمة" : "Security, mobile and governance"}</h2>
            <p className="opage-lede">
              {lang === "ar"
                ? "الوصول منضبط، والميدان يعمل على السجلات الحية، والأتمتة تُراجع قبل أن تُنفَّذ."
                : "Access is controlled, the field works on live records, and automation is reviewed before it runs."}
            </p>
            <div className="ocols">
              <div className="oblock">
                <h3>{lang === "ar" ? "الصلاحيات" : "Permissions"}</h3>
                <p>
                  {lang === "ar"
                    ? "364 صلاحية عبر 64 موردًا و35 دورًا. نطاق الرؤية: ملكي، الفريق، الفرع، أو الكل. مصادقة ثنائية بـ TOTP ورموز استرداد، وقفل أمني عند الحاجة. يُراجع سجل الصلاحيات والمالية والليدز، وتُحكم عمليات الاستيراد والتصدير. بوابة المستثمر معزولة عن سجلات المبيعات الداخلية."
                    : "364 permissions across 64 resources and 35 roles. Visibility: own, team, branch, or all. MFA with TOTP and recovery codes, and a security lockdown when needed. Permission, finance and lead audit trails are kept, and import/export is governed. The investor portal is isolated from internal sales records."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "الموبايل" : "Mobile"}</h3>
                <p>
                  {lang === "ar"
                    ? "تجربة iOS وAndroid فوق المنصّة الحية — وليست نظامًا يعمل بالكامل دون اتصال. إشعارات فورية، دخول بالبصمة، التقاط صور ومستندات من الميدان، وربط مكالمات تعاوني مع الفريق، مع واجهة ويب متجاوبة."
                    : "An iOS and Android experience over the live platform — not a fully offline CRM. Push notifications, biometric access, field capture of photos and documents, a collaborative call bridge, and a fully responsive web interface."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "الأتمتة" : "Automation"}</h3>
                <p>
                  {lang === "ar"
                    ? "عند إنشاء ليد أو تغيير مرحلة يمكن تعيين مسؤول أو إنشاء مهمة أو إرسال إشعار — ضمن شروط، ومع تجربة تشغيل وسجل تنفيذ. أتمتة التسويق توقف حملة أو تعدّل ميزانية أو تُخطر الإدارة. لا تُتَّخذ قرارات تجارية مستقلة دون رقابة."
                    : "When a lead is created or a stage changes, an owner can be assigned, a task created, or a notification sent — under conditions, with a dry run and an execution history. Marketing automation can pause a campaign, adjust a budget, or notify management. Autonomous commercial decisions are not taken without oversight."}
                </p>
              </div>
              <div className="oblock">
                <h3>{lang === "ar" ? "المستندات والتواصل" : "Documents and communication"}</h3>
                <p>
                  {lang === "ar"
                    ? "مركز مستندات بصلاحيات عرض، ومسارات تحرير وملء أونلاين، ودردشة تشغيلية داخل الـ CRM ودردشة للمستثمر، مع إشعارات داخل التطبيق والبريد والدفع، وقوالب للمنصّة."
                    : "A document hub with view permissions, online editing and fill flows, operational CRM chat and investor chat, with in-app, email and push notifications, and platform templates."}
                </p>
              </div>
            </div>
          </div>
          <Foot n={8} />
        </Page>

        <Page n={9} onVisible={setActive}>
          <Top />
          <div className="obody">
            <h2 className="opage-title">{lang === "ar" ? "القيمة حسب الدور" : "Value by role"}</h2>
            <p className="opage-lede">
              {lang === "ar"
                ? "كل دور في المؤسسة يحصل على أدوات واضحة وقرار أسرع — دون تشتت بين أنظمة متعددة. الصفحة التالية للباقات التجارية والبيانات الرسمية."
                : "Each role in the organisation gets clear tools and a faster decision — without scattering across multiple systems. The next page covers commercial packages and official company details."}
            </p>
            <div className="ocols">
              {[
                { h: { ar: "المالك / الرئيس التنفيذي", en: "Owner / CEO" }, p: { ar: "شاشة واحدة لصحة المحفظة وتوقّع الإيراد والأولويات، مع وضوح في الصلاحيات والمخاطر.", en: "One screen for portfolio health, revenue forecast and priorities, with clarity on access and risk." } },
                { h: { ar: "مدير التشغيل", en: "COO" }, p: { ar: "تشغيل يومي مترابط: الحجوزات، قفل المخزون، الأتمتة، ومتابعة المخاطر والشراكات من مكان واحد.", en: "Connected daily operations: reservations, inventory lock, automation, and risk and partner follow-up from one place." } },
                { h: { ar: "مدير المبيعات", en: "Sales director" }, p: { ar: "قمع واضح، أهداف قابلة للقياس، ترتيب أداء، وإدارة شبكة الوسطاء دون جداول مشتتة.", en: "A clear funnel, measurable targets, performance ranking, and broker-network management without scattered sheets." } },
                { h: { ar: "المدير المالي", en: "Finance director" }, p: { ar: "عمولات وحسابات وتحصيل المستثمر والرواتب — بأرقام متسقة وقابلة للتدقيق.", en: "Commissions, accounts, investor collections and payroll — with consistent, auditable figures." } },
                { h: { ar: "مدير الموارد البشرية", en: "HR manager" }, p: { ar: "حضور وإجازات ورواتب وأداء الفريق، مع تقارير جاهزة للإدارة.", en: "Attendance, leave, payroll and team performance, with reports ready for leadership." } },
                { h: { ar: "قائد التسويق", en: "Marketing lead" }, p: { ar: "تكلفة الاستفسار وأداء الحملات وربط الإنفاق بالإيراد بتقارير واضحة.", en: "Cost per inquiry, campaign performance, and spend tied to revenue with clear reports." } },
              ].map((b) => (
                <div className="oblock" key={b.h.en}>
                  <h3>{t(b.h)}</h3>
                  <p>{t(b.p)}</p>
                </div>
              ))}
            </div>
          </div>
          <Foot n={9} />
        </Page>

        <Page n={10} onVisible={setActive}>
          <Top investment />
          <div className="obody">
            <h2 className="opage-title">{lang === "ar" ? "الباقات والاستثمار" : "Packages & investment"}</h2>
            <p className="opage-lede">
              {lang === "ar"
                ? "ثلاثة مسارات تنفيذ واضحة — اختاروا مستوى الانتشار والملكية التقنية الأنسب لـ Arkon."
                : "Three clear implementation paths — choose the reach and technical ownership that fit Arkon."}
            </p>
            <div className="oprices">
              {PACKAGES.map((p) => (
                <article key={p.tag} className={`oprice${p.featured ? " is-hot" : ""}`}>
                  {p.ribbon ? <span className="rib">{t(p.ribbon)}</span> : null}
                  <div className="tag">{p.tag}</div>
                  <h3>{t(p.title)}</h3>
                  <p style={{ fontSize: 11, color: "var(--mute)", lineHeight: 1.45, marginBottom: 6 }}>{t(p.desc)}</p>
                  <div className="amt">
                    <b>{p.amount}</b>
                    <span style={{ fontSize: 11, color: "var(--mute)" }}>{lang === "ar" ? " ج.م" : " EGP"}</span>
                  </div>
                  {p.was ? <div className="was">{t(p.was)}</div> : null}
                  <ul>
                    {p.items.map((item) => (
                      <li key={item.en}>{t(item)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <aside className="olegal">
              <strong>Rootk Systems</strong>
              <span style={{ display: "block", fontSize: 10, color: "var(--brass-deep)", marginTop: 2 }}>
                {lang === "ar" ? "البيانات الرسمية للشركة" : "Official company details"}
              </span>
              <div className="lg">
                <div>
                  <label>{lang === "ar" ? "البطاقة الضريبية" : "Tax card"}</label>
                  <b>{t(LEGAL.tax)}</b>
                </div>
                <div>
                  <label>{lang === "ar" ? "السجل التجاري" : "Commercial registry"}</label>
                  <b>{t(LEGAL.reg)}</b>
                </div>
                <p>{t(LEGAL.address)}</p>
              </div>
            </aside>
            <p style={{ marginTop: 8, fontSize: 12, color: "var(--mute)" }}>
              {lang === "ar"
                ? "Rootk Systems — جاهزون لبدء التنفيذ مع Arkon Developments."
                : "Rootk Systems — ready to begin implementation with Arkon Developments."}
            </p>
          </div>
          <Foot n={10} />
        </Page>
      </div>
    </section>
  );
}
