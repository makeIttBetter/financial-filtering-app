// frontend/src/components/FinanceContent.tsx

"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterForm } from "@/components/FilterForm";
import { FinancialTable } from "@/components/FinancialTable";
import { PaginationControls } from "@/components/PaginationControls";
import { fetchPagedFinancialData } from "@/lib/financialApi";
import { FilterParams } from "@/interfaces/FilterParams";
import { IncomeStatementsPaged } from "@/interfaces/IncomeStatementsPaged";
import { SortingDTO } from "@/interfaces/SortingDTO";

function parseToNumber(value: string | null): number | undefined {
    if (value !== null) {
        const num = Number(value);
        if (!isNaN(num)) return num;
    }
    return undefined;
}

function parseUrlToFilters(sp: ReturnType<typeof useSearchParams>): FilterParams {
    const start_year     = parseToNumber(sp.get("start_year"));
    const end_year       = parseToNumber(sp.get("end_year"));
    const min_revenue    = parseToNumber(sp.get("min_revenue"));
    const max_revenue    = parseToNumber(sp.get("max_revenue"));
    const min_net_income = parseToNumber(sp.get("min_net_income"));
    const max_net_income = parseToNumber(sp.get("max_net_income"));
    const sort_field     = sp.get("sort_field") || undefined;
    const sort_order     = sp.get("sort_order") || undefined;
    const page           = parseToNumber(sp.get("page")) ?? 1;
    const page_size      = parseToNumber(sp.get("page_size")) ?? 10;

    return {
        start_year,
        end_year,
        min_revenue,
        max_revenue,
        min_net_income,
        max_net_income,
        sort_field,
        sort_order,
        page,
        page_size,
    };
}

function filtersToQuery(filters: FilterParams): Record<string, string> {
    const query: Record<string, string> = {};

    if (filters.start_year !== undefined)     query.start_year = String(filters.start_year);
    if (filters.end_year !== undefined)       query.end_year = String(filters.end_year);
    if (filters.min_revenue !== undefined)    query.min_revenue = String(filters.min_revenue);
    if (filters.max_revenue !== undefined)    query.max_revenue = String(filters.max_revenue);
    if (filters.min_net_income !== undefined) query.min_net_income = String(filters.min_net_income);
    if (filters.max_net_income !== undefined) query.max_net_income = String(filters.max_net_income);
    if (filters.sort_field)                   query.sort_field = filters.sort_field;
    if (filters.sort_order)                   query.sort_order = filters.sort_order;
    if (filters.page !== undefined)           query.page = String(filters.page);
    if (filters.page_size !== undefined)      query.page_size = String(filters.page_size);

    return query;
}

export default function FinanceContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState<FilterParams | null>(null);
    const [pagedData, setPagedData] = useState<IncomeStatementsPaged | null>(null);

    useEffect(() => {
        if (!searchParams) return;
        setFilters(parseUrlToFilters(searchParams));
    }, [searchParams]);

    useEffect(() => {
        if (filters === null) return;
        fetchPagedFinancialData(filters)
            .then((response) => setPagedData(response))
            .catch((error) => {
                console.error("Error fetching paged financial data:", error);
                setPagedData(null);
            });
    }, [filters]);

    function handleFilterChange(newFormFilters: FilterParams) {
        if (!filters) return;
        const merged = { ...filters, ...newFormFilters, page: 1 };
        const queryObject = filtersToQuery(merged);
        router.replace(`?${new URLSearchParams(queryObject).toString()}`);
    }

    function handlePageChange(newPage: number) {
        if (!filters) return;
        const updated = { ...filters, page: newPage };
        const queryObject = filtersToQuery(updated);
        router.replace(`?${new URLSearchParams(queryObject).toString()}`);
    }

    const sorting: SortingDTO | undefined = pagedData?.sorting;
    const availableSortFields = sorting?.available_fields || [];
    const availableSortOrders = sorting?.available_orders || ["asc", "desc"];

    return (
        <div className="p-4 min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Financial Data Filtering App</h1>

            {/* Render FilterForm only if we have filters. */}
            {filters && (
                <FilterForm
                    defaultFilters={{
                        start_year: filters.start_year,
                        end_year: filters.end_year,
                        min_revenue: filters.min_revenue,
                        max_revenue: filters.max_revenue,
                        min_net_income: filters.min_net_income,
                        max_net_income: filters.max_net_income,
                        sort_field: filters.sort_field,
                        sort_order: filters.sort_order,
                    }}
                    onChangeFilters={handleFilterChange}
                    availableSortFields={availableSortFields}
                    availableSortOrders={availableSortOrders}
                />
            )}

            {/* Display the fetched data in a table */}
            <FinancialTable data={pagedData?.items || []} />

            {/* Pagination controls */}
            {pagedData && (
                <PaginationControls
                    pagination={pagedData.pagination}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
