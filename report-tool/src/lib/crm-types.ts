/**
 * CRM エンティティ関係
 *
 * Customer (1) ──< Deal      商談は顧客に属する
 * Customer (1) ──< Progress  物件進捗は顧客に属する
 * Deal     (1) ──> Progress? 契約後に進捗案件が生まれる（dealId で紐づけ）
 * Progress (1) ──< After     アフター記録は物件（進捗案件）に属する
 */

export type Customer = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
};

export type DealStatus = "見積中" | "契約済" | "フォロー中";

/** 商談：顧客との打ち合わせ・見積・契約前後の記録 */
export type Deal = {
  id: string;
  customerId: string;
  date: string;
  summary: string;
  status: DealStatus;
  /** 契約成立後に紐づく Progress.id */
  progressId?: string;
};

/** 物件進捗：施工案件の工程・進捗率 */
export type Progress = {
  id: string;
  customerId: string;
  /** 起点となった商談 Deal.id */
  dealId?: string;
  propertyName: string;
  phase: string;
  percentComplete: number;
  nextAction: string;
};

export type AfterStatus = "対応中" | "完了" | "予定";

/** アフター：完工後の点検・苦情対応など */
export type After = {
  id: string;
  customerId: string;
  /** 対象物件 Progress.id */
  progressId: string;
  date: string;
  type: string;
  note: string;
  status: AfterStatus;
};

/** 顧客選択時に各ペインへ渡すまとめビュー */
export type CustomerWorkspace = {
  customer: Customer;
  deals: Deal[];
  progresses: Progress[];
  afters: After[];
};
