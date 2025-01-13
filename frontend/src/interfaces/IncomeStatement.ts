// frontend/src/interfaces/IncomeStatement.ts

/*
  Developer note: Matches the DTO from the backend
  for each row of financial data.
*/

export interface IncomeStatement {
  date: string;
  revenue?: number;
  netIncome?: number;
  grossProfit?: number;
  eps?: number;
  operatingIncome?: number;
}
