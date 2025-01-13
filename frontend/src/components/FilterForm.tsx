// frontend/src/components/FilterForm.tsx

"use client";
import React, { useEffect, useState } from "react";
import { FilterParams } from "@/interfaces/FilterParams";

/*
  Represents a sorting field that the backend can sort by.
  Typically includes both the field name and a user-friendly label.
*/
interface SortFieldOption {
    field: string;
    label: string;
}

interface FilterFormProps {
    // Filter fields to show in the form (excluding page & page_size).
    defaultFilters?: Omit<FilterParams, "page" | "page_size">;

    // Callback when the user applies new filters.
    onChangeFilters: (filters: FilterParams) => void;

    // List of sorting fields from the backend.
    availableSortFields: SortFieldOption[];

    // Possible sort orders (asc, desc).
    availableSortOrders: string[];
}

export const FilterForm: React.FC<FilterFormProps> = ({
                                                          defaultFilters,
                                                          onChangeFilters,
                                                          availableSortFields,
                                                          availableSortOrders,
                                                      }) => {
    // Extract only the filter fields relevant to this form
    const {
        start_year,
        end_year,
        min_revenue,
        max_revenue,
        min_net_income,
        max_net_income,
        sort_field,
        sort_order,
    } = defaultFilters || {};

    // Local state to store user input before we submit it
    const [localStartYear, setLocalStartYear] = useState<number | undefined>(start_year);
    const [localEndYear, setLocalEndYear] = useState<number | undefined>(end_year);
    const [localMinRev, setLocalMinRev] = useState<number | undefined>(min_revenue);
    const [localMaxRev, setLocalMaxRev] = useState<number | undefined>(max_revenue);
    const [localMinNI, setLocalMinNI] = useState<number | undefined>(min_net_income);
    const [localMaxNI, setLocalMaxNI] = useState<number | undefined>(max_net_income);
    const [localSortField, setLocalSortField] = useState<string>(sort_field || "");
    const [localSortOrder, setLocalSortOrder] = useState<string>(sort_order || "asc");

    // If parent passes new defaultFilters, re-sync local states
    useEffect(() => {
        setLocalStartYear(start_year);
        setLocalEndYear(end_year);
        setLocalMinRev(min_revenue);
        setLocalMaxRev(max_revenue);
        setLocalMinNI(min_net_income);
        setLocalMaxNI(max_net_income);
        setLocalSortField(sort_field || "");
        setLocalSortOrder(sort_order || "asc");
    }, [
        start_year,
        end_year,
        min_revenue,
        max_revenue,
        min_net_income,
        max_net_income,
        sort_field,
        sort_order,
    ]);

    // On form submission => pass updated filters to parent
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onChangeFilters({
            start_year: localStartYear,
            end_year: localEndYear,
            min_revenue: localMinRev,
            max_revenue: localMaxRev,
            min_net_income: localMinNI,
            max_net_income: localMaxNI,
            sort_field: localSortField,
            sort_order: localSortOrder,
        });
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 mb-4 rounded shadow text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Start Year */}
                <div>
                    <label className="block font-semibold mb-1">Start Year</label>
                    <input
                        type="number"
                        className="w-full border rounded p-2"
                        value={localStartYear || ""}
                        onChange={(e) => setLocalStartYear(e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="e.g. 2020"
                    />
                </div>

                {/* End Year */}
                <div>
                    <label className="block font-semibold mb-1">End Year</label>
                    <input
                        type="number"
                        className="w-full border rounded p-2"
                        value={localEndYear || ""}
                        onChange={(e) => setLocalEndYear(e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="e.g. 2024"
                    />
                </div>

                {/* Min Revenue */}
                <div>
                    <label className="block font-semibold mb-1">Min Revenue</label>
                    <input
                        type="number"
                        className="w-full border rounded p-2"
                        value={localMinRev || ""}
                        onChange={(e) => setLocalMinRev(e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="e.g. 10000000"
                    />
                </div>

                {/* Max Revenue */}
                <div>
                    <label className="block font-semibold mb-1">Max Revenue</label>
                    <input
                        type="number"
                        className="w-full border rounded p-2"
                        value={localMaxRev || ""}
                        onChange={(e) => setLocalMaxRev(e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="e.g. 50000000"
                    />
                </div>

                {/* Min Net Income */}
                <div>
                    <label className="block font-semibold mb-1">Min Net Income</label>
                    <input
                        type="number"
                        className="w-full border rounded p-2"
                        value={localMinNI || ""}
                        onChange={(e) => setLocalMinNI(e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="e.g. 10000000"
                    />
                </div>

                {/* Max Net Income */}
                <div>
                    <label className="block font-semibold mb-1">Max Net Income</label>
                    <input
                        type="number"
                        className="w-full border rounded p-2"
                        value={localMaxNI || ""}
                        onChange={(e) => setLocalMaxNI(e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="e.g. 90000000"
                    />
                </div>

                {/* Sort Field */}
                <div>
                    <label className="block font-semibold mb-1">Sort Field</label>
                    <select
                        className="w-full border rounded p-2"
                        value={localSortField}
                        onChange={(e) => setLocalSortField(e.target.value)}
                    >
                        {availableSortFields.map((sf) => (
                            <option key={sf.field} value={sf.field}>
                                {sf.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort Order */}
                <div>
                    <label className="block font-semibold mb-1">Sort Order</label>
                    <select
                        className="w-full border rounded p-2"
                        value={localSortOrder}
                        onChange={(e) => setLocalSortOrder(e.target.value)}
                    >
                        {availableSortOrders.map((order) => (
                            <option key={order} value={order}>
                                {order === "asc" ? "Ascending" : "Descending"}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Apply Filters &amp; Fetch Data
            </button>
        </form>
    );
};
