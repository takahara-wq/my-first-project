export type WorkspacePaneConfig = {
  id: string;
  title: string;
};

export const workspacePanes: WorkspacePaneConfig[] = [
  { id: "customers", title: "顧客管理" },
  { id: "negotiations", title: "商談内容" },
  { id: "property-progress", title: "物件進捗" },
  { id: "aftercare", title: "アフター管理" },
];
