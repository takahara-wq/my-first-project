import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  HardHat,
  UserCircle,
  Users,
} from "lucide-react";

export type PaneVariant = "customer" | "info" | "construction" | "binder";

export type PaneColorTheme = {
  headerBg: string;
  headerBorder: string;
  headerText: string;
  headerSubtext: string;
  badgeBg: string;
  badgeText: string;
  bodyBg: string;
  tableHeadBg: string;
  tableHeadText: string;
  rowHover: string;
  rowSelected: string;
  accent: string;
  icon: LucideIcon;
};

export const PANE_THEMES: Record<PaneVariant, PaneColorTheme> = {
  customer: {
    headerBg: "bg-gradient-to-r from-violet-100 to-violet-50",
    headerBorder: "border-violet-300",
    headerText: "text-violet-900",
    headerSubtext: "text-violet-600",
    badgeBg: "bg-violet-500",
    badgeText: "text-white",
    bodyBg: "bg-violet-50/40",
    tableHeadBg: "bg-violet-100",
    tableHeadText: "text-violet-900",
    rowHover: "hover:bg-violet-100/80",
    rowSelected: "bg-violet-200/90 hover:bg-violet-200/90",
    accent: "border-violet-400 ring-violet-300",
    icon: Users,
  },
  info: {
    headerBg: "bg-gradient-to-r from-orange-100 to-orange-50",
    headerBorder: "border-orange-300",
    headerText: "text-orange-900",
    headerSubtext: "text-orange-600",
    badgeBg: "bg-orange-500",
    badgeText: "text-white",
    bodyBg: "bg-orange-50/40",
    tableHeadBg: "bg-orange-100",
    tableHeadText: "text-orange-900",
    rowHover: "hover:bg-orange-100/80",
    rowSelected: "bg-orange-200/90 hover:bg-orange-200/90",
    accent: "border-orange-400",
    icon: UserCircle,
  },
  construction: {
    headerBg: "bg-gradient-to-r from-sky-100 to-sky-50",
    headerBorder: "border-sky-300",
    headerText: "text-sky-900",
    headerSubtext: "text-sky-600",
    badgeBg: "bg-sky-500",
    badgeText: "text-white",
    bodyBg: "bg-sky-50/40",
    tableHeadBg: "bg-sky-100",
    tableHeadText: "text-sky-900",
    rowHover: "hover:bg-sky-100/80",
    rowSelected: "bg-sky-200/90 hover:bg-sky-200/90",
    accent: "border-sky-400",
    icon: HardHat,
  },
  binder: {
    headerBg: "bg-gradient-to-r from-emerald-100 to-emerald-50",
    headerBorder: "border-emerald-300",
    headerText: "text-emerald-900",
    headerSubtext: "text-emerald-600",
    badgeBg: "bg-emerald-500",
    badgeText: "text-white",
    bodyBg: "bg-emerald-50/30",
    tableHeadBg: "bg-emerald-100",
    tableHeadText: "text-emerald-900",
    rowHover: "hover:bg-emerald-100/80",
    rowSelected: "bg-emerald-200/90 hover:bg-emerald-200/90",
    accent: "border-emerald-400",
    icon: BookOpen,
  },
};
