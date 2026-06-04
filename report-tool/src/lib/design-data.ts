export type FlowColumnId = "trigger" | "source" | "process" | "deliver";

export type FlowItem = {
  icon: string;
  title: string;
  description: string;
  main?: boolean;
};

export type FlowColumn = {
  id: FlowColumnId;
  step: string;
  name: string;
  nameEn: string;
  items: FlowItem[];
};

export const flowColumns: FlowColumn[] = [
  {
    id: "trigger",
    step: "STEP 01",
    name: "トリガー",
    nameEn: "Trigger",
    items: [
      {
        icon: "🌧️",
        title: "突発的な降雨",
        description: "予報外の雨が発生。工程続行が不可能になった瞬間が起点。",
        main: true,
      },
      {
        icon: "📋",
        title: "工程変更の確定",
        description: "現場責任者が「本日の作業中止・日程変更」を判断",
      },
      {
        icon: "⏰",
        title: "即時通知の必要性",
        description: "お客様・近隣への告知を速やかに行わなければならない",
      },
    ],
  },
  {
    id: "source",
    step: "STEP 02",
    name: "ソース元",
    nameEn: "Data Source",
    items: [
      {
        icon: "🗓️",
        title: "元の工程表",
        description: "予定していた施工日・作業内容・完了予定日",
        main: true,
      },
      {
        icon: "🌤️",
        title: "気象情報",
        description: "現在の降雨状況・翌日以降の天気予報データ",
      },
      {
        icon: "👤",
        title: "施主情報",
        description: "お客様の名前・連絡先・現場住所",
      },
      {
        icon: "🏘️",
        title: "近隣住民情報",
        description: "告知対象の世帯数・住所・配布範囲",
      },
    ],
  },
  {
    id: "process",
    step: "STEP 03",
    name: "処理する場所",
    nameEn: "Processing",
    items: [
      {
        icon: "🤖",
        title: "報告ツール（AI処理）",
        description: "入力情報をもとに通知文・張り紙を自動生成",
        main: true,
      },
      {
        icon: "📝",
        title: "お客様向け文書生成",
        description: "丁寧な言葉遣いのお知らせ文を自動作成",
      },
      {
        icon: "🪧",
        title: "張り紙データ生成",
        description: "印刷対応のA4張り紙PDFを即時生成",
      },
      {
        icon: "🔄",
        title: "工程表の自動更新",
        description: "ずれた日程を再計算して新工程表を出力",
      },
    ],
  },
  {
    id: "deliver",
    step: "STEP 04",
    name: "届ける先",
    nameEn: "Delivery",
    items: [
      {
        icon: "👷",
        title: "現場作業員",
        description: "作業中止・次回日程をLINEや口頭で即時共有",
        main: true,
      },
      {
        icon: "🏠",
        title: "お客様（施主）",
        description: "電話・メール・LINEでお知らせ文を送付",
      },
      {
        icon: "🏘️",
        title: "近隣住民",
        description: "印刷した張り紙を各戸に配布（ポスティング）",
      },
      {
        icon: "🏢",
        title: "社内（経営者）",
        description: "工程遅延レポートを自動で報告・記録",
      },
    ],
  },
];

export const processingSteps = [
  "トリガー受信：「雨天・工程変更」の入力を検知",
  "工程表を参照し、変更後の新スケジュールを自動計算",
  "天気予報データを取得し、次の施工可能日を提案",
  "お客様向けお知らせ文・近隣向け張り紙を自動生成",
  "各届け先（LINE・メール・印刷データ）へ自動配信",
];

export const beforeItems = [
  "雨が降ったことに気づくのが遅れる",
  "工程表を手作業で修正し直す",
  "張り紙の文章を1から考えて手書き・印刷",
  "一軒ずつ歩いて配布して回る（時間・体力）",
  "お客様への電話連絡も別途必要",
  "社内への報告もメール等で改めて行う",
  "記録が残りにくく次回の参考にならない",
];

export const afterItems = [
  "「工程変更」を入力するだけで全自動",
  "新工程表が即座に再計算・出力",
  "お知らせ文・張り紙が30秒で自動生成",
  "LINEやメールで施主に即時通知",
  "張り紙データをそのまま印刷→配布のみ",
  "社内への工程遅延レポートも自動送付",
  "変更履歴がデータとして蓄積・参照可能",
];

export const effectMetrics = [
  { icon: "⏱️", value: "90%", label: "通知作業時間の削減" },
  { icon: "📄", value: "30秒", label: "張り紙生成までの時間" },
  { icon: "😊", value: "↑", label: "施主・近隣住民の信頼感向上" },
  { icon: "📊", value: "∞", label: "変更履歴の記録・分析" },
];

export const columnTheme: Record<
  FlowColumnId,
  { header: string; card: string; dot: string; badge: string }
> = {
  trigger: {
    header: "border-red-500/25 bg-red-500/10 text-red-300",
    card: "border-red-500/30 bg-red-500/15 hover:border-red-500/50",
    dot: "border-red-500 bg-red-500/30",
    badge: "border-red-500/40 text-red-300",
  },
  source: {
    header: "border-amber-500/25 bg-amber-500/10 text-amber-300",
    card: "border-amber-500/30 bg-amber-500/15 hover:border-amber-500/50",
    dot: "border-amber-500 bg-amber-500/30",
    badge: "border-amber-500/40 text-amber-300",
  },
  process: {
    header: "border-blue-500/25 bg-blue-500/10 text-blue-300",
    card: "border-blue-500/30 bg-blue-500/15 hover:border-blue-500/50",
    dot: "border-blue-500 bg-blue-500/30",
    badge: "border-blue-500/40 text-blue-300",
  },
  deliver: {
    header: "border-green-500/25 bg-green-500/10 text-green-300",
    card: "border-green-500/30 bg-green-500/15 hover:border-green-500/50",
    dot: "border-green-500 bg-green-500/30",
    badge: "border-green-500/40 text-green-300",
  },
};
