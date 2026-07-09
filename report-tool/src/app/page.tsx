import { BeforeAfter } from "@/components/design/before-after";
import { EffectMetrics } from "@/components/design/effect-metrics";
import { FlowDiagram } from "@/components/design/flow-diagram";
import { ProcessingEngine } from "@/components/design/processing-engine";
import { SectionTitle } from "@/components/design/section-title";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CloudRain } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1117] px-5 py-10 text-slate-200 sm:px-8">
      <header className="mb-14 text-center">
        <Badge
          variant="outline"
          className="mb-4 border-amber-500/60 bg-transparent text-xs tracking-[0.2em] text-amber-400"
        >
          REPORTING TOOL DESIGN
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-wide text-white sm:text-4xl">
          工程報告ツール 設計図解
        </h1>
        <p className="mt-3 text-sm tracking-wider text-slate-500">
          塗装工事 ／ 突発的な天候変化による工程変更の通知フロー
        </p>
        <p className="mt-4 text-xs text-slate-600">
          Next.js · TypeScript · Tailwind CSS · shadcn/ui · Prisma · SQLite · Vercel
        </p>
        <a
          href="/workspace"
          className="mt-6 inline-flex items-center rounded-lg border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition-colors hover:bg-violet-500/20"
        >
          顧客ポータルを開く →
        </a>
      </header>

      <Alert className="mx-auto mb-14 max-w-[860px] border-red-500/30 border-l-4 border-l-red-500 bg-gradient-to-br from-[#1e1b14] to-[#1a1a2e] text-slate-300">
        <CloudRain className="size-8 text-red-400" />
        <AlertTitle className="text-sm font-bold tracking-wider text-red-400">
          PROBLEM SCENARIO ― 今起きている「面倒」
        </AlertTitle>
        <AlertDescription className="text-sm leading-relaxed text-slate-400">
          塗装工事の工程を計画通りに進めていたが、
          <strong className="text-amber-300">
            天気予報に出ていなかった雨が突然降り始め
          </strong>
          、工程がずれてしまった。
          お客様・近隣住人への告知のため、
          <strong className="text-amber-300">
            手作業で張り紙を作成し、一軒ずつ配って回る必要があった
          </strong>
          。作業者の時間と手間が大量にかかり、伝わるまでの時間もかかる。
        </AlertDescription>
      </Alert>

      <section className="mb-12">
        <SectionTitle className="mb-10">① 情報フロー分類図</SectionTitle>
        <FlowDiagram />
      </section>

      <Separator className="mx-auto mb-12 max-w-[1100px] bg-slate-700/50" />

      <section className="mb-12">
        <SectionTitle className="mb-10">② 処理エンジンの中身</SectionTitle>
        <ProcessingEngine />
      </section>

      <Separator className="mx-auto mb-12 max-w-[1100px] bg-slate-700/50" />

      <section className="mb-12">
        <SectionTitle className="mb-10">③ Before / After 比較</SectionTitle>
        <BeforeAfter />
      </section>

      <Separator className="mx-auto mb-12 max-w-[1100px] bg-slate-700/50" />

      <section className="mb-8">
        <SectionTitle className="mb-10">④ 期待される効果</SectionTitle>
        <EffectMetrics />
      </section>
    </div>
  );
}
