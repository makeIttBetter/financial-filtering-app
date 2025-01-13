# backend/app/clients/fmp_client.py

import logging
from typing import List

import requests

from ..config import settings
from ..dtos.income_statement_dto import IncomeStatementDTO

logger = logging.getLogger(__name__)
default_symbol = "AAPL"

class FMPClient:
    """
    Responsible for communicating with the Financial Modeling Prep (FMP) API.
    All FMP-related HTTP calls should go through this client class.
    """

    @staticmethod
    def fetch_income_statements(symbol: str = None) -> List[IncomeStatementDTO]:
        """
        Fetches annual income statement data from the Financial Modeling Prep API
        and returns a list of IncomeStatementDTO.
        """
        symbol = symbol or default_symbol
        api_key = settings.FMP_API_KEY
        endpoint = f"{settings.FMP_API_URL}/income-statement/{symbol}?period=annual&apikey={api_key}"

        logger.info("Fetching income statements from the Financial Modeling Prep API.")

        try:
            response = requests.get(endpoint)
            response.raise_for_status()  # Raises HTTPError if unsuccessful
            logger.info(f"Successfully fetched data for symbol: {symbol}")
        except requests.exceptions.HTTPError as http_err:
            logger.error(f"HTTP error: {http_err} - Response: {response.text}")
            raise
        except Exception as err:
            logger.error(f"Unexpected error while fetching data: {err}")
            raise

        data = response.json()

        # Convert each entry to an IncomeStatementDTO
        dtos = [
            IncomeStatementDTO(
                date=item.get("date"),
                revenue=item.get("revenue"),
                netIncome=item.get("netIncome"),
                grossProfit=item.get("grossProfit"),
                eps=item.get("eps"),
                operatingIncome=item.get("operatingIncome"),
            )
            for item in data
        ]
        logger.debug(f"Converted {len(dtos)} records to DTOs.")

        return dtos
