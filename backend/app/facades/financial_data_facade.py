# backend/app/facades/financial_data_facade.py

import logging
import math

from ..clients.fmp_client import FMPClient
from ..dtos.filter_dto import FinancialDataFilterDTO
from ..dtos.income_statement_dto import IncomeStatementDTO
from ..dtos.income_statements_pageable_dto import IncomeStatementsPageableDTO
from ..dtos.pagination_dto import PaginationDTO
from ..dtos.sorting_dto import SortingDTO
from ..services.financial_data_service import FinancialDataService

logger = logging.getLogger(__name__)


class FinancialDataFacade:
    """
    Facade class for orchestrating data fetching, filtering, sorting, and pagination.
    Controllers call this facade to retrieve data in a clean, consistent format.
    """

    @staticmethod
    def get_financial_data(filters: FinancialDataFilterDTO) -> list[IncomeStatementDTO]:
        """
        Returns a simple list of IncomeStatementDTO, filtered and sorted (no pagination).
        """
        logger.info("Fetching income statements (unpaged).")

        # Step 1: Fetch from client (mock or real)
        dtos = FMPClient.fetch_income_statements()

        # Step 2: Filter
        filtered = FinancialDataService.filter_income_statements(dtos, filters)

        # Step 3: Sort
        sorted_results = FinancialDataService.sort_income_statements(filtered, filters)

        logger.info("Returning unpaged financial data.")
        return sorted_results

    @staticmethod
    def get_financial_data_paged(filters: FinancialDataFilterDTO) -> IncomeStatementsPageableDTO:
        """
        Returns DataTableResponseDTO with items, pagination, and sorting details.
        """
        logger.info("Fetching income statements (paged).")

        # Step 1: Fetch
        dtos = FMPClient.fetch_income_statements()

        # Step 2: Filter
        filtered = FinancialDataService.filter_income_statements(dtos, filters)

        # Step 3: Sort
        sorted_results = FinancialDataService.sort_income_statements(filtered, filters)

        # Step 4: Pagination
        total_count = len(sorted_results)
        page = filters.page
        page_size = filters.page_size
        paged_items = FinancialDataService.paginate_income_statements(sorted_results, page, page_size)
        total_pages = math.ceil(total_count / page_size) if page_size else 1

        # Prepare pagination structure
        pagination = PaginationDTO(
            page=page,
            page_size=page_size,
            total_count=total_count,
            total_pages=total_pages
        )

        # Prepare sorting structure (also return available fields & orders)
        sorting = SortingDTO(
            field=filters.sort_field,
            order=filters.sort_order,
            available_fields=FinancialDataService.get_available_sorting_fields(),
            available_orders=FinancialDataService.get_available_sort_orders()
        )

        logger.info("Returning paged financial data.")
        return IncomeStatementsPageableDTO(
            items=paged_items,
            pagination=pagination,
            sorting=sorting
        )
