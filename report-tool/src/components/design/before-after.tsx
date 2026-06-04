import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { afterItems, beforeItems } from "@/lib/design-data";

function ComparisonList({
  items,
  variant,
}: {
  items: string[];
  variant: "before" | "after";
}) {
  const icon = variant === "before" ? "❌" : "✅";

  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300"
        >
          <span className="shrink-0" aria-hidden>
            {icon}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function BeforeAfter() {
  return (
    <div className="mx-auto grid max-w-[900px] grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]">
      <Card className="border-red-500/30 bg-red-950/20 ring-0">
        <CardHeader>
          <Badge
            variant="outline"
            className="w-fit border-red-500/40 bg-transparent text-red-300"
          >
            😰 BEFORE ― 現状の手間
          </Badge>
          <CardTitle className="sr-only">現状の手間</CardTitle>
        </CardHeader>
        <CardContent>
          <ComparisonList items={beforeItems} variant="before" />
        </CardContent>
      </Card>

      <div className="hidden items-center justify-center text-2xl font-bold text-slate-500 md:flex">
        →
      </div>

      <Card className="border-green-500/30 bg-green-950/20 ring-0">
        <CardHeader>
          <Badge
            variant="outline"
            className="w-fit border-green-500/40 bg-transparent text-green-300"
          >
            ✅ AFTER ― 報告ツール導入後
          </Badge>
          <CardTitle className="sr-only">報告ツール導入後</CardTitle>
        </CardHeader>
        <CardContent>
          <ComparisonList items={afterItems} variant="after" />
        </CardContent>
      </Card>
    </div>
  );
}
