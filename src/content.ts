import type { Tx } from "./lang";

export const ROLES: {
  id: string;
  t: Tx;
  kpis: { l: Tx; v: string }[];
  sees: Tx;
  dash: Tx[];
}[] = [
  {
    id: "ceo",
    t: { ar: "الرئيس التنفيذي", en: "CEO" },
    kpis: [
      { l: { ar: "توقّع 90 يوم", en: "90-day forecast" }, v: "62M" },
      { l: { ar: "صحة المحفظة", en: "Portfolio health" }, v: "82" },
      { l: { ar: "بايبلاين", en: "Pipeline" }, v: "186M" },
      { l: { ar: "مخاطر عالية", en: "High risk" }, v: "1" },
    ],
    sees: { ar: "الإيراد، التوقّع، صحة المحفظة ومخاطر المشروع — بلا تفاصيل تشغيل يومية.", en: "Revenue, forecast, portfolio health and project risk — without daily operational noise." },
    dash: [
      { ar: "توقّع الإيراد", en: "Revenue forecast" },
      { ar: "صحة المحفظة", en: "Portfolio health" },
      { ar: "مخاطر المشاريع", en: "Project risk" },
      { ar: "البايبلاين", en: "Pipeline" },
    ],
  },
  {
    id: "coo",
    t: { ar: "مدير التشغيل", en: "COO" },
    kpis: [
      { l: { ar: "حجوزات معلّقة", en: "Pending reservations" }, v: "11" },
      { l: { ar: "وحدات مقفلة", en: "Locked units" }, v: "38" },
      { l: { ar: "متابعة متأخرة", en: "Overdue follow-ups" }, v: "7" },
      { l: { ar: "SLA وسطاء", en: "Broker SLA" }, v: "94%" },
    ],
    sees: { ar: "سلامة المسار من الليد حتى قفل المخزون، والاختناقات بين الفرق.", en: "Path integrity from lead to inventory lock, and bottlenecks between teams." },
    dash: [
      { ar: "الحجوزات", en: "Reservations" },
      { ar: "قفل المخزون", en: "Inventory lock" },
      { ar: "المخاطر التشغيلية", en: "Operational risk" },
      { ar: "الوسطاء", en: "Brokers" },
    ],
  },
  {
    id: "sd",
    t: { ar: "مدير المبيعات", en: "Sales Director" },
    kpis: [
      { l: { ar: "تحويل", en: "Conversion" }, v: "18.6%" },
      { l: { ar: "تارجت الفريق", en: "Team target" }, v: "76%" },
      { l: { ar: "فرص نشطة", en: "Active opps" }, v: "97" },
      { l: { ar: "وسطاء", en: "Brokers" }, v: "24" },
    ],
    sees: { ar: "البايبلاين، التارجت، التحويل، حمل الفريق وأداء الوسطاء.", en: "Pipeline, targets, conversion, team load and broker performance." },
    dash: [
      { ar: "البايبلاين", en: "Pipeline" },
      { ar: "التارجت", en: "Targets" },
      { ar: "التحويل", en: "Conversion" },
      { ar: "الوسطاء", en: "Brokers" },
    ],
  },
  {
    id: "fd",
    t: { ar: "المدير المالي", en: "Finance Director" },
    kpis: [
      { l: { ar: "تحصيل الشهر", en: "Collections" }, v: "12.4M" },
      { l: { ar: "عمولة مستحقة", en: "Commission due" }, v: "4.8M" },
      { l: { ar: "إيراد مرحّل", en: "Posted revenue" }, v: "41M" },
      { l: { ar: "متأخر أقساط", en: "Overdue" }, v: "1.1M" },
    ],
    sees: { ar: "الإيراد، العمولة، التحصيل، القيود وقائمة الدخل.", en: "Revenue, commission, collections, journals and P&L." },
    dash: [
      { ar: "الإيراد", en: "Revenue" },
      { ar: "العمولة", en: "Commission" },
      { ar: "التحصيل", en: "Collections" },
      { ar: "دفتر الأستاذ", en: "Ledger" },
    ],
  },
  {
    id: "hr",
    t: { ar: "مدير الموارد", en: "HR Manager" },
    kpis: [
      { l: { ar: "موظفون", en: "Employees" }, v: "86" },
      { l: { ar: "حضور اليوم", en: "Today attendance" }, v: "94%" },
      { l: { ar: "إجازات مفتوحة", en: "Open leave" }, v: "9" },
      { l: { ar: "رواتب الفترة", en: "Payroll period" }, v: "Ready" },
    ],
    sees: { ar: "الحضور، الإجازات، الرواتب والأداء الشهري — متصل بالمنظمة لا بمعزل عنها.", en: "Attendance, leave, payroll and monthly scores — connected to the organisation, not isolated." },
    dash: [
      { ar: "الحضور", en: "Attendance" },
      { ar: "الإجازات", en: "Leave" },
      { ar: "الرواتب", en: "Payroll" },
      { ar: "الأداء", en: "Performance" },
    ],
  },
  {
    id: "mkt",
    t: { ar: "قائد التسويق", en: "Marketing Lead" },
    kpis: [
      { l: { ar: "إنفاق", en: "Spend" }, v: "1.8M" },
      { l: { ar: "CPL", en: "CPL" }, v: "980" },
      { l: { ar: "ROI", en: "ROI" }, v: "34×" },
      { l: { ar: "ليدز الحملة", en: "Campaign leads" }, v: "1,842" },
    ],
    sees: { ar: "الإنفاق، تكلفة الليد، الإسناد، والإيراد الناتج عن الحملة.", en: "Spend, cost per lead, attribution, and revenue the campaign produced." },
    dash: [
      { ar: "الإنفاق", en: "Spend" },
      { ar: "CPL", en: "CPL" },
      { ar: "الإسناد", en: "Attribution" },
      { ar: "العائد", en: "ROI" },
    ],
  },
  {
    id: "sm",
    t: { ar: "مدير مبيعات", en: "Sales Manager" },
    kpis: [
      { l: { ar: "فريق أ", en: "Team A" }, v: "12" },
      { l: { ar: "متأخر", en: "Overdue" }, v: "4" },
      { l: { ar: "اجتماعات الأسبوع", en: "Week meetings" }, v: "31" },
      { l: { ar: "إنجاز التارجت", en: "Target" }, v: "81%" },
    ],
    sees: { ar: "حمل المندوبين، المتابعات المتأخرة، والاجتماعات — يوم التشغيل.", en: "Rep load, overdue follow-ups and meetings — the operating day." },
    dash: [
      { ar: "الفريق", en: "Team" },
      { ar: "المتابعة", en: "Follow-up" },
      { ar: "التارجت", en: "Targets" },
      { ar: "الأنشطة", en: "Activities" },
    ],
  },
  {
    id: "rep",
    t: { ar: "مندوب مبيعات", en: "Salesperson" },
    kpis: [
      { l: { ar: "ليدز اليوم", en: "Today’s leads" }, v: "9" },
      { l: { ar: "متابعة الآن", en: "Due now" }, v: "3" },
      { l: { ar: "تارجت الشهر", en: "Month target" }, v: "76%" },
      { l: { ar: "أفضل مطابقة", en: "Best match" }, v: "92%" },
    ],
    sees: { ar: "ليدز اليوم، المتابعة التالية، الوحدة المناسبة، ومهمة واضحة.", en: "Today’s leads, the next follow-up, the right unit, and a clear task." },
    dash: [
      { ar: "الليدز", en: "Leads" },
      { ar: "المتابعة", en: "Follow-up" },
      { ar: "الوحدات", en: "Units" },
      { ar: "المهام", en: "Tasks" },
    ],
  },
];

