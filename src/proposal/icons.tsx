import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BadgeCheck,
  Banknote,
  BarChart3,
  Bell,
  BookmarkCheck,
  BrainCircuit,
  Building2,
  Calculator,
  CalendarClock,
  ClipboardList,
  Clock,
  FileSignature,
  Files,
  GitBranch,
  Handshake,
  Home,
  Landmark,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Percent,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Target,
  TrendingUp,
  Trophy,
  UserPlus,
  UserRound,
  UsersRound,
  WalletCards,
  Workflow,
} from "lucide-react";

export type IconName =
  | "megaphone"
  | "lead"
  | "handshake"
  | "pipeline"
  | "match"
  | "building"
  | "unit"
  | "lock"
  | "won"
  | "contract"
  | "calendar"
  | "receipt"
  | "percent"
  | "ledger"
  | "investor"
  | "portal"
  | "people"
  | "clock"
  | "cash"
  | "target"
  | "trophy"
  | "chart"
  | "radar"
  | "forecast"
  | "shield"
  | "nodes"
  | "files"
  | "chat"
  | "calc"
  | "search"
  | "stack"
  | "assign"
  | "activity"
  | "employee"
  | "decision"
  | "link"
  | "broker"
  | "phone"
  | "bell"
  | "task";

const MAP: Record<IconName, LucideIcon> = {
  megaphone: Megaphone,
  lead: UserPlus,
  handshake: Handshake,
  pipeline: GitBranch,
  match: SlidersHorizontal,
  building: Building2,
  unit: Home,
  lock: BookmarkCheck,
  won: BadgeCheck,
  contract: FileSignature,
  calendar: CalendarClock,
  receipt: WalletCards,
  percent: Percent,
  ledger: Landmark,
  investor: UserRound,
  portal: LayoutDashboard,
  people: UsersRound,
  clock: Clock,
  cash: Banknote,
  target: Target,
  trophy: Trophy,
  chart: BarChart3,
  radar: BrainCircuit,
  forecast: TrendingUp,
  shield: ShieldAlert,
  nodes: Workflow,
  files: Files,
  chat: MessageSquare,
  calc: Calculator,
  search: Search,
  stack: Building2,
  assign: UserPlus,
  activity: Activity,
  employee: UsersRound,
  decision: BrainCircuit,
  link: Workflow,
  broker: Handshake,
  phone: LayoutDashboard,
  bell: Bell,
  task: ClipboardList,
};

export function Icon({ name }: { name: IconName }) {
  const Cmp = MAP[name];
  return <Cmp className="ico" strokeWidth={1.6} absoluteStrokeWidth />;
}

export function Skyline() {
  return (
    <svg className="skyline" viewBox="0 0 1200 220" fill="none" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth="1.25"
        d="M40 200 V120 H90 V200 M110 200 V80 H180 V200 M200 200 V100 H250 V60 H300 V200 M330 200 V90 H410 V200 M440 200 V50 H470 V90 H520 V200 M560 200 V110 H640 V200 M670 200 V70 H760 V200 M790 200 V130 H860 V200 M890 200 V40 H940 V80 H1000 V200 M1030 200 V100 H1160 V200"
      />
      <path stroke="currentColor" strokeWidth="1.25" d="M0 200 H1200" />
    </svg>
  );
}
