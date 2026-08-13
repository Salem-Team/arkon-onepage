import type { Tx } from "./lang";

export const DEMO = {
  url: "https://arkon.rootk-eg.com/login",
  host: "arkon.rootk-eg.com/login",
  email: "admin@crm.com",
  password: "password",
};

export const NAV: { id: string; label: Tx }[] = [
  { id: "overview", label: { ar: "الغلاف", en: "Cover" } },
  { id: "product", label: { ar: "الفيتشرز", en: "Features" } },
  { id: "offer", label: { ar: "العرض", en: "Offer" } },
];

export const PACKAGES: {
  tag: string;
  featured?: boolean;
  title: Tx;
  desc: Tx;
  amount: string;
  was?: Tx;
  ribbon?: Tx;
  note?: Tx;
  items: Tx[];
}[] = [
  {
    tag: "Offer",
    featured: true,
    title: { ar: "السيستم كامل", en: "The full system" },
    desc: { ar: "١٥٠ الف جنيه شامل السيستم وتطبيق الموبايل والموقع. وصيانة مجانية لمدة ١٢ شهر.", en: "150,000 EGP includes the system, the mobile app and the website. Plus twelve months of maintenance, free." },
    amount: "150,000",
    ribbon: { ar: "صيانة ١٢ شهر مجاني", en: "12 months maintenance — free" },
    note: { ar: "اوفر لاي شركه تيجي من جانب Arkon", en: "Offer for any company coming from Arkon" },
    items: [
      { ar: "السيستم على الويب", en: "The web system" },
      { ar: "تطبيق موبايل iOS و Android باسم ولوجو الشركه", en: "iOS & Android mobile app with the company name and logo" },
      { ar: "الموقع الالكتروني", en: "The website" },
      { ar: "صيانة مجانية لمدة ١٢ شهر", en: "Twelve months of maintenance — free" },
    ],
  },
];

export const LEGAL = {
  tax: { ar: "٧٦٩-٥٢٩-٦٢٣", en: "769-529-623" },
  reg: { ar: "٢٨٤٣٢٨", en: "284328" },
  address: {
    ar: "مكتب ٩ — الدور الأرضي، عقار رقم ٦٠، شارع هشام لبيب متفرع من مصطفى النحاس — مدينة نصر، القاهرة",
    en: "Office 9 — Ground Floor, Property No. 60, Hisham Labib Street off Mustafa El-Nahhas — Nasr City, Cairo",
  },
};

export type NodeId =
  | "leads"
  | "pipeline"
  | "inventory"
  | "reservation"
  | "closed"
  | "contract"
  | "commission"
  | "investor"
  | "finance"
  | "intel";