export type ExplorerCard = {
  title: Tx;
  one: Tx;
  how: Tx[];
  why: Tx;
};

export const EXPLORER: { id: string; t: Tx; cards: ExplorerCard[] }[] = [
  {
    id: "sales",
    t: { ar: "المبيعات", en: "Sales" },
    cards: [
      {
        title: { ar: "التقاط الليد متعدد القنوات", en: "Multi-channel lead intake" },
        one: { ar: "يجمع الاستفسارات من الموقع والحملة والـ API والاستيراد والإدخال اليدوي في سجل واحد.", en: "Collects inquiries from website, campaign, API, import and manual entry into one record." },
        how: [
          { ar: "المصدر يصل", en: "Source arrives" },
          { ar: "يُنشأ سجل ليد", en: "Lead record created" },
          { ar: "يُحفظ المصدر والحملة", en: "Source and campaign stored" },
        ],
        why: { ar: "لا يبقى استفسار خارج النظام.", en: "No inquiry stays outside the system." },
      },
      {
        title: { ar: "كشف الليد المكرر", en: "Duplicate lead detection" },
        one: { ar: "يفحص تطابق الهاتف والبريد قبل أن يتفتت سجل العميل بين مندوبين.", en: "Checks phone and email matches before a customer record fragments across two reps." },
        how: [
          { ar: "هاتف / بريد", en: "Phone / email" },
          { ar: "اكتشاف التطابق", en: "Match detection" },
          { ar: "مراجعة ثم دمج أو نقل ملكية", en: "Review, then merge or transfer" },
        ],
        why: { ar: "يحمي ملكية المبيعات ويمنع سجلين لنفس الشخص.", en: "Protects sales ownership and prevents two records for one person." },
      },
      {
        title: { ar: "التوزيع التلقائي", en: "Automatic assignment" },
        one: { ar: "يوجّه الليد للمندوب الأنسب حسب الحمل أو قاعدة الوسيط أو تعيين المدير.", en: "Routes the lead to the right person by load, broker rule or manager assignment." },
        how: [
          { ar: "قاعدة التوزيع", en: "Routing rule" },
          { ar: "أقل حمل أو وسيط", en: "Lowest load or broker" },
          { ar: "ملكية واضحة", en: "Clear ownership" },
        ],
        why: { ar: "الاستجابة لا تعتمد على من فتح الشات أولًا.", en: "Response time does not depend on who opened the chat first." },
      },
      {
        title: { ar: "انتقال المرحلة المنضبط", en: "Controlled stage movement" },
        one: { ar: "كل حركة في البايبلاين تُسجَّل ويمكن أن تشترط متابعة أو ملاحظة أو وحدة.", en: "Every pipeline move is recorded and can require a follow-up, a note or a unit." },
        how: [
          { ar: "طلب الانتقال", en: "Move requested" },
          { ar: "فحص الشرط", en: "Condition checked" },
          { ar: "سجل المرحلة", en: "Stage history written" },
        ],
        why: { ar: "الإدارة تعرف كيف وصلت الفرصة لمرحلتها الحالية.", en: "Management knows how the opportunity reached its current stage." },
      },
    ],
  },
  {
    id: "inventory",
    t: { ar: "المخزون", en: "Inventory" },
    cards: [
      {
        title: { ar: "مصدر واحد للوحدة", en: "One source of unit truth" },
        one: { ar: "المطوّر والمشروع والمبنى والدور والوحدة والسعر والحالة في هيكل واحد.", en: "Developer, project, building, floor, unit, price and status in one hierarchy." },
        how: [
          { ar: "اختيار المشروع", en: "Select project" },
          { ar: "اختيار المبنى والدور", en: "Select building and floor" },
          { ar: "حالة الوحدة", en: "Unit status" },
        ],
        why: { ar: "المبيعات لا تحتاج شيت مخزون موازي.", en: "Sales do not need a parallel inventory sheet." },
      },
      {
        title: { ar: "قفل المخزون عند الحجز", en: "Inventory lock on reservation" },
        one: { ar: "بعد اعتماد الحجز تتحول الوحدة إلى محجوز ولا تُعرض لعميل آخر كمتاحة.", en: "After reservation approval the unit becomes reserved and is no longer offered as available." },
        how: [
          { ar: "اعتماد", en: "Approval" },
          { ar: "تغيير الحالة", en: "Status change" },
          { ar: "قفل", en: "Lock" },
        ],
        why: { ar: "يمنع البيع المزدوج.", en: "Prevents double selling." },
      },
    ],
  },
  {
    id: "deals",
    t: { ar: "الصفقات", en: "Deals" },
    cards: [
      {
        title: { ar: "توزيع قيمة الصفقة", en: "Deal value distribution" },
        one: { ar: "توزيع القيمة التجارية على المندوب والوسيط والمديرين وحصة الشركة.", en: "Allocate commercial value across salesperson, broker, managers and company share." },
        how: [
          { ar: "إغلاق معتمد", en: "Approved close" },
          { ar: "حصص الأدوار", en: "Role shares" },
          { ar: "أساس العمولة", en: "Commission basis" },
        ],
        why: { ar: "لا تُحسب الحصص خارج الصفقة.", en: "Shares are not calculated outside the deal." },
      },
      {
        title: { ar: "عقد البيع من الصفقة", en: "Sale contract from the deal" },
        one: { ar: "المعاينة والتثبيت وPDF العقد جزء من مسار الإغلاق.", en: "Preview, finalization and contract PDF are part of the close path." },
        how: [
          { ar: "معاينة", en: "Preview" },
          { ar: "تثبيت", en: "Finalize" },
          { ar: "إصدار", en: "Issue" },
        ],
        why: { ar: "العقد لا ينفصل عن الوحدة والعمولة.", en: "The contract does not detach from the unit and commission." },
      },
    ],
  },
  {
    id: "finance",
    t: { ar: "المالية", en: "Finance" },
    cards: [
      {
        title: { ar: "من الصفقة إلى القيد", en: "From deal to journal" },
        one: { ar: "الصفقة المغلقة وإيصال العمولة ومدفوع المستثمر والراتب يمكن ترحيلها لدفتر الأستاذ.", en: "A closed deal, commission receipt, investor payment and payroll run can post to the ledger." },
        how: [
          { ar: "حدث تشغيلي", en: "Operational event" },
          { ar: "مسودة قيد", en: "Draft journal" },
          { ar: "ترحيل", en: "Post" },
        ],
        why: { ar: "المالية لا تعيد كتابة ما حدث.", en: "Finance does not rewrite what already happened." },
      },
      {
        title: { ar: "إدارة تشغيلية للعملة", en: "Operational currency management" },
        one: { ar: "أسعار صرف، هامش، اعتماد وتقارير تحويل — ليست خدمات مصرفية.", en: "Rates, markup, approval and conversion reports — not banking services." },
        how: [
          { ar: "سعر", en: "Rate" },
          { ar: "اعتماد", en: "Approval" },
          { ar: "تقرير", en: "Report" },
        ],
        why: { ar: "وضوح تشغيلي للتحويل بدون ادعاء بنك.", en: "Operational clarity on conversion without claiming a bank." },
      },
    ],
  },
  {
    id: "investor",
    t: { ar: "المستثمر", en: "Investor" },
    cards: [
      {
        title: { ar: "بوابة ما بعد البيع", en: "Post-sale portal" },
        one: { ar: "المحفظة والأقساط والكشوف والمستندات والرسائل في تجربة واحدة للمشتري.", en: "Portfolio, installments, statements, documents and messages in one buyer experience." },
        how: [
          { ar: "حساب من الصفقة", en: "Account from the deal" },
          { ar: "جدول أقساط", en: "Installment plan" },
          { ar: "كشف ودفع", en: "Statement and payment" },
        ],
        why: { ar: "العلاقة لا تخرج إلى البريد بعد التوقيع.", en: "The relationship does not leave for email after signing." },
      },
    ],
  },
  {
    id: "marketing",
    t: { ar: "التسويق", en: "Marketing" },
    cards: [
      {
        title: { ar: "من الإنفاق إلى الإيراد", en: "From spend to revenue" },
        one: { ar: "الحملة تُربط بالليد ثم بالفرصة ثم بالحجز ثم بالإيراد حتى يظهر العائد.", en: "The campaign links to the lead, then opportunity, reservation and revenue so ROI is visible." },
        how: [
          { ar: "إنفاق", en: "Spend" },
          { ar: "إسناد لمسة", en: "Touch attribution" },
          { ar: "إيراد وعائد", en: "Revenue and ROI" },
        ],
        why: { ar: "التسويق يُقاس بالإيراد لا بعدد الليدز فقط.", en: "Marketing is measured by revenue — not lead count alone." },
      },
      {
        title: { ar: "إسناد بسيط وواضح", en: "Clear attribution" },
        one: { ar: "أول لمسة، آخر لمسة، أو توزيع خطي — باختيار الإدارة.", en: "First-touch, last-touch or linear — chosen by management." },
        how: [
          { ar: "اختيار النموذج", en: "Choose model" },
          { ar: "توزيع الإيراد", en: "Allocate revenue" },
          { ar: "مقارنة القنوات", en: "Compare channels" },
        ],
        why: { ar: "نقاش الميزانية يستند إلى أثر لا إلى انطباع.", en: "Budget conversations rest on effect, not impression." },
      },
    ],
  },
  {
    id: "people",
    t: { ar: "الأفراد", en: "People" },
    cards: [
      {
        title: { ar: "من الحضور إلى الراتب", en: "From attendance to payroll" },
        one: { ar: "التسجيل، السياسات، الإجازة، الخصم، السلفة، الكشف، ثم الترحيل الاختياري.", en: "Check-in, policies, leave, deduction, advance, slip, then optional posting." },
        how: [
          { ar: "حضور", en: "Attendance" },
          { ar: "سياسات", en: "Policies" },
          { ar: "كشف راتب", en: "Payslip" },
        ],
        why: { ar: "الموارد جزء من تشغيل الشركة لا نظام منعزل.", en: "HR is part of company operations — not an isolated tool." },
      },
      {
        title: { ar: "شبكة الوسطاء كقناة", en: "Broker network as a channel" },
        one: { ar: "الملف، توجيه الليد، قاعدة العمولة، الأداء واتفاقية الخدمة.", en: "Profile, lead routing, commission rule, performance and SLA." },
        how: [
          { ar: "تسجيل الوسيط", en: "Broker onboarding" },
          { ar: "توجيه الليد", en: "Lead routing" },
          { ar: "قياس التحويل", en: "Measure conversion" },
        ],
        why: { ar: "الوسيط يُدار كأداء لا كدفتر هواتف.", en: "The broker is managed as performance — not a phone book." },
      },
    ],
  },
  {
    id: "ops",
    t: { ar: "التشغيل", en: "Operations" },
    cards: [
      {
        title: { ar: "أتمتة مشروطة ومراجعة", en: "Controlled, auditable automation" },
        one: { ar: "عند إنشاء ليد أو تغيير مرحلة، إن تحقق شرط، يُعيَّن أو تُنشأ مهمة أو يُرسل إشعار — مع سجل.", en: "When a lead is created or a stage changes, if a condition holds, assign, create a task or notify — with a history." },
        how: [
          { ar: "عندما", en: "When" },
          { ar: "إذا", en: "If" },
          { ar: "إذن — مع تجربة تشغيل", en: "Then — with dry run" },
        ],
        why: { ar: "الأتمتة تخفف العمل دون أن تتصرف وحدها في السجلات التجارية.", en: "Automation reduces work without acting alone on commercial records." },
      },
    ],
  },
  {
    id: "intel",
    t: { ar: "الذكاء", en: "Intelligence" },
    cards: [
      {
        title: { ar: "تنبيه استشاري لا قرار آلي", en: "Advisory alert, not an automatic decision" },
        one: { ar: "يُظهر الفرص عالية القيمة بلا متابعة، وارتفاع مخاطر مشروع، وتغيّر تكلفة الليد.", en: "Surfaces high-value opportunities with no follow-up, rising project risk, and CPL movement." },
        how: [
          { ar: "إشارة من التشغيل", en: "Signal from operations" },
          { ar: "تنبيه للإدارة", en: "Alert to leadership" },
          { ar: "قرار بشري", en: "Human decision" },
        ],
        why: { ar: "الإدارة ترى ما يستحق الانتباه اليوم.", en: "Leadership sees what deserves attention today." },
      },
    ],
  },
  {
    id: "security",
    t: { ar: "الحوكمة", en: "Security" },
    cards: [
      {
        title: { ar: "صلاحيات دقيقة حسب الدور", en: "Fine-grained role permissions" },
        one: { ar: "35 دورًا و64 موردًا و364 صلاحية، مع نطاق ملكي / فريقي / فرعي / الكل.", en: "35 roles, 64 resources, 364 permissions, with own / team / branch / all scopes." },
        how: [
          { ar: "الدور", en: "Role" },
          { ar: "النطاق", en: "Scope" },
          { ar: "الإذن", en: "Permission" },
        ],
        why: { ar: "كل شخص يرى ما يخص عمله فقط.", en: "Each person sees only what their work requires." },
      },
      {
        title: { ar: "عزل وصول المستثمر", en: "Investor access isolation" },
        one: { ar: "بوابة المستثمر لا تفتح سجلات المبيعات الداخلية.", en: "The investor portal does not open internal sales records." },
        how: [
          { ar: "حساب مستثمر", en: "Investor account" },
          { ar: "صلاحية بوابة", en: "Portal permission" },
          { ar: "عزل", en: "Isolation" },
        ],
        why: { ar: "شفافية للعميل دون كشف تشغيل الشركة.", en: "Transparency for the client without exposing company operations." },
      },
    ],
  },
  {
    id: "mobile",
    t: { ar: "الموبايل", en: "Mobile" },
    cards: [
      {
        title: { ar: "نفس التشغيل على الجهاز", en: "The same operation on the device" },
        one: { ar: "غلاف أصلي فوق النظام الحي: ليد، بايبلاين، وحدة، مهام، إشعارات ودردشة. ليس نظامًا يعمل بالكامل دون اتصال.", en: "A native shell over the live CRM: lead, pipeline, unit, tasks, notifications and chat. Not a fully offline CRM." },
        how: [
          { ar: "دخول بالبصمة", en: "Biometric sign-in" },
          { ar: "العمل على السجل الحي", en: "Work on the live record" },
          { ar: "إشعار فوري", en: "Push notification" },
        ],
        why: { ar: "المندوب في الموقع يعمل على نفس الحقيقة.", en: "The rep on site works on the same truth." },
      },
    ],
  },
];

