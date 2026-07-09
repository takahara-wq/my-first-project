export type PaneId = "customer" | "deal" | "progress" | "after";

export type PaneTheme = {
  id: PaneId;
  label: string;
  labelEn: string;
  headerBg: string;
  headerBorder: string;
  headerText: string;
  badge: string;
  bodyBg: string;
  card: string;
  cardHover: string;
  accentBar: string;
  selectedItem: string;
  progressBar: string;
  legendDot: string;
};

export const paneThemes: Record<PaneId, PaneTheme> = {
  customer: {
    id: "customer",
    label: "顧客管理",
    labelEn: "Customer",
    headerBg: "bg-violet-500/15",
    headerBorder: "border-violet-500/30",
    headerText: "text-violet-100",
    badge: "border-violet-400/50 bg-violet-500/20 text-violet-200",
    bodyBg: "bg-violet-950/20",
    card: "border-violet-500/25 bg-violet-500/8",
    cardHover: "hover:border-violet-400/40",
    accentBar: "bg-violet-500",
    selectedItem:
      "border-violet-400/60 bg-violet-500/20 ring-2 ring-violet-400/30",
    progressBar: "bg-violet-500",
    legendDot: "bg-violet-500",
  },
  deal: {
    id: "deal",
    label: "商談内容",
    labelEn: "Deal",
    headerBg: "bg-amber-500/15",
    headerBorder: "border-amber-500/30",
    headerText: "text-amber-100",
    badge: "border-amber-400/50 bg-amber-500/20 text-amber-200",
    bodyBg: "bg-amber-950/15",
    card: "border-amber-500/25 bg-amber-500/8",
    cardHover: "hover:border-amber-400/40",
    accentBar: "bg-amber-500",
    selectedItem: "",
    progressBar: "bg-amber-500",
    legendDot: "bg-amber-500",
  },
  progress: {
    id: "progress",
    label: "物件進捗",
    labelEn: "Progress",
    headerBg: "bg-sky-500/15",
    headerBorder: "border-sky-500/30",
    headerText: "text-sky-100",
    badge: "border-sky-400/50 bg-sky-500/20 text-sky-200",
    bodyBg: "bg-sky-950/15",
    card: "border-sky-500/25 bg-sky-500/8",
    cardHover: "hover:border-sky-400/40",
    accentBar: "bg-sky-500",
    selectedItem: "",
    progressBar: "bg-sky-500",
    legendDot: "bg-sky-500",
  },
  after: {
    id: "after",
    label: "アフター管理",
    labelEn: "After",
    headerBg: "bg-emerald-500/15",
    headerBorder: "border-emerald-500/30",
    headerText: "text-emerald-100",
    badge: "border-emerald-400/50 bg-emerald-500/20 text-emerald-200",
    bodyBg: "bg-emerald-950/15",
    card: "border-emerald-500/25 bg-emerald-500/8",
    cardHover: "hover:border-emerald-400/40",
    accentBar: "bg-emerald-500",
    selectedItem: "",
    progressBar: "bg-emerald-500",
    legendDot: "bg-emerald-500",
  },
};

export function getDealStatusColor(status: string): string {
  switch (status) {
    case "契約済":
      return "border-emerald-500/40 bg-emerald-500/15 text-emerald-200";
    case "見積中":
      return "border-amber-500/40 bg-amber-500/15 text-amber-200";
    case "フォロー中":
      return "border-sky-500/40 bg-sky-500/15 text-sky-200";
    default:
      return "border-border bg-muted text-muted-foreground";
  }
}

export function getAfterStatusColor(status: string): string {
  switch (status) {
    case "完了":
      return "border-emerald-500/40 bg-emerald-500/15 text-emerald-200";
    case "対応中":
      return "border-amber-500/40 bg-amber-500/15 text-amber-200";
    case "予定":
      return "border-violet-500/40 bg-violet-500/15 text-violet-200";
    default:
      return "border-border bg-muted text-muted-foreground";
  }
}

export function getProgressBarColor(percent: number): string {
  if (percent >= 100) return "bg-emerald-500";
  if (percent >= 60) return "bg-sky-500";
  if (percent >= 30) return "bg-amber-500";
  return "bg-violet-500";
}
