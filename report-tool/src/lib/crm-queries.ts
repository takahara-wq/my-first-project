import { afters, customers, deals, progresses } from "@/lib/crm-data";
import type { After, Customer, CustomerWorkspace, Deal, Progress } from "@/lib/crm-types";

export function getCustomers(): Customer[] {
  return customers;
}

export function getCustomerById(id: string): Customer | undefined {
  return customers.find((customer) => customer.id === id);
}

export function getDealsByCustomerId(customerId: string): Deal[] {
  return deals.filter((deal) => deal.customerId === customerId);
}

export function getProgressByCustomerId(customerId: string): Progress[] {
  return progresses.filter((progress) => progress.customerId === customerId);
}

export function getAfterByCustomerId(customerId: string): After[] {
  return afters.filter((after) => after.customerId === customerId);
}

export function getProgressById(id: string): Progress | undefined {
  return progresses.find((progress) => progress.id === id);
}

export function getDealById(id: string): Deal | undefined {
  return deals.find((deal) => deal.id === id);
}

/** 顧客IDから4ペイン連動用のデータをまとめて取得 */
export function getCustomerWorkspace(
  customerId: string
): CustomerWorkspace | undefined {
  const customer = getCustomerById(customerId);
  if (!customer) return undefined;

  return {
    customer,
    deals: getDealsByCustomerId(customerId),
    progresses: getProgressByCustomerId(customerId),
    afters: getAfterByCustomerId(customerId),
  };
}