export const ALERTS: Tx[] = [
  { ar: "3 فرص عالية القيمة بلا متابعة مجدولة.", en: "3 high-value opportunities have no follow-up scheduled." },
  { ar: "درجة مخاطر مشروع إيست بارك ارتفعت.", en: "East Park risk score increased." },
  { ar: "تكلفة الليد في حملة الساحل ارتفعت.", en: "North Coast campaign CPL increased." },
  { ar: "فريق المبيعات أ أعلى من التارجت بنسبة 12٪.", en: "Sales Team A is 12% above target." },
];

export const REPORTS: { id: string; t: Tx; sample: Tx }[] = [
  { id: "sales", t: { ar: "مبيعات", en: "Sales" }, sample: { ar: "قمع، دورة بيع، أداء فردي", en: "Funnel, cycle, individual performance" } },
  { id: "fin", t: { ar: "مالية", en: "Finance" }, sample: { ar: "دخل، ميزانية، تدفّق، أستاذ", en: "P&L, balance sheet, cash flow, ledger" } },
  { id: "mkt", t: { ar: "تسويق", en: "Marketing" }, sample: { ar: "إنفاق، CPL، إسناد، عائد", en: "Spend, CPL, attribution, ROI" } },
  { id: "hr", t: { ar: "موارد", en: "HR" }, sample: { ar: "حضور، إجازات، رواتب", en: "Attendance, leave, payroll" } },
  { id: "com", t: { ar: "عمولات", en: "Commission" }, sample: { ar: "مستحق، متحصّل، كشوف", en: "Due, collected, statements" } },
  { id: "brk", t: { ar: "وسطاء", en: "Broker" }, sample: { ar: "تحويل، SLA، صفقات", en: "Conversion, SLA, deals" } },
  { id: "prj", t: { ar: "مشاريع", en: "Projects" }, sample: { ar: "مخاطر، تقدّم، تصنيف", en: "Risk, progress, rating" } },
  { id: "inv", t: { ar: "مستثمر", en: "Investor" }, sample: { ar: "أقساط، أرصدة، كشوف", en: "Installments, balances, statements" } },
];
