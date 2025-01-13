# backend/app/dtos/pagination_dto.py

from pydantic import BaseModel


class PaginationDTO(BaseModel):
    """
    Holds pagination information for both requests and responses.
    """

    page: int
    page_size: int
    total_pages: int
    total_count: int
