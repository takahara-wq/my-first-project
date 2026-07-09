/** あいうえお行フィルタ（顧客名カナの先頭で判定） */
export const KANA_ROWS = [
  { id: "all", label: "全", chars: "" },
  { id: "a", label: "あ", chars: "アイウエオァィゥェォ" },
  { id: "ka", label: "か", chars: "カキクケコガギグゲゴヵヶ" },
  { id: "sa", label: "さ", chars: "サシスセソザジズゼゾ" },
  { id: "ta", label: "た", chars: "タチツテトダヂヅデド" },
  { id: "na", label: "な", chars: "ナニヌネノ" },
  { id: "ha", label: "は", chars: "ハヒフヘホバビブベボパピプペポ" },
  { id: "ma", label: "ま", chars: "マミムメモ" },
  { id: "ya", label: "や", chars: "ヤユヨャュョ" },
  { id: "ra", label: "ら", chars: "ラリルレロ" },
  { id: "wa", label: "わ", chars: "ワヲンヮ" },
] as const;

export type KanaRowId = (typeof KANA_ROWS)[number]["id"];

export function matchesKanaRow(nameKana: string, rowId: KanaRowId): boolean {
  if (rowId === "all") return true;
  const row = KANA_ROWS.find((r) => r.id === rowId);
  if (!row || !nameKana) return false;
  const first = nameKana.charAt(0).toUpperCase();
  return row.chars.includes(first);
}

export function matchesSearch(text: string, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return text.toLowerCase().includes(q);
}
