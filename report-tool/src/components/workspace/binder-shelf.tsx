"use client";

import { ArrowLeft, FileText } from "lucide-react";

import {
  EmptyState,
  ListCell,
  ListRow,
  ListTable,
  PANE_THEMES,
} from "@/components/workspace/business-pane";
import type { DocumentItem } from "@/app/actions/customers";
import { BINDER_FOLDERS, getFolderByLabel } from "@/lib/binder-folders";
import { cn } from "@/lib/utils";

type BinderShelfProps = {
  documents: DocumentItem[];
  selectedFolder: string | null;
  selectedFileId: string | null;
  onSelectFolder: (folder: string | null) => void;
  onSelectFile: (id: string) => void;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ja-JP");
}

export function BinderShelf({
  documents,
  selectedFolder,
  selectedFileId,
  onSelectFolder,
  onSelectFile,
}: BinderShelfProps) {
  const theme = PANE_THEMES.binder;
  const folderDocuments = selectedFolder
    ? documents.filter((d) => d.folder === selectedFolder)
    : [];
  const activeFolder = selectedFolder ? getFolderByLabel(selectedFolder) : null;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* 棚エリア */}
      <div className="shrink-0 border-b border-amber-200/60 bg-gradient-to-b from-amber-50 to-amber-100/80 px-4 pt-5 pb-2">
        <p className="mb-4 text-center text-xs font-medium text-amber-800/70">
          バインダーをクリックして中身を表示
        </p>

        {/* バインダー棚 */}
        <div className="relative mx-auto max-w-md">
          <div className="flex items-end justify-center gap-3 px-2">
            {BINDER_FOLDERS.map((folder) => {
              const count = documents.filter((d) => d.folder === folder.label).length;
              const isActive = selectedFolder === folder.label;

              return (
                <button
                  key={folder.id}
                  type="button"
                  onClick={() =>
                    onSelectFolder(isActive ? null : folder.label)
                  }
                  className="group flex flex-col items-center gap-2 focus:outline-none"
                  title={`${folder.label}（${count}件）`}
                >
                  {/* バインダー本体 */}
                  <div
                    className={cn(
                      "relative flex h-24 w-14 flex-col items-center justify-start rounded-sm rounded-t-md border-2 border-white/40 pt-2 shadow-md transition-all duration-200",
                      `bg-gradient-to-b ${folder.spine}`,
                      isActive
                        ? "scale-110 -translate-y-1 shadow-lg ring-2 ring-emerald-400 ring-offset-2"
                        : "group-hover:scale-105 group-hover:-translate-y-0.5"
                    )}
                  >
                    <span className="text-2xl drop-shadow">{folder.emoji}</span>
                    <span
                      className="mt-1 text-[9px] font-bold tracking-tight text-white/95"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      {folder.label}
                    </span>
                    {count > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-700 shadow">
                        {count}
                      </span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[11px] font-semibold",
                      isActive ? "text-emerald-700" : "text-slate-600"
                    )}
                  >
                    {folder.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 棚板 */}
          <div className="mt-1 h-3 rounded-sm bg-gradient-to-b from-amber-700 to-amber-800 shadow-inner" />
          <div className="mx-2 h-1.5 rounded-b bg-amber-900/30" />
        </div>
      </div>

      {/* 中身一覧 */}
      <div className="min-h-0 flex-1 overflow-auto bg-white/60">
        {!selectedFolder ? (
          <EmptyState message="上のバインダーをクリックすると、書類の一覧がここに表示されます" />
        ) : (
          <>
            <div
              className={cn(
                "flex items-center gap-2 border-b px-4 py-3",
                activeFolder?.spineLight ?? "bg-emerald-50"
              )}
            >
              <button
                type="button"
                onClick={() => onSelectFolder(null)}
                className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
              >
                <ArrowLeft className="size-3.5" />
                棚に戻る
              </button>
              <span className="text-xl">{activeFolder?.emoji}</span>
              <span className="text-sm font-bold text-slate-800">
                {selectedFolder}
              </span>
              <span className="ml-auto text-xs text-slate-500">
                {folderDocuments.length} 件
              </span>
            </div>

            {folderDocuments.length === 0 ? (
              <EmptyState message={`「${selectedFolder}」に書類はありません`} />
            ) : (
              <ListTable
                theme={theme}
                columns={[
                  { key: "name", label: "ファイル名" },
                  { key: "size", label: "サイズ", width: "72px" },
                  { key: "date", label: "更新日", width: "88px" },
                ]}
              >
                {folderDocuments.map((doc) => (
                  <ListRow
                    key={doc.id}
                    theme={theme}
                    selected={doc.id === selectedFileId}
                    onClick={() => onSelectFile(doc.id)}
                  >
                    <ListCell>
                      <span className="flex items-center gap-2">
                        <FileText className="size-4 shrink-0 text-emerald-600" />
                        <span className="font-medium">{doc.fileName}</span>
                      </span>
                    </ListCell>
                    <ListCell className="text-slate-500">{doc.fileSize}</ListCell>
                    <ListCell className="whitespace-nowrap text-slate-500">
                      {formatDate(doc.updatedAt)}
                    </ListCell>
                  </ListRow>
                ))}
              </ListTable>
            )}
          </>
        )}
      </div>
    </div>
  );
}
