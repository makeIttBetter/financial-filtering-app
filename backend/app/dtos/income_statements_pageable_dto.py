# backend/app/dtos/income_statements_pageable_dto.py.py

from typing import List

from pydantic import BaseModel

from .income_statement_dto import IncomeStatementDTO
from .pagination_dto import PaginationDTO
from .sorting_dto import SortingDTO


class IncomeStatementsPageableDTO(BaseModel):
    """
    Combines the financial data items, pagination, and sorting details
    in a single response. This structure is easy for a frontend to consume.
    """

    items: List[IncomeStatementDTO]
    pagination: PaginationDTO
    sorting: SortingDTO
