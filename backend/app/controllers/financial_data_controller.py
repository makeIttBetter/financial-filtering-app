# backend/app/controllers/financial_data_controller.py

import logging
from typing import List

from fastapi import APIRouter, Depends

from ..dtos.income_statements_pageable_dto import IncomeStatementsPageableDTO
from ..dtos.filter_dto import FinancialDataFilterDTO
from ..dtos.income_statement_dto import IncomeStatementDTO
from ..facades.financial_data_facade import FinancialDataFacade

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get("/financial-data", response_model=List[IncomeStatementDTO])
def get_financial_data(filters: FinancialDataFilterDTO = Depends()) -> List[IncomeStatementDTO]:
    """
    Endpoint: returns a simple list of filtered + sorted IncomeStatementDTO objects.
    (No pagination)
    """
    logger.info("Controller: GET /financial-data (unpaged)")
    return FinancialDataFacade.get_financial_data(filters)


@router.get("/financial-data/paged", response_model=IncomeStatementsPageableDTO)
def get_financial_data_paged(filters: FinancialDataFilterDTO = Depends()) -> IncomeStatementsPageableDTO:
    """
    Endpoint: returns a paginated and sorted list of IncomeStatementDTO,
    along with pagination and sorting details for the frontend.
    """
    logger.info("Controller: GET /financial-data/paged")
    return FinancialDataFacade.get_financial_data_paged(filters)
