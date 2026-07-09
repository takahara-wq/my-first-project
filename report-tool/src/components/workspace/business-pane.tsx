import { cn } from "@/lib/utils";
import {
  PANE_THEMES,
  type PaneColorTheme,
  type PaneVariant,
} from "@/lib/pane-colors";

type BusinessPaneProps = {
  index: number;
  title: string;
  subtitle?: string;
  variant: PaneVariant;
  children: React.ReactNode;
  className?: string;
};

/** 業務ソフト風ペイン枠（色分け・余白多め） */
export function BusinessPane({
  index,
  title,
  subtitle,
  variant,
  children,
  className,
}: BusinessPaneProps) {
  const theme = PANE_THEMES[variant];
  const Icon = theme.icon;

  return (
    <section
      className={cn(
        "flex h-full min-h-0 min-w-0 flex-col border-r border-slate-200",
        theme.bodyBg,
        className
      )}
    >
      <header
        className={cn(
          "flex shrink-0 items-center gap-3 border-b px-4 py-3",
          theme.headerBg,
          theme.headerBorder
        )}
      >
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-bold shadow-sm",
            theme.badgeBg,
            theme.badgeText
          )}
        >
          {index}
        </span>
        <Icon className={cn("size-5 shrink-0", theme.headerSubtext)} />
        <div className="min-w-0">
          <h2 className={cn("truncate text-sm font-bold", theme.headerText)}>
            {title}
          </h2>
          {subtitle && (
            <p className={cn("truncate text-xs", theme.headerSubtext)}>
              {subtitle}
            </p>
          )}
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </section>
  );
}

type ListTableProps = {
  columns: { key: string; label: string; width?: string }[];
  theme: PaneColorTheme;
  children: React.ReactNode;
};

export function ListTable({ columns, theme, children }: ListTableProps) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead className={cn("sticky top-0 z-10", theme.tableHeadBg)}>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={cn(
                "border-b border-slate-200 px-3 py-2.5 text-left text-xs font-bold",
                theme.tableHeadText
              )}
              style={col.width ? { width: col.width } : undefined}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

type ListRowProps = {
  selected?: boolean;
  onClick?: () => void;
  theme: PaneColorTheme;
  children: React.ReactNode;
};

export function ListRow({ selected, onClick, theme, children }: ListRowProps) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        "cursor-pointer border-b border-slate-100 transition-colors",
        theme.rowHover,
        selected && theme.rowSelected
      )}
    >
      {children}
    </tr>
  );
}

export function ListCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("px-3 py-2.5 text-slate-700", className)}>{children}</td>
  );
}

export function InfoRow({
  label,
  value,
  theme,
}: {
  label: string;
  value: string;
  theme: PaneColorTheme;
}) {
  return (
    <tr className="border-b border-slate-100">
      <th
        className={cn(
          "w-[100px] px-4 py-3 text-left text-xs font-bold",
          theme.tableHeadBg,
          theme.tableHeadText
        )}
      >
        {label}
      </th>
      <td className="px-4 py-3 text-sm leading-relaxed text-slate-800">
        {value || "—"}
      </td>
    </tr>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <p className="px-6 py-12 text-center text-sm leading-relaxed text-slate-500">
      {message}
    </p>
  );
}

export { PANE_THEMES };
