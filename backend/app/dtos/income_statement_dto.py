# backend/app/dtos/income_statement_dto.py

from typing import Optional

from pydantic import BaseModel


class IncomeStatementDTO(BaseModel):
    """
    Represents a single record from the Income Statement data returned
    by the Financial Modeling Prep API (or from the database).
    """
    date: str
    revenue: Optional[float]
    netIncome: Optional[float]
    grossProfit: Optional[float]
    eps: Optional[float]
    operatingIncome: Optional[float]
