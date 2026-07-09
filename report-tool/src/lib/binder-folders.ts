/** 顧客バインダー（楽々ライブラリ風・棚に並ぶバインダー） */
export const BINDER_FOLDERS = [
  {
    id: "estimate",
    label: "見積書",
    emoji: "📘",
    spine: "from-blue-500 to-blue-600",
    spineLight: "bg-blue-100 border-blue-300 text-blue-800",
  },
  {
    id: "contract",
    label: "契約書",
    emoji: "📗",
    spine: "from-emerald-500 to-emerald-600",
    spineLight: "bg-emerald-100 border-emerald-300 text-emerald-800",
  },
  {
    id: "photos",
    label: "工事写真",
    emoji: "📙",
    spine: "from-orange-400 to-orange-500",
    spineLight: "bg-orange-100 border-orange-300 text-orange-800",
  },
  {
    id: "warranty",
    label: "保証書",
    emoji: "📕",
    spine: "from-rose-500 to-rose-600",
    spineLight: "bg-rose-100 border-rose-300 text-rose-800",
  },
  {
    id: "inspection",
    label: "点検記録",
    emoji: "📔",
    spine: "from-violet-500 to-violet-600",
    spineLight: "bg-violet-100 border-violet-300 text-violet-800",
  },
] as const;

export type BinderFolderId = (typeof BINDER_FOLDERS)[number]["id"];

export function getFolderLabel(folderKey: string): string {
  const found = BINDER_FOLDERS.find(
    (f) => f.label === folderKey || f.id === folderKey
  );
  return found?.label ?? folderKey;
}

export function getFolderByLabel(label: string) {
  return BINDER_FOLDERS.find((f) => f.label === label);
}
