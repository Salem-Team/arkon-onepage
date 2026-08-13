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
        title: tx("حسابات و ماليات", "Accounting and finance"),
        points: [
          tx("تسجيل الصفقة والايراد", "Post the deal and revenue"),
          tx("التحصيل والعمولة في الحسابات", "Collections and commission in the books"),
          tx("دفتر الاستاذ", "General ledger"),
          tx("التقارير المالية", "Financial reports"),
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
    ],
  },

  { id: "close", kind: "close", tone: "ink", chapter: "close" },
];
