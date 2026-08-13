import type { Tx } from "../lang";
import type { PageDef } from "./types";

const tx = (ar: string, en: string): Tx => ({ ar, en });

export const PAGES: PageDef[] = [
  { id: "cover", kind: "cover", tone: "ink", chapter: "why" },

  {
    id: "features",
    kind: "page",
    tone: "paper",
    chapter: "arch",
    layout: "features",
    kicker: tx("02 · الفيتشرز", "02 · FEATURES"),
    title: tx("ايه الموجود في السيستم.", "What is in the system."),
    lede: tx("كل الوحدات دي شغالة على نفس النظام.", "All of these units run on the same system."),
    value: tx("سيستم واحد لكل شغل الشركة.", "One system for the whole company’s work."),
    steps: [
      {
        n: "01",
        icon: "handshake",
        title: tx("CRM كامل لاداره العملاء و السيلز", "Full CRM for clients and sales"),
        points: [
          tx("تسجيل الليدز من كل مصدر", "Capture leads from every source"),
          tx("توزيع المسؤول والمتابعة", "Owner assignment and follow-up"),
          tx("البايبلاين من اول تواصل لحد اتمام البيع", "Pipeline from first contact to closed won"),
          tx("المطابقة والحجز والعقد", "Matching, reservation and contract"),
        ],
      },
      {
        n: "02",
        icon: "percent",
        title: tx("عمولات و تحصيلات", "Commissions and collections"),
        points: [
          tx("حساب العمولة من نفس الصفقة", "Commission calculated from the same deal"),
          tx("توزيع النسب على السيلز والبروكر", "Splits for sales and brokers"),
          tx("متابعة الاقساط والمستحق والمتاخر", "Track installments, due and overdue"),
          tx("الايصالات والدفعات", "Receipts and payments"),
        ],
      },
      {
        n: "03",
        icon: "ledger",
        title: tx("حسابات و ماليات وموديول محاسبة كامل", "Accounting, finance and a full accounting module"),
        points: [
          tx("شجرة الحسابات وقيود اليوميه", "Chart of accounts and journal entries"),
          tx("المصروفات والجرد", "Expenses and inventory count"),
          tx("تسجيل الصفقة والايراد والتحصيل", "Post the deal, revenue and collections"),
          tx("دفتر الاستاذ والتقارير المالية", "General ledger and financial reports"),
        ],
      },
      {
        n: "04",
        icon: "people",
        title: tx("اتش ار و موظفين و رواتب و حضور و انصراف", "HR, employees, payroll and attendance"),
        points: [
          tx("ملفات الموظفين", "Employee files"),
          tx("الحضور والانصراف", "Attendance and checkout"),
          tx("الاجازات", "Leave"),
          tx("الرواتب والاداء", "Payroll and performance"),
        ],
      },
      {
        n: "05",
        icon: "broker",
        title: tx("اداره البروكر", "Broker management"),
        points: [
          tx("تسجيل الوسطاء", "Broker records"),
          tx("ربط الصفقة بالبروكر", "Tie the deal to the broker"),
          tx("حساب عمولة الوسيط", "Broker commission"),
          tx("متابعة شغل البروكر", "Track broker work"),
        ],
      },
      {
        n: "06",
        icon: "stack",
        title: tx("اداره المشاريع و الوحدات", "Project and unit inventory"),
        points: [
          tx("المشاريع والعمارات والوحدات", "Projects, buildings and units"),
          tx("حالة الوحدة: متاح ومحجوز ومباع", "Unit status: available, reserved, sold"),
          tx("السعر وخطة السداد", "Price and payment plan"),
          tx("ربط الوحدة بالبيع", "Tie the unit to the sale"),
        ],
      },
      {
        n: "07",
        icon: "chart",
        title: tx("تقارير دقيقه", "Accurate reports"),
        points: [
          tx("تقارير السيلز والبايبلاين", "Sales and pipeline reports"),
          tx("تقارير التحصيل والعمولة", "Collections and commission reports"),
          tx("تقارير الاداء", "Performance reports"),
          tx("رؤية الادارة", "Executive visibility"),
        ],
      },
      {
        n: "08",
        icon: "task",
        title: tx("التارجت و التاسكات", "Targets and tasks"),
        points: [
          tx("تارجت الفريق والموظف", "Team and employee targets"),
          tx("تاسك بمسؤول وميعاد", "Tasks with owner and due date"),
          tx("متابعة التنفيذ", "Track execution"),
          tx("ربط التاسك بالليد او الصفقة", "Tie the task to the lead or deal"),
        ],
      },
      {
        n: "09",
        icon: "megaphone",
        title: tx("اداره الحملات التسويق", "Marketing campaign management"),
        points: [
          tx("الحملات ومصدر الليد", "Campaigns and lead source"),
          tx("تكلفة الليد", "Cost per lead"),
          tx("نسبة التحويل", "Conversion rate"),
          tx("عائد الحملة", "Campaign return"),
        ],
      },
      {
        n: "10",
        icon: "investor",
        title: tx("حسابات للعملاء لمتابعه الاقساط و المدفوعات و المستثمرين", "Client accounts for installments, payments and investors"),
        points: [
          tx("حساب للمستثمر والعميل", "Investor and client account"),
          tx("جدول الاقساط", "Installment schedule"),
          tx("المدفوعات والمتبقي", "Payments and outstanding"),
          tx("متابعة المحفظة", "Portfolio follow-up"),
        ],
      },
      {
        n: "11",
        icon: "chat",
        title: tx("الشات", "Chat module"),
        points: [
          tx("شات داخلي على نفس العميل", "Internal chat on the same client"),
          tx("شات المستثمر من البوابة", "Investor chat from the portal"),
          tx("اشعار على الويب والموبايل", "Notices on web and mobile"),
          tx("السجل يفضل مع الشركة لو الموظف ساب", "The log stays with the company if the employee leaves"),
        ],
      },
      {
        n: "12",
        icon: "match",
        title: tx("المطابقة التلقائيه", "Auto matching"),
        points: [
          tx("مطابقة الوحده مع ميزانية العميل والمساحة والنوع", "Match the unit to budget, area and type"),
          tx("شورت ليست حسب درجة التطابق", "A shortlist ranked by match score"),
          tx("العرض وانت قدام العميل", "Present while you are with the client"),
          tx("الرغبة محفوظة لو رجع تاني", "The need is stored if they come back"),
        ],
      },
      {
        n: "13",
        icon: "files",
        title: tx("الموديول القانوني", "Legal module"),
        points: [
          tx("العقود مربوطة بالعميل والوحده", "Contracts linked to the client and the unit"),
          tx("مسار المسودة والاعتماد وPDF", "Draft, approval and PDF path"),
          tx("نسخة معتمدة واحدة", "One approved copy"),
          tx("الارشيف للمراجعة القانونية", "Archive for legal review"),
        ],
      },
      {
        n: "14",
        icon: "calc",
        title: tx("الاله الحاسبه لنظام السداد", "Payment-plan calculator"),
        points: [
          tx("حساب نظام السداد وانت قدام العميل في الاجتماع", "Work out the payment plan while you are with the client"),
          tx("المقدم والاقساط والمدة تظهر فورا", "Down payment, installments and tenor show at once"),
          tx("ارسال الجدول PDF", "Send the schedule as a PDF"),
          tx("ارسال لينك يفتحه العميل بعد الاجتماع", "Send a link the client can open after the meeting"),
        ],
      },
    ],
  },

  { id: "close", kind: "close", tone: "ink", chapter: "close" },
];
