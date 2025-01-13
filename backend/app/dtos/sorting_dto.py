# backend/app/dtos/sorting_dto.py

from typing import List, Dict

from pydantic import BaseModel


class SortingDTO(BaseModel):
    """
    Holds sorting information for both requests and responses,
    including labels for the frontend UI.
    """

    field: str  # e.g. 'date', 'revenue', 'netIncome'
    order: str  # 'asc' or 'desc'
    available_fields: List[Dict[str, str]]  # e.g. [{'field': 'date', 'label': 'Date'}, ...]
    available_orders: List[str]  # e.g. ['asc', 'desc']
