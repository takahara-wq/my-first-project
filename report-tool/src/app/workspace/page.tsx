import { getAllWorkspaces, getCustomerList } from "@/app/actions/customers";
import { BusinessWorkspace } from "@/components/workspace/business-workspace";

/** Vercel本番でもDBアクセスするため動的レンダリング */
export const dynamic = "force-dynamic";

type WorkspacePageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function WorkspacePage({ searchParams }: WorkspacePageProps) {
  const { q } = await searchParams;
  const [customers, workspaces] = await Promise.all([
    getCustomerList(q ?? ""),
    getAllWorkspaces(),
  ]);

  return (
    <BusinessWorkspace
      customers={customers}
      workspaces={workspaces}
      initialQuery={q ?? ""}
    />
  );
}
