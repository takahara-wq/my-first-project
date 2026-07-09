"use client";

import { useState } from "react";

import {
  FourPaneLayout,
  WorkspacePane,
} from "@/components/workspace/four-pane-layout";
import {
  AfterPaneContent,
  CustomerList,
  DealsPaneContent,
  EmptyPaneMessage,
  ProgressPaneContent,
} from "@/components/workspace/customer-panes";
import { getCustomerWorkspace, getCustomers } from "@/lib/crm-queries";
import { paneThemes } from "@/lib/pane-themes";

export function WorkspaceClient() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );

  const workspace = selectedCustomerId
    ? getCustomerWorkspace(selectedCustomerId)
    : undefined;

  return (
    <FourPaneLayout selectedCustomerName={workspace?.customer.name ?? null}>
      <WorkspacePane
        title={paneThemes.customer.label}
        subtitle={paneThemes.customer.labelEn}
        index={1}
        variant="customer"
      >
        <CustomerList
          customers={getCustomers()}
          selectedId={selectedCustomerId}
          onSelect={setSelectedCustomerId}
        />
      </WorkspacePane>

      <WorkspacePane
        title={paneThemes.deal.label}
        subtitle={paneThemes.deal.labelEn}
        index={2}
        variant="deal"
      >
        {workspace ? (
          <DealsPaneContent workspace={workspace} />
        ) : (
          <EmptyPaneMessage variant="deal" />
        )}
      </WorkspacePane>

      <WorkspacePane
        title={paneThemes.progress.label}
        subtitle={paneThemes.progress.labelEn}
        index={3}
        variant="progress"
      >
        {workspace ? (
          <ProgressPaneContent workspace={workspace} />
        ) : (
          <EmptyPaneMessage variant="progress" />
        )}
      </WorkspacePane>

      <WorkspacePane
        title={paneThemes.after.label}
        subtitle={paneThemes.after.labelEn}
        index={4}
        variant="after"
      >
        {workspace ? (
          <AfterPaneContent workspace={workspace} />
        ) : (
          <EmptyPaneMessage variant="after" />
        )}
      </WorkspacePane>
    </FourPaneLayout>
  );
}
