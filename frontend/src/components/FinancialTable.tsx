// frontend/src/components/FinancialTable.tsx

"use client";
import React from "react";
import { IncomeStatement } from "@/interfaces/IncomeStatement";

interface FinancialTableProps {
  data: IncomeStatement[];
}

export const FinancialTable: React.FC<FinancialTableProps> = ({ data }) => {
  // Developer note: We'll display a simple table with financial fields.
  // If there's no data, we show a small message.
  return (
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded shadow text-black">
          <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Revenue</th>
            <th className="px-4 py-2">Net Income</th>
            <th className="px-4 py-2">Gross Profit</th>
            <th className="px-4 py-2">EPS</th>
            <th className="px-4 py-2">Operating Income</th>
          </tr>
          </thead>
          <tbody>
          {data.map((item) => (
              <tr key={item.date} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-center">{item.date}</td>
                <td className="px-4 py-2 text-center">
                  {item.revenue !== undefined
                      ? `$${item.revenue.toLocaleString()}`
                      : "N/A"}
                </td>
                <td className="px-4 py-2 text-center">
                  {item.netIncome !== undefined
                      ? `$${item.netIncome.toLocaleString()}`
                      : "N/A"}
                </td>
                <td className="px-4 py-2 text-center">
                  {item.grossProfit !== undefined
                      ? `$${item.grossProfit.toLocaleString()}`
                      : "N/A"}
                </td>
                <td className="px-4 py-2 text-center">
                  {item.eps !== undefined ? item.eps.toFixed(2) : "N/A"}
                </td>
                <td className="px-4 py-2 text-center">
                  {item.operatingIncome !== undefined
                      ? `$${item.operatingIncome.toLocaleString()}`
                      : "N/A"}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
        {data.length === 0 && <p className="mt-2 text-black">No data available.</p>}
      </div>
  );
};
