"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Phone,
  Search,
  User,
} from "lucide-react";

import type { CustomerListItem, CustomerWorkspace } from "@/app/actions/customers";
import { Input } from "@/components/ui/input";
import { BinderShelf } from "@/components/workspace/binder-shelf";
import {
  BusinessPane,
  EmptyState,
  InfoRow,
  ListCell,
  ListRow,
  ListTable,
  PANE_THEMES,
} from "@/components/workspace/business-pane";
import { KANA_ROWS, matchesKanaRow, matchesSearch, type KanaRowId } from "@/lib/kana";
import { cn } from "@/lib/utils";

type BusinessWorkspaceProps = {
  customers: CustomerListItem[];
  workspaces: CustomerWorkspace[];
  initialQuery?: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ja-JP");
}

export function BusinessWorkspace({
  customers,
  workspaces,
  initialQuery = "",
}: BusinessWorkspaceProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [kanaRow, setKanaRow] = useState<KanaRowId>("all");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const workspaceMap = useMemo(
    () => new Map(workspaces.map((w) => [w.customer.id, w])),
    [workspaces]
  );

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const hitSearch =
        matchesSearch(c.name, searchQuery) ||
        matchesSearch(c.nameKana, searchQuery) ||
        matchesSearch(c.address, searchQuery);
      const hitKana = matchesKanaRow(c.nameKana, kanaRow);
      return hitSearch && hitKana;
    });
  }, [customers, searchQuery, kanaRow]);

  const selected = selectedId ? workspaceMap.get(selectedId) ?? null : null;

  const handleSelectCustomer = (id: string) => {
    setSelectedId(id);
    setSelectedFolder(null);
    setSelectedFileId(null);
  };

  const customerTheme = PANE_THEMES.customer;
  const infoTheme = PANE_THEMES.info;
  const constructionTheme = PANE_THEMES.construction;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-slate-100 font-sans text-slate-800">
      {/* アプリバー */}
      <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow">
            <Building2 className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">
              株式会社ハイランド・ハウス
            </p>
            <h1 className="text-base font-bold text-slate-800">顧客ポータル</h1>
          </div>
        </div>
        <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
          <span className="rounded-full bg-violet-100 px-2 py-0.5 font-medium text-violet-700">
            顧客
          </span>
          <span>→</span>
          <span className="rounded-full bg-orange-100 px-2 py-0.5 font-medium text-orange-700">
            情報
          </span>
          <span>→</span>
          <span className="rounded-full bg-sky-100 px-2 py-0.5 font-medium text-sky-700">
            工事
          </span>
          <span>→</span>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700">
            書類
          </span>
        </div>
      </header>

      {/* 4ペイン */}
      <div className="grid min-h-0 flex-1 grid-cols-4 gap-px bg-slate-200 p-px [&>*]:min-h-0">
        {/* ペイン1：顧客ポータル（紫） */}
        <BusinessPane
          index={1}
          title="顧客ポータル"
          subtitle="検索・あいうえお・一覧"
          variant="customer"
        >
          <div className="space-y-3 border-b border-violet-100 bg-white/80 p-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-violet-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="顧客名・カナ・住所で検索"
                className="h-9 border-violet-200 bg-white pl-9 text-sm focus-visible:ring-violet-300"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {KANA_ROWS.map((row) => (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => setKanaRow(row.id)}
                  className={cn(
                    "min-w-[26px] rounded-md border px-1.5 py-1 text-xs font-semibold transition-colors",
                    kanaRow === row.id
                      ? "border-violet-500 bg-violet-500 text-white shadow-sm"
                      : "border-violet-200 bg-white text-violet-700 hover:bg-violet-50"
                  )}
                >
                  {row.label}
                </button>
              ))}
            </div>
          </div>
          <ListTable
            theme={customerTheme}
            columns={[
              { key: "name", label: "顧客名" },
              { key: "kana", label: "カナ", width: "80px" },
            ]}
          >
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={2}>
                  <EmptyState message="該当する顧客がありません" />
                </td>
              </tr>
            ) : (
              filteredCustomers.map((c) => (
                <ListRow
                  key={c.id}
                  theme={customerTheme}
                  selected={c.id === selectedId}
                  onClick={() => handleSelectCustomer(c.id)}
                >
                  <ListCell className="font-semibold text-slate-800">
                    <span className="flex items-center gap-2">
                      <User className="size-3.5 text-violet-500" />
                      {c.name}
                    </span>
                  </ListCell>
                  <ListCell className="text-slate-500">{c.nameKana}</ListCell>
                </ListRow>
              ))
            )}
          </ListTable>
          <p className="border-t border-violet-100 bg-violet-50/50 px-4 py-2 text-xs text-violet-700">
            {filteredCustomers.length} 件表示
          </p>
        </BusinessPane>

        {/* ペイン2：顧客情報（オレンジ） */}
        <BusinessPane
          index={2}
          title="顧客情報"
          subtitle="基本データ"
          variant="info"
        >
          {!selected ? (
            <EmptyState message="左の一覧から顧客を選択してください" />
          ) : (
            <table className="w-full border-collapse">
              <tbody>
                <InfoRow theme={infoTheme} label="顧客名" value={selected.customer.name} />
                <InfoRow theme={infoTheme} label="カナ" value={selected.customer.nameKana} />
                <InfoRow theme={infoTheme} label="住所" value={selected.customer.address} />
                <InfoRow theme={infoTheme} label="電話番号" value={selected.customer.phone} />
                <InfoRow theme={infoTheme} label="担当者" value={selected.customer.contactPerson} />
              </tbody>
            </table>
          )}
        </BusinessPane>

        {/* ペイン3：工事履歴（青） */}
        <BusinessPane
          index={3}
          title="工事履歴"
          subtitle="過去工事一覧"
          variant="construction"
        >
          {!selected ? (
            <EmptyState message="顧客を選択すると工事履歴が表示されます" />
          ) : selected.constructions.length === 0 ? (
            <EmptyState message="工事履歴はありません" />
          ) : (
            <ListTable
              theme={constructionTheme}
              columns={[
                { key: "date", label: "契約日", width: "88px" },
                { key: "title", label: "工事内容" },
                { key: "progress", label: "進捗", width: "110px" },
              ]}
            >
              {selected.constructions.map((item) => (
                <ListRow key={item.id} theme={constructionTheme}>
                  <ListCell className="whitespace-nowrap text-slate-500">
                    {formatDate(item.contractDate)}
                  </ListCell>
                  <ListCell className="font-medium">{item.title}</ListCell>
                  <ListCell>
                    <span
                      className={cn(
                        "inline-block rounded-md px-2 py-0.5 text-xs font-semibold",
                        item.progress.includes("完了") || item.progress.includes("100%")
                          ? "bg-emerald-100 text-emerald-700"
                          : item.progress.includes("見積") || item.progress.includes("契約準備")
                            ? "bg-amber-100 text-amber-700"
                            : "bg-sky-200 text-sky-800"
                      )}
                    >
                      {item.progress}
                    </span>
                  </ListCell>
                </ListRow>
              ))}
            </ListTable>
          )}
        </BusinessPane>

        {/* ペイン4：顧客バインダー（緑・棚表示） */}
        <BusinessPane
          index={4}
          title="顧客バインダー"
          subtitle="楽々ライブラリ風"
          variant="binder"
          className="border-r-0"
        >
          {!selected ? (
            <EmptyState message="顧客を選択するとバインダー棚が表示されます" />
          ) : (
            <BinderShelf
              documents={selected.documents}
              selectedFolder={selectedFolder}
              selectedFileId={selectedFileId}
              onSelectFolder={setSelectedFolder}
              onSelectFile={setSelectedFileId}
            />
          )}
        </BusinessPane>
      </div>

      {/* ステータスバー */}
      <footer className="flex shrink-0 items-center justify-between border-t border-slate-200 bg-white px-5 py-2 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Phone className="size-3.5" />
          {selected ? `選択中: ${selected.customer.name}` : "顧客未選択"}
        </span>
        <span>
          工事 {selected?.constructions.length ?? 0} 件 / 書類{" "}
          {selected?.documents.length ?? 0} 件
        </span>
      </footer>
    </div>
  );
}
