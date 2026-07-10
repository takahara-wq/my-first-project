import { getAllWorkspaces, getCustomerList } from "@/app/actions/customers";
import { BusinessWorkspace } from "@/components/workspace/business-workspace";

/** Vercel本番でもDBアクセスするため動的レンダリング */
export const dynamic = "force-dynamic";

type HomePageProps = {
  searchParams: Promise<{ q?: string }>;
};

/** 顧客ポータルをトップページでも表示（課題提出用） */
export default async function HomePage({ searchParams }: HomePageProps) {
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
