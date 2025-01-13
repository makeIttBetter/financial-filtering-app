# backend/app/main.py

import logging

from fastapi import FastAPI

from .controllers.financial_data_controller import router
from .logging_config import setup_logging
from .middleware import add_cors_middleware


def create_app() -> FastAPI:
    """
    Application factory to create the FastAPI app.
    """
    # Setup logging first
    setup_logging()

    app = FastAPI(title="Financial Data Filtering App", version="1.0.0")

    # Add CORS middleware
    add_cors_middleware(app)

    # Include the APIRouter from controllers
    app.include_router(router)

    # Log application startup
    logger = logging.getLogger(__name__)
    logger.info("Application startup complete.")

    return app


app = create_app()
