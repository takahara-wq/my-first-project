"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export type ActionResult = {
  success: boolean;
  message: string;
};

export type CustomerListItem = {
  id: string;
  name: string;
  nameKana: string;
  address: string;
  phone: string;
  contactPerson: string;
};

export type ConstructionItem = {
  id: string;
  contractDate: string;
  title: string;
  progress: string;
};

export type DocumentItem = {
  id: string;
  folder: string;
  fileName: string;
  fileSize: string;
  updatedAt: string;
};

export type CustomerWorkspace = {
  customer: CustomerListItem;
  constructions: ConstructionItem[];
  documents: DocumentItem[];
};

/** 顧客一覧（検索用・軽量） */
export async function getCustomerList(query = ""): Promise<CustomerListItem[]> {
  const trimmed = query.trim();

  return prisma.customer.findMany({
    where: trimmed
      ? {
          OR: [
            { name: { contains: trimmed } },
            { nameKana: { contains: trimmed } },
            { address: { contains: trimmed } },
          ],
        }
      : undefined,
    orderBy: { nameKana: "asc" },
    select: {
      id: true,
      name: true,
      nameKana: true,
      address: true,
      phone: true,
      contactPerson: true,
    },
  });
}

/** 顧客ワークスペース（4ペイン連動用） */
export async function getCustomerWorkspace(
  customerId: string
): Promise<CustomerWorkspace | null> {
  const row = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      constructions: { orderBy: { contractDate: "desc" } },
      documents: { orderBy: [{ folder: "asc" }, { fileName: "asc" }] },
    },
  });

  if (!row) return null;

  return {
    customer: {
      id: row.id,
      name: row.name,
      nameKana: row.nameKana,
      address: row.address,
      phone: row.phone,
      contactPerson: row.contactPerson,
    },
    constructions: row.constructions.map((c) => ({
      id: c.id,
      contractDate: c.contractDate.toISOString(),
      title: c.title,
      progress: c.progress,
    })),
    documents: row.documents.map((d) => ({
      id: d.id,
      folder: d.folder,
      fileName: d.fileName,
      fileSize: d.fileSize,
      updatedAt: d.updatedAt.toISOString(),
    })),
  };
}

/** 全顧客ワークスペース一括取得（クライアント連動用） */
export async function getAllWorkspaces(): Promise<CustomerWorkspace[]> {
  const customers = await prisma.customer.findMany({
    include: {
      constructions: { orderBy: { contractDate: "desc" } },
      documents: { orderBy: [{ folder: "asc" }, { fileName: "asc" }] },
    },
    orderBy: { nameKana: "asc" },
  });

  return customers.map((row) => ({
    customer: {
      id: row.id,
      name: row.name,
      nameKana: row.nameKana,
      address: row.address,
      phone: row.phone,
      contactPerson: row.contactPerson,
    },
    constructions: row.constructions.map((c) => ({
      id: c.id,
      contractDate: c.contractDate.toISOString(),
      title: c.title,
      progress: c.progress,
    })),
    documents: row.documents.map((d) => ({
      id: d.id,
      folder: d.folder,
      fileName: d.fileName,
      fileSize: d.fileSize,
      updatedAt: d.updatedAt.toISOString(),
    })),
  }));
}