export const HERO_NODES: {
  id: NodeId;
  t: Tx;
  d: Tx;
  caps: Tx[];
  value: Tx;
}[] = [
  {
    id: "leads",
    t: { ar: "ليدز", en: "Leads" },
    d: { ar: "كل استفسار يدخل مساحة عمل واحدة مهما كان مصدره: موقع، حملة، استيراد أو وسيط.", en: "Every inquiry enters one workspace — website, campaign, import or broker." },
    caps: [
      { ar: "التقاط من كل القنوات", en: "Multi-channel intake" },
      { ar: "إسناد المصدر والحملة", en: "Source & campaign attribution" },
      { ar: "كشف التكرار قبل تشتيت الملكية", en: "Duplicate check before ownership splits" },
      { ar: "توزيع على المندوب أو الوسيط", en: "Route to salesperson or broker" },
    ],
    value: { ar: "لا يضيع استفسار في واتساب أو شيت.", en: "No inquiry is lost in WhatsApp or a spreadsheet." },
  },
  {
    id: "pipeline",
    t: { ar: "البايبلاين", en: "Pipeline" },
    d: { ar: "كل فرصة لها مرحلة تالية واضحة، ومتابعة مسجّلة، وانتقال لا يتم إلا بشروط الفريق.", en: "Every opportunity has a next step, a recorded follow-up, and a controlled stage move." },
    caps: [
      { ar: "مراحل قابلة للضبط", en: "Configurable stages" },
      { ar: "متابعة قادمة إلزامية", en: "Required next follow-up" },
      { ar: "سجل الانتقال", en: "Stage history" },
      { ar: "فرص معرّضة للضياع", en: "At-risk opportunities" },
    ],
    value: { ar: "الإدارة ترى أين تتوقف الصفقات ولماذا.", en: "Leadership sees where deals stall — and why." },
  },
  {
    id: "inventory",
    t: { ar: "المخزون", en: "Inventory" },
    d: { ar: "المبيعات تبيع من نفس مصدر الوحدات: مطوّر، مشروع، مبنى، دور، وحدة، سعر وحالة.", en: "Sales sell from one unit truth: developer, project, building, floor, unit, price and status." },
    caps: [
      { ar: "هيكل المشروع كامل", en: "Full project hierarchy" },
      { ar: "حالة الوحدة لحظيًا", en: "Live unit status" },
      { ar: "خطة سداد مرتبطة", en: "Linked payment plan" },
      { ar: "لا شيت مخزون منفصل", en: "No separate inventory file" },
    ],
    value: { ar: "لا تُباع الوحدة مرتين، ولا يُعرض سعر قديم.", en: "Units are not double-sold. Prices stay current." },
  },
  {
    id: "reservation",
    t: { ar: "الحجز", en: "Reservation" },
    d: { ar: "اختيار الوحدة يفتح حجزًا يحتاج اعتمادًا، ثم يُقفل المخزون حتى لا يتصرف فيه أحد آخر.", en: "Selecting a unit opens a reservation for approval, then locks inventory so no one else can take it." },
    caps: [
      { ar: "حجز متعدد الوحدات", en: "Multi-unit reservation" },
      { ar: "سير اعتماد", en: "Approval workflow" },
      { ar: "قفل المخزون", en: "Inventory lock" },
      { ar: "PDF الحجز", en: "Reservation PDF" },
    ],
    value: { ar: "القرار التجاري يحمي المخزون فورًا.", en: "The commercial decision protects inventory immediately." },
  },
  {
    id: "closed",
    t: { ar: "إغلاق الصفقة", en: "Closed Won" },
    d: { ar: "الإغلاق ليس نقرة. اعتماد، توزيعات، حوافز، ثم انتقال للعقد.", en: "Closing is not a click. Approval, distributions, incentives — then the contract." },
    caps: [
      { ar: "اعتماد الصفقة", en: "Deal approval" },
      { ar: "توزيع القيمة", en: "Value distribution" },
      { ar: "حوافز الصفقة", en: "Deal incentives" },
      { ar: "سبب الخسارة عند الفقد", en: "Lost-reason discipline" },
    ],
    value: { ar: "كل صفقة مغلقة لها أثر واضح على العمولة والمالية.", en: "Every closed deal has a clear effect on commission and finance." },
  },
  {
    id: "contract",
    t: { ar: "العقد", en: "Contract" },
    d: { ar: "معاينة عقد البيع، تثبيته، وإصدار نسخة للعميل من نفس مسار الصفقة.", en: "Preview the sale contract, finalize it, and issue the client PDF from the same deal path." },
    caps: [
      { ar: "معاينة العقد", en: "Contract preview" },
      { ar: "تثبيت نهائي", en: "Finalization" },
      { ar: "PDF رسمي", en: "Official PDF" },
    ],
    value: { ar: "العقد يخرج من الصفقة لا من مجلد منفصل.", en: "The contract comes from the deal — not a separate folder." },
  },
  {
    id: "commission",
    t: { ar: "العمولة", en: "Commission" },
    d: { ar: "من قيمة الصفقة تُحسب النسبة والضريبة والتوزيعات والأقساط والإيصالات.", en: "From deal value: rate, tax, splits, installments and receipts are calculated and tracked." },
    caps: [
      { ar: "قواعد قابلة للضبط", en: "Configurable rules" },
      { ar: "توزيع الأدوار", en: "Role distribution" },
      { ar: "أقساط وتحصيل", en: "Installments & receipts" },
      { ar: "ترحيل اختياري للحسابات", en: "Optional ledger posting" },
    ],
    value: { ar: "العمولة لم تعد شيتًا يُعاد حسابه يدويًا.", en: "Commission is no longer a spreadsheet recalculated by hand." },
  },
  {
    id: "investor",
    t: { ar: "المستثمر", en: "Investor" },
    d: { ar: "بعد البيع تستمر العلاقة: حساب، أقساط، كشوف، مستندات ودردشة.", en: "After the sale the relationship continues: account, installments, statements, documents and chat." },
    caps: [
      { ar: "بوابة المستثمر", en: "Investor portal" },
      { ar: "جدول الأقساط", en: "Installment schedule" },
      { ar: "كشوف ومستندات", en: "Statements & documents" },
      { ar: "تواصل منظّم", en: "Structured communication" },
    ],
    value: { ar: "خدمة ما بعد البيع جزء من النظام لا من البريد.", en: "After-sales service lives in the system — not in email." },
  },
  {
    id: "finance",
    t: { ar: "المالية", en: "Finance" },
    d: { ar: "الصفقة المغلقة والإيصال والراتب يمكن أن تتحول إلى قيد وتقرير.", en: "A closed deal, a receipt and a payroll run can become a journal and a report." },
    caps: [
      { ar: "قيود مزدوجة", en: "Double-entry journals" },
      { ar: "إيراد وعمولة وتحصيل", en: "Revenue, commission, collections" },
      { ar: "قائمة دخل وميزانية", en: "P&L and balance sheet" },
      { ar: "بدون مطابقة كشف بنك", en: "No bank-statement matching claimed" },
    ],
    value: { ar: "المالية ترى أثر التشغيل لا ملخصًا متأخرًا.", en: "Finance sees the effect of operations — not a late summary." },
  },
  {
    id: "intel",
    t: { ar: "ذكاء تنفيذي", en: "Executive Intelligence" },
    d: { ar: "البايبلاين، التحصيل، المخاطر، التوقّع وصحة المحفظة على شاشة واحدة.", en: "Pipeline, collections, risk, forecast and portfolio health on one screen." },
    caps: [
      { ar: "صحة المحفظة", en: "Portfolio health" },
      { ar: "توقّع إيراد", en: "Revenue forecast" },
      { ar: "تنبيهات للمتابعة المتأخرة", en: "Overdue follow-up alerts" },
      { ar: "دعم قرار لا توليد نصوص", en: "Decision support — not generated copy" },
    ],
    value: { ar: "الإدارة تسأل النظام لا تنتظر التقرير الأسبوعي.", en: "Leadership asks the system — not the weekly report." },
  },
];

