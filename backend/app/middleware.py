# backend/app/middleware.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings


def add_cors_middleware(app: FastAPI):
    """
    Adds CORS middleware to the FastAPI application based on settings.
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
