// frontend/src/interfaces/FilterParams.ts

/*
  Developer note: Represents user filters for the financial data.
  Matches backend parameter names so that the queries align.
*/

export interface FilterParams {
    // Year range
    start_year?: number;
    end_year?: number;

    // Revenue range
    min_revenue?: number;
    max_revenue?: number;

    // Net income range
    min_net_income?: number;
    max_net_income?: number;

    // Sorting
    sort_field?: string;
    sort_order?: string;

    // Pagination
    page?: number;
    page_size?: number;
}
