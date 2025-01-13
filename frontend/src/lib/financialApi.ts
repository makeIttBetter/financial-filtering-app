// frontend/src/lib/financialApi.ts

import { apiGet } from "@/lib/api";
import { IncomeStatement } from "@/interfaces/IncomeStatement";
import { FilterParams } from "@/interfaces/FilterParams";
import { IncomeStatementsPaged } from "@/interfaces/IncomeStatementsPaged";

/*
  Fetch all financial data without pagination (if needed).
*/
export async function fetchFinancialData(filters: FilterParams): Promise<IncomeStatement[]> {
    return apiGet<IncomeStatement[]>("FINANCIAL_DATA", filters);
}

/*
  Fetch paginated financial data from the backend.
*/
export async function fetchPagedFinancialData(
    filters: FilterParams
): Promise<IncomeStatementsPaged> {
    return apiGet<IncomeStatementsPaged>("FINANCIAL_DATA_PAGED", filters);
}
