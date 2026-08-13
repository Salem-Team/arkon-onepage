import type { Tx } from "../lang";
import type { IconName } from "./icons";

export type Tone = "paper" | "ink";
export type ChapterId = "why" | "arch" | "comm" | "erp" | "eco" | "intel" | "close";
export type Layout =
  | "problem"
  | "mind"
  | "layers"
  | "roadmap"
  | "funnel"
  | "leadlife"
  | "pipeline"
  | "inventory"
  | "match"
  | "reserve"
  | "branch"
  | "collect"
  | "commission"
  | "accounting"
  | "people"
  | "dual"
  | "event"
  | "truth"
  | "intel"
  | "outcomes"
  | "features";

export type Step = {
  n?: string;
  icon: IconName;
  title: Tx;
  body?: Tx;
  data?: Tx;
  next?: Tx;
  points?: Tx[];
};

export type Branch = { icon: IconName; title: Tx; items: Tx[] };
export type LifeRow = { icon: IconName; title: Tx; sales: Tx; records: Tx[] };
export type PipeStage = { n: string; icon: IconName; title: Tx; purpose: Tx; next: Tx };

export type CoverPage = { id: string; kind: "cover"; tone: Tone; chapter: ChapterId };
export type ClosePage = { id: string; kind: "close"; tone: Tone; chapter: ChapterId };
export type ContentPage = {
  id: string;
  kind: "page";
  tone: Tone;
  chapter: ChapterId;
  layout: Layout;
  kicker: Tx;
  title: Tx;
  lede?: Tx;
  value?: Tx;
  steps?: Step[];
  branches?: Branch[];
  layers?: { title: Tx; icon: IconName; steps: Step[] }[];
  sats?: Step[];
  life?: LifeRow[];
  pipe?: PipeStage[];
  tree?: Step[];
  status?: Step[];
  ties?: Step[];
  req?: Step[];
  out?: Step[];
  left?: Step[];
  right?: Step[];
  center?: Tx;
  roles?: Step[];
  event?: { trigger: Tx; cond: Tx; actions: Step[]; audit: Tx };
  eventB?: Step[];
  hub?: Tx;
  why?: { n: string; icon: IconName; title: Tx; body: Tx }[];
};

export type PageDef = CoverPage | ClosePage | ContentPage;

export const CHAPTERS: { id: ChapterId; n: string; label: Tx; from: number; to: number }[] = [
  { id: "why", n: "01", label: { ar: "الغلاف", en: "COVER" }, from: 1, to: 1 },
  { id: "arch", n: "02", label: { ar: "الفيتشرز", en: "FEATURES" }, from: 2, to: 2 },
  { id: "close", n: "03", label: { ar: "العرض", en: "OFFER" }, from: 3, to: 3 },
];
