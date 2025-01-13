# backend/app/config.py

import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
    """
    Holds configuration settings loaded from environment variables
    or default values.
    """
    FMP_API_KEY: str = os.getenv("FMP_API_KEY", "no-api-key-provided")
    FMP_API_URL: str = "https://financialmodelingprep.com/api/v3"
    DEBUG: bool = os.getenv("DEBUG", "True").lower() in ("true", "1", "t")
    ALLOWED_ORIGINS: list = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:8080").split(",")


settings = Settings()
