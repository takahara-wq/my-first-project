"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getDealById, getProgressById } from "@/lib/crm-queries";
import type { Customer, CustomerWorkspace } from "@/lib/crm-types";
import {
  getAfterStatusColor,
  getDealStatusColor,
  getProgressBarColor,
  paneThemes,
  type PaneId,
} from "@/lib/pane-themes";
import { cn } from "@/lib/utils";

type CustomerListProps = {
  customers: Customer[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function CustomerList({
  customers,
  selectedId,
  onSelect,
}: CustomerListProps) {
  const theme = paneThemes.customer;

  return (
    <div className="space-y-3">
      <RelationLegend />
      <Separator className="bg-slate-700/50" />
      <div className="space-y-2">
        {customers.map((customer) => {
          const isSelected = customer.id === selectedId;

          return (
            <Button
              key={customer.id}
              type="button"
              variant="ghost"
              aria-selected={isSelected}
              onClick={() => onSelect(customer.id)}
              className={cn(
                "relative h-auto w-full justify-start overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900/40 px-3 py-3 text-left whitespace-normal hover:bg-slate-800/60",
                isSelected && theme.selectedItem
              )}
            >
              <span
                className={cn(
                  "absolute inset-y-2 left-0 w-1 rounded-full",
                  isSelected ? theme.accentBar : "bg-slate-600"
                )}
                aria-hidden
              />
              <div className="flex w-full flex-col gap-1 pl-2">
                <span className="text-sm font-semibold text-slate-100">
                  {customer.name}
                </span>
                <span className="text-xs text-slate-400">{customer.company}</span>
                <span className="text-xs text-slate-500">{customer.address}</span>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

function RelationLegend() {
  const items: { pane: PaneId; desc: string }[] = [
    { pane: "customer", desc: "顧客（親）" },
    { pane: "deal", desc: "商談" },
    { pane: "progress", desc: "物件進捗" },
    { pane: "after", desc: "アフター" },
  ];

  return (
    <Card size="sm" className={cn("ring-0", paneThemes.customer.card)}>
      <CardHeader className="px-3 pb-2">
        <CardTitle className="text-xs font-semibold text-slate-200">
          データの関係
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5 px-3">
        {items.map(({ pane, desc }) => (
          <div key={pane} className="flex items-center gap-2 text-xs text-slate-400">
            <span
              className={cn("size-2 shrink-0 rounded-full", paneThemes[pane].legendDot)}
            />
            <span className="font-medium text-slate-200">
              {paneThemes[pane].labelEn}
            </span>
            <span>→ {desc}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

type EmptyPaneMessageProps = {
  message?: string;
  variant?: PaneId;
};

export function EmptyPaneMessage({
  message = "左の顧客一覧から顧客を選択してください",
  variant = "customer",
}: EmptyPaneMessageProps) {
  const theme = paneThemes[variant];

  return (
    <div
      className={cn(
        "rounded-lg border border-dashed px-4 py-8 text-center",
        theme.card
      )}
    >
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  );
}

function ThemedCard({
  variant,
  children,
  className,
}: {
  variant: PaneId;
  children: React.ReactNode;
  className?: string;
}) {
  const theme = paneThemes[variant];

  return (
    <Card
      size="sm"
      className={cn("ring-0 transition-colors", theme.card, theme.cardHover, className)}
    >
      {children}
    </Card>
  );
}

function CustomerInfo({ customer }: { customer: Customer }) {
  return (
    <ThemedCard variant="deal">
      <CardHeader className="px-3 pb-2">
        <CardTitle className="text-base text-slate-100">{customer.name}</CardTitle>
        <CardDescription className="text-slate-400">{customer.company}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1 px-3 text-sm text-slate-400">
        <p>{customer.address}</p>
        <p>{customer.phone}</p>
        <p className="break-all">{customer.email}</p>
      </CardContent>
    </ThemedCard>
  );
}

export function DealsPaneContent({ workspace }: { workspace: CustomerWorkspace }) {
  const { customer, deals } = workspace;

  if (deals.length === 0) {
    return (
      <div className="space-y-3">
        <CustomerInfo customer={customer} />
        <EmptyPaneMessage
          variant="deal"
          message="商談記録はまだありません。"
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <CustomerInfo customer={customer} />
      <Separator className="bg-amber-500/20" />
      {deals.map((deal) => {
        const linkedProgress = deal.progressId
          ? getProgressById(deal.progressId)
          : undefined;

        return (
          <ThemedCard key={deal.id} variant="deal">
            <CardHeader className="px-3 pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm text-slate-100">{deal.date}</CardTitle>
                <Badge
                  variant="outline"
                  className={cn("shrink-0 text-[0.65rem]", getDealStatusColor(deal.status))}
                >
                  {deal.status}
                </Badge>
              </div>
              {linkedProgress && (
                <CardDescription className="text-xs text-sky-300/80">
                  → Progress: {linkedProgress.propertyName}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="px-3 text-sm leading-relaxed text-slate-300">
              {deal.summary}
            </CardContent>
          </ThemedCard>
        );
      })}
    </div>
  );
}

export function ProgressPaneContent({
  workspace,
}: {
  workspace: CustomerWorkspace;
}) {
  const { customer, progresses } = workspace;

  if (progresses.length === 0) {
    return (
      <EmptyPaneMessage
        variant="progress"
        message={`${customer.name} さんの物件進捗はまだありません。`}
      />
    );
  }

  return (
    <div className="space-y-3">
      {progresses.map((item) => {
        const linkedDeal = item.dealId ? getDealById(item.dealId) : undefined;

        return (
          <ThemedCard key={item.id} variant="progress">
            <CardHeader className="px-3 pb-2">
              <CardTitle className="text-sm text-slate-100">{item.propertyName}</CardTitle>
              <CardDescription className="text-sky-200/70">{item.phase}</CardDescription>
              {linkedDeal && (
                <CardDescription className="text-xs text-amber-300/80">
                  ← Deal: {linkedDeal.date}（{linkedDeal.status}）
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-3 px-3">
              <div>
                <div className="mb-1.5 flex justify-between text-xs text-slate-400">
                  <span>進捗</span>
                  <span className="font-semibold text-slate-200">
                    {item.percentComplete}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      getProgressBarColor(item.percentComplete)
                    )}
                    style={{ width: `${item.percentComplete}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-slate-300">
                <span className="font-medium text-sky-200">次アクション：</span>
                {item.nextAction}
              </p>
            </CardContent>
          </ThemedCard>
        );
      })}
    </div>
  );
}

export function AfterPaneContent({ workspace }: { workspace: CustomerWorkspace }) {
  const { customer, afters } = workspace;

  if (afters.length === 0) {
    return (
      <EmptyPaneMessage
        variant="after"
        message={`${customer.name} さんのアフター記録はまだありません。`}
      />
    );
  }

  return (
    <div className="space-y-3">
      {afters.map((item) => {
        const linkedProgress = getProgressById(item.progressId);

        return (
          <ThemedCard key={item.id} variant="after">
            <CardHeader className="px-3 pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm text-slate-100">{item.type}</CardTitle>
                <Badge
                  variant="outline"
                  className={cn("shrink-0 text-[0.65rem]", getAfterStatusColor(item.status))}
                >
                  {item.status}
                </Badge>
              </div>
              <CardDescription className="text-slate-400">{item.date}</CardDescription>
              {linkedProgress && (
                <CardDescription className="text-xs text-sky-300/80">
                  対象 Progress: {linkedProgress.propertyName}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="px-3 text-sm leading-relaxed text-slate-300">
              {item.note}
            </CardContent>
          </ThemedCard>
        );
      })}
    </div>
  );
}
