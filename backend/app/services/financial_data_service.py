# backend/app/services/financial_data_service.py

import logging
from typing import List

from ..dtos.filter_dto import FinancialDataFilterDTO
from ..dtos.income_statement_dto import IncomeStatementDTO

logger = logging.getLogger(__name__)

# A constant listing valid fields for sorting along with user-friendly labels
VALID_SORT_FIELDS = [
    {"field": "date", "label": "Date"},
    {"field": "revenue", "label": "Revenue"},
    {"field": "netIncome", "label": "Net Income"}
]

VALID_SORT_ORDERS = ["asc", "desc"]


class FinancialDataService:
    """
    Handles filtering, sorting, and pagination of financial data DTOs.
    """

    @staticmethod
    def filter_income_statements(
            dtos: List[IncomeStatementDTO],
            filter_request: FinancialDataFilterDTO
    ) -> List[IncomeStatementDTO]:
        """
        Filters the list of IncomeStatementDTOs based on the criteria in filter_request.
        """
        logger.debug("Starting to filter income statements.")
        filtered = []

        for item in dtos:
            # Extract the year from 'YYYY-MM-DD'
            year_str = item.date.split("-")[0] if item.date else None
            year = int(year_str) if year_str and year_str.isdigit() else None

            # Filter by start_year / end_year
            if filter_request.start_year and year and year < filter_request.start_year:
                continue
            if filter_request.end_year and year and year > filter_request.end_year:
                continue

            # Filter by min_revenue / max_revenue
            if (filter_request.min_revenue is not None and
                    item.revenue is not None and
                    item.revenue < filter_request.min_revenue):
                continue
            if (filter_request.max_revenue is not None and
                    item.revenue is not None and
                    item.revenue > filter_request.max_revenue):
                continue

            # Filter by min_net_income / max_net_income
            if (filter_request.min_net_income is not None and
                    item.netIncome is not None and
                    item.netIncome < filter_request.min_net_income):
                continue
            if (filter_request.max_net_income is not None and
                    item.netIncome is not None and
                    item.netIncome > filter_request.max_net_income):
                continue

            filtered.append(item)

        logger.info(f"Filtered {len(filtered)} out of {len(dtos)} records.")
        return filtered

    @staticmethod
    def sort_income_statements(
            dtos: List[IncomeStatementDTO],
            filter_request: FinancialDataFilterDTO
    ) -> List[IncomeStatementDTO]:
        """
        Sorts the DTOs by the specified field (date, revenue, netIncome)
        in ascending or descending order.
        """
        field_to_sort = filter_request.sort_field
        order = filter_request.sort_order

        # Validate the requested sort field
        valid_fields = {item["field"] for item in VALID_SORT_FIELDS}
        if field_to_sort not in valid_fields:
            logger.warning(f"Invalid sort field: {field_to_sort}. Defaulting to 'date'.")
            field_to_sort = "date"

        # Validate the requested sort order
        if order not in VALID_SORT_ORDERS:
            logger.warning(f"Invalid sort order: {order}. Defaulting to 'asc'.")
            order = "asc"

        reverse = (order == "desc")
        logger.debug(f"Sorting by {field_to_sort} in {'descending' if reverse else 'ascending'} order.")

        sorted_dtos = sorted(
            dtos,
            key=lambda x: getattr(x, field_to_sort) or float('-inf'),
            reverse=reverse
        )

        logger.info(f"Sorted {len(sorted_dtos)} records by {field_to_sort} ({order}).")
        return sorted_dtos

    @staticmethod
    def paginate_income_statements(
            dtos: List[IncomeStatementDTO],
            page: int,
            page_size: int
    ) -> List[IncomeStatementDTO]:
        """
        Returns a sliced portion of the DTO list for the specified page and page_size.
        """
        if page < 1:
            page = 1
        if page_size < 1:
            page_size = 10  # fallback

        start_index = (page - 1) * page_size
        end_index = start_index + page_size
        return dtos[start_index:end_index]

    @staticmethod
    def get_available_sorting_fields() -> List[dict]:
        """
        Returns a list of allowed sorting fields and their user-friendly labels.
        """
        return VALID_SORT_FIELDS

    @staticmethod
    def get_available_sort_orders() -> List[str]:
        """
        Returns a list of allowed sort orders.
        """
        return VALID_SORT_ORDERS
