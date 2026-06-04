import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columnTheme, type FlowColumn } from "@/lib/design-data";
import { cn } from "@/lib/utils";

export function FlowColumn({ column }: { column: FlowColumn }) {
  const theme = columnTheme[column.id];

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-700/50">
      <div
        className={cn(
          "border-b border-slate-700/50 px-5 py-4 text-center",
          theme.header
        )}
      >
        <Badge
          variant="outline"
          className={cn("mb-2 border bg-transparent text-[0.65rem] tracking-[0.2em]", theme.badge)}
        >
          {column.step}
        </Badge>
        <p className="text-lg font-extrabold tracking-wide">{column.name}</p>
        <p className="mt-1 text-[0.68rem] tracking-[0.15em] opacity-50">
          {column.nameEn}
        </p>
      </div>

      <div className="flex min-h-[340px] flex-col gap-3 bg-slate-900/40 p-4">
        {column.items.map((item) => (
          <Card
            key={item.title}
            size="sm"
            className={cn(
              "gap-2 py-3 ring-0 transition-transform hover:scale-[1.02]",
              theme.card,
              item.main && "py-4"
            )}
          >
            <CardHeader className="px-3 pb-0">
              <span className="text-2xl" aria-hidden>
                {item.icon}
              </span>
              <CardTitle
                className={cn(
                  "text-slate-100",
                  item.main ? "text-[0.95rem]" : "text-sm"
                )}
              >
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pt-0">
              <CardDescription className="text-xs leading-relaxed text-slate-400">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
