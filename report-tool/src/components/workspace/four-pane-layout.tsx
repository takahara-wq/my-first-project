import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { type PaneId, paneThemes } from "@/lib/pane-themes";
import { cn } from "@/lib/utils";

type WorkspacePaneProps = {
  title: string;
  subtitle?: string;
  index: number;
  variant: PaneId;
  children?: React.ReactNode;
  className?: string;
};

export function WorkspacePane({
  title,
  subtitle,
  index,
  variant,
  children,
  className,
}: WorkspacePaneProps) {
  const theme = paneThemes[variant];

  return (
    <Card
      className={cn(
        "flex h-full min-h-0 min-w-0 flex-col gap-0 rounded-none border-0 py-0 ring-0",
        theme.bodyBg,
        className
      )}
    >
      <CardHeader
        className={cn(
          "shrink-0 border-b px-3 py-2.5 sm:px-4 sm:py-3",
          theme.headerBg,
          theme.headerBorder
        )}
      >
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn("shrink-0 tabular-nums text-[0.65rem]", theme.badge)}
          >
            {index}
          </Badge>
          <div className="min-w-0">
            <CardTitle
              className={cn("truncate text-sm font-bold sm:text-base", theme.headerText)}
            >
              {title}
            </CardTitle>
            {subtitle && (
              <p className="truncate text-[0.65rem] tracking-wider text-slate-400 uppercase">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col overflow-hidden p-0">
        <ScrollArea className="h-0 min-h-0 flex-1 grow">
          <div className="px-3 py-3 sm:px-4 sm:py-4">{children}</div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

type FourPaneLayoutProps = {
  children: React.ReactNode;
  selectedCustomerName?: string | null;
};

export function FourPaneLayout({
  children,
  selectedCustomerName,
}: FourPaneLayoutProps) {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[#0f1117] text-slate-200">
      <header className="shrink-0 border-b border-slate-700/60 bg-slate-900/80 px-4 py-2.5 backdrop-blur-sm">
        <h1 className="text-sm font-bold tracking-wide text-white sm:text-base">
          ワークスペース
        </h1>
        <p className="mt-0.5 text-xs text-slate-400">
          {selectedCustomerName ? (
            <>
              選択中：
              <span className="font-semibold text-violet-300">
                {selectedCustomerName}
              </span>
              <span className="hidden sm:inline">
                {" "}
                — Deal / Progress / After が連動表示
              </span>
            </>
          ) : (
            "左ペインから顧客を選択してください"
          )}
        </p>
      </header>

      <Separator className="shrink-0 bg-slate-700/60" />

      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(240px,0.85fr)_minmax(260px,1fr)_minmax(260px,1fr)_minmax(260px,1fr)] [&>*]:min-h-0 [&>*]:min-w-0">
        {children}
      </div>
    </div>
  );
}
