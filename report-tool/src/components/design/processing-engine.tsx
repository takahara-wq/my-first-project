import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { processingSteps } from "@/lib/design-data";

export function ProcessingEngine() {
  return (
    <div className="mx-auto flex max-w-[900px] flex-col items-center gap-4 md:flex-row md:items-center">
      <p className="min-w-[100px] text-right text-xs font-bold tracking-wider text-amber-400">
        ソース元
        <br />
        から入力
      </p>
      <span className="hidden text-amber-400 md:inline" aria-hidden>
        →
      </span>

      <Card className="w-full flex-1 border-indigo-500/50 bg-gradient-to-br from-blue-950 to-indigo-950 py-6 shadow-[0_0_40px_rgba(99,102,241,0.15)] ring-0">
        <CardHeader className="items-center text-center">
          <Badge
            variant="outline"
            className="border-indigo-400/40 bg-transparent text-[0.68rem] tracking-[0.2em] text-indigo-300"
          >
            PROCESSING ENGINE ／ 報告ツール処理部
          </Badge>
          <CardTitle className="text-2xl font-extrabold text-white">
            🤖 工程変更 自動通知エンジン
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {processingSteps.map((step, index) => (
            <div
              key={step}
              className="flex items-start gap-2.5 rounded-lg bg-white/5 px-3.5 py-2.5"
            >
              <span className="shrink-0 rounded bg-indigo-500/20 px-1.5 py-0.5 text-[0.65rem] font-extrabold text-indigo-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-slate-300">{step}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <span className="hidden text-green-400 md:inline" aria-hidden>
        →
      </span>
      <p className="min-w-[100px] text-xs font-bold tracking-wider text-green-400">
        届け先へ
        <br />
        配信
      </p>
    </div>
  );
}
