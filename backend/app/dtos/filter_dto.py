# backend/app/dtos/filter_dto.py

from typing import Optional

from pydantic import BaseModel


class FinancialDataFilterDTO(BaseModel):
    """
    DTO for filtering data.
    Includes year-range filters, revenue/netIncome filters,
    and separate fields for sorting/pagination.
    """

    # Year range filters
    start_year: Optional[int] = None
    end_year: Optional[int] = None

    # Revenue filters
    min_revenue: Optional[float] = None
    max_revenue: Optional[float] = None

    # Net income filters
    min_net_income: Optional[float] = None
    max_net_income: Optional[float] = None

    # Sorting
    sort_field: str = "date"  # The field to sort on: 'date', 'revenue', 'netIncome'
    sort_order: str = "asc"  # 'asc' or 'desc'

    # Pagination
    page: int = 1
    page_size: int = 10
