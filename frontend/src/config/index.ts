// frontend/src/config/index.ts

/*
  Developer note: This config defines the list of constants used in the application.
  Adjust the BACKEND_URL as necessary for different environments.
*/

export const BACKEND_URL: string =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
    FINANCIAL_DATA: `${BACKEND_URL}/financial-data`,
    FINANCIAL_DATA_PAGED: `${BACKEND_URL}/financial-data/paged`,
    // Add additional endpoints here as needed.
};