export const ENGINE: {
  id: string;
  n: string;
  t: Tx;
  problem: Tx;
  how: Tx;
  controls: Tx[];
  outcome: Tx;
  mock: NodeId;
}[] = [
  {
    id: "acq",
    n: "01",
    t: { ar: "اكتساب الليد", en: "Lead Acquisition" },
    problem: { ar: "الاستفسارات تصل من الموقع والحملات والوسطاء والاستيراد — ثم تتفرق بين الشيت والواتساب.", en: "Inquiries arrive from the website, campaigns, brokers and imports — then scatter across sheets and WhatsApp." },
    how: { ar: "ROOTK يجمعها في مساحة ليد واحدة، يسجّل المصدر والحملة، ويفحص التكرار قبل أن تُوزَّع.", en: "ROOTK gathers them into one lead workspace, records source and campaign, and checks duplicates before assignment." },
    controls: [
      { ar: "موقع، API، استيراد، إدخال يدوي", en: "Website, API, import, manual" },
      { ar: "مصدر وحملة وUTM", en: "Source, campaign, UTM" },
      { ar: "كشف التكرار", en: "Duplicate detection" },
      { ar: "توزيع تلقائي أو للوسيط", en: "Auto or broker routing" },
    ],
    outcome: { ar: "كل استفسار يدخل مسارًا محكومًا بدل أن يصبح صفًا ضائعًا في شيت.", en: "Every inquiry enters a controlled workflow instead of becoming another lost spreadsheet row." },
    mock: "leads",
  },
  {
    id: "qual",
    n: "02",
    t: { ar: "التأهيل", en: "Qualification" },
    problem: { ar: "الفريق يصرف وقتًا على استفسارات بلا ميزانية أو بلا جدية.", en: "The team spends time on inquiries with no budget or no intent." },
    how: { ar: "يُسجَّل التقييم والمتطلبات والملاحظات على نفس سجل الليد قبل نقله لفرصة.", en: "Rating, requirements and notes sit on the same lead record before it becomes an opportunity." },
    controls: [
      { ar: "تقييم أولوية", en: "Priority rating" },
      { ar: "ميزانية وتفضيلات", en: "Budget and preferences" },
      { ar: "ملاحظات ومرفقات", en: "Notes and attachments" },
    ],
    outcome: { ar: "وقت المبيعات يذهب للفرص الجدية.", en: "Sales time goes to serious opportunities." },
    mock: "leads",
  },
  {
    id: "follow",
    n: "03",
    t: { ar: "المتابعة", en: "Follow-up" },
    problem: { ar: "بعد أول مكالمة تختفي الفرصة إذا لم يُحدَّد موعد تالٍ.", en: "After the first call, the opportunity disappears if no next date is set." },
    how: { ar: "كل ليد وفرصة لهما متابعة قادمة، وسجل مكالمات واجتماعات ومعاينات، وتنبيه عند التأخير.", en: "Every lead and opportunity has a next follow-up, an activity ledger, and an alert when it is overdue." },
    controls: [
      { ar: "موعد المتابعة القادم", en: "Next follow-up" },
      { ar: "مكالمة، اجتماع، معاينة، مهمة", en: "Call, meeting, visit, task" },
      { ar: "متأخر / معرّض", en: "Overdue / at risk" },
    ],
    outcome: { ar: "لا تُدار العلاقة من ذاكرة المندوب.", en: "The relationship is not managed from a salesperson’s memory." },
    mock: "pipeline",
  },
  {
    id: "match",
    n: "04",
    t: { ar: "مطابقة الوحدة", en: "Property Matching" },
    problem: { ar: "المندوب يبحث في شيت عن وحدة تناسب ميزانية العميل وموقعه.", en: "The salesperson searches a sheet for a unit that fits budget and location." },
    how: { ar: "متطلبات المشتري تُقابل المخزون الحي وتُرتَّب حسب نسبة التوافق.", en: "Buyer requirements meet live inventory and are ranked by fit." },
    controls: [
      { ar: "ميزانية ومساحة وغرفة", en: "Budget, area, bedrooms" },
      { ar: "وحدات مرشّحة مع السبب", en: "Ranked units with reasons" },
      { ar: "من المطابقة إلى حجز", en: "From match to reservation" },
    ],
    outcome: { ar: "العرض للعميل مبني على مخزون حقيقي لا على تخمين.", en: "The offer is based on live inventory — not a guess." },
    mock: "inventory",
  },
  {
    id: "res",
    n: "05",
    t: { ar: "الحجز", en: "Reservation" },
    problem: { ar: "الوحدة تُوعد لعميلين في نفس الوقت إذا لم يُقفل المخزون.", en: "A unit can be promised to two buyers if inventory is not locked." },
    how: { ar: "الحجز يطلب اعتمادًا ثم يغيّر الحالة إلى محجوز ويقفل الوحدة.", en: "Reservation requests approval, then moves status to reserved and locks the unit." },
    controls: [
      { ar: "اعتماد الحجز", en: "Reservation approval" },
      { ar: "قفل المخزون", en: "Inventory lock" },
      { ar: "مستند الحجز", en: "Reservation document" },
    ],
    outcome: { ar: "الوعد للعميل محمي تشغيليًا.", en: "The promise to the buyer is operationally protected." },
    mock: "reservation",
  },
  {
    id: "won",
    n: "06",
    t: { ar: "إغلاق الصفقة", en: "Closed Won" },
    problem: { ar: "إعلان الإغلاق يحدث في الشات قبل أن تعتمده الإدارة أو تُوزَّع القيمة.", en: "“Closed” is announced in chat before management approves or value is allocated." },
    how: { ar: "Closed Won مسار اعتماد: توزيعات، حوافز، ثم حالة تجارية مغلقة.", en: "Closed Won is an approval path: distributions, incentives, then a commercially closed state." },
    controls: [
      { ar: "اعتماد الإدارة", en: "Management approval" },
      { ar: "توزيع الحصص", en: "Share distribution" },
      { ar: "أسباب الخسارة إن فشلت", en: "Lost reasons if it fails" },
    ],
    outcome: { ar: "الإغلاق حدث مالي وتشغيلي لا رسالة.", en: "Closing is an operational and financial event — not a message." },
    mock: "closed",
  },
  {
    id: "con",
    n: "07",
    t: { ar: "العقد", en: "Contract" },
    problem: { ar: "العقد يُكتب خارج النظام فيتعذّر ربطه بالوحدة والعمولة.", en: "The contract is written outside the system, so it cannot be tied to the unit and commission." },
    how: { ar: "عقد البيع يُعايَن ويُثبَّت ويُصدَّر PDF من الصفقة نفسها.", en: "The sale contract is previewed, finalized and issued as PDF from the deal itself." },
    controls: [
      { ar: "معاينة", en: "Preview" },
      { ar: "تثبيت", en: "Finalize" },
      { ar: "PDF للعميل", en: "Client PDF" },
    ],
    outcome: { ar: "المستند الرسمي ابن الصفقة.", en: "The official document belongs to the deal." },
    mock: "contract",
  },
  {
    id: "com",
    n: "08",
    t: { ar: "العمولة", en: "Commission" },
    problem: { ar: "حساب العمولة والضريبة وتوزيع الأدوار يتم في شيت منفصل عن الصفقة.", en: "Commission, tax and splits are calculated in a sheet detached from the deal." },
    how: { ar: "قيمة الصفقة × القاعدة → إجمالي → ضريبة → صافٍ → حصص → أقساط → إيصالات.", en: "Deal value × rule → gross → tax → net → shares → installments → receipts." },
    controls: [
      { ar: "قواعد ومندوب ووسيط", en: "Rules, salesperson, broker" },
      { ar: "ضريبة واستقطاع", en: "VAT and withholding" },
      { ar: "مستحق ومتأخر", en: "Due and overdue" },
    ],
    outcome: { ar: "كل جنيه عمولة له مصدر صفقة ومسار تحصيل.", en: "Every commission pound has a deal source and a collection path." },
    mock: "commission",
  },
  {
    id: "inv",
    n: "09",
    t: { ar: "المستثمر", en: "Investor" },
    problem: { ar: "بعد التوقيع يختفي العميل من نظام المبيعات ويُدار من الإيميل.", en: "After signing, the buyer disappears from sales and is managed by email." },
    how: { ar: "يُفتح حساب مستثمر مرتبط بالعقد وجدول الأقساط والمستندات والبوابة.", en: "An investor account opens, linked to the contract, installment plan, documents and portal." },
    controls: [
      { ar: "محفظة ووحدات", en: "Portfolio and units" },
      { ar: "أقساط وكشوف", en: "Installments and statements" },
      { ar: "دردشة وإشعارات", en: "Chat and notifications" },
    ],
    outcome: { ar: "العلاقة بعد البيع تبقى داخل نفس المحرك.", en: "The post-sale relationship stays inside the same engine." },
    mock: "investor",
  },
  {
    id: "col",
    n: "10",
    t: { ar: "التحصيل", en: "Collection" },
    problem: { ar: "الأقساط المستحقة والمتأخرة لا تظهر للمبيعات والمالية في نفس اللحظة.", en: "Due and overdue installments are not visible to sales and finance at the same moment." },
    how: { ar: "كل قسط له تاريخ ورصيد وحالة، والكشف يصدر PDF أو CSV.", en: "Each installment has a date, balance and status. Statements export as PDF or CSV." },
    controls: [
      { ar: "مستحق / متأخر", en: "Due / overdue" },
      { ar: "تسويات", en: "Adjustments" },
      { ar: "كشوف", en: "Statements" },
    ],
    outcome: { ar: "التحصيل جزء من التشغيل اليومي.", en: "Collections are part of daily operations." },
    mock: "investor",
  },
  {
    id: "acc",
    n: "11",
    t: { ar: "المحاسبة", en: "Accounting" },
    problem: { ar: "المالية تعيد إدخال ما حدث في المبيعات.", en: "Finance re-enters what already happened in sales." },
    how: { ar: "الصفقة والإيصال والراتب يمكن ترحيلها كقيود، ثم تظهر في الدخل والميزانية والتدفّق.", en: "Deals, receipts and payroll can post as journals, then appear in P&L, balance sheet and cash flow." },
    controls: [
      { ar: "مسودة / ترحيل / إلغاء", en: "Draft / post / void" },
      { ar: "دفتر أستاذ", en: "General ledger" },
      { ar: "تقارير مالية", en: "Financial reports" },
    ],
    outcome: { ar: "التشغيل يغذي الدفاتر دون إعادة الكتابة.", en: "Operations feed the books without retyping." },
    mock: "finance",
  },
  {
    id: "ex",
    n: "12",
    t: { ar: "الذكاء التنفيذي", en: "Executive Intelligence" },
    problem: { ar: "الإدارة تنتظر تجميع التقارير من كل قسم.", en: "Leadership waits for every department to compile a report." },
    how: { ar: "شاشة واحدة: قيمة البايبلاين، التوقّع، التحصيل، الصحة، المخاطر، وتنبيهات المتابعة.", en: "One screen: pipeline value, forecast, collections, health, risk and follow-up alerts." },
    controls: [
      { ar: "مؤشرات حية", en: "Live KPIs" },
      { ar: "تنبيهات استشارية", en: "Advisory alerts" },
      { ar: "توقّع سيناريو", en: "Scenario forecast" },
    ],
    outcome: { ar: "القرار يعتمد على التشغيل الحي.", en: "Decisions rest on live operations." },
    mock: "intel",
  },
];

export const BEFORE = [
  { ar: "ليدز في الشيت والواتساب", en: "Leads in sheets and WhatsApp" },
  { ar: "مخزون في ملف منفصل", en: "Inventory in a separate file" },
  { ar: "عمولات تُحسب يدويًا", en: "Commissions calculated by hand" },
  { ar: "تقارير تُجمع أسبوعيًا", en: "Reports compiled weekly" },
  { ar: "أنظمة لا تتحدث معًا", en: "Systems that do not speak" },
];

export const WITH = [
  { ar: "مساحة ليد واحدة من كل القنوات", en: "One lead workspace from every channel" },
  { ar: "المخزون والمبيعات من مصدر واحد", en: "Inventory and sales from one truth" },
  { ar: "عمولة مربوطة بالصفقة", en: "Commission tied to the deal" },
  { ar: "رؤية تنفيذية حية", en: "Live executive visibility" },
  { ar: "محرك تجاري متصل", en: "One connected commercial engine" },
];
