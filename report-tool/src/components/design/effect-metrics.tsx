import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { effectMetrics } from "@/lib/design-data";

export function EffectMetrics() {
  return (
    <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {effectMetrics.map((metric) => (
        <Card
          key={metric.label}
          className="items-center border-slate-700/50 bg-slate-800/40 text-center ring-0"
        >
          <CardHeader className="items-center pb-0">
            <span className="text-3xl" aria-hidden>
              {metric.icon}
            </span>
            <CardTitle className="text-3xl font-extrabold text-amber-400">
              {metric.value}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">{metric.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
