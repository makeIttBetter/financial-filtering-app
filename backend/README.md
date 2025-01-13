
# Financial Data Filtering App (Backend)

This **FastAPI** backend provides filtered financial data from the [Financial Modeling Prep](https://financialmodelingprep.com/) API.  
It fetches Apple's income statements, applies filters (e.g., date range, revenue range), and returns results to the frontend.

## Prerequisites

- **Python 3.11+** (or any version specified in your `Dockerfile`)
- (Optional) **Virtual Environment** such as `venv` or `conda`
- **Pip** for installing dependencies

## Environment Variables

You can specify your environment variables in the file:
```
/root/backend/.env
```
For example:
```
FMP_API_KEY=YOUR_REAL_API_KEY
DEBUG=True
ALLOWED_ORIGINS=http://localhost:3000
```

## How to Run Locally

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
2. **Run FastAPI**:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```
3. **Test**:
    - Open [http://localhost:8000/docs](http://localhost:8000/docs) to see the interactive API docs.

## How to Run via Docker (Alone)

1. **Build Image**:
   ```bash
   docker build -t financial-data-backend .
   ```
2. **Run Container**:
   ```bash
   docker run -p 8000:8000 --env-file .env financial-data-backend
   ```
3. Open [http://localhost:8000](http://localhost:8000) in your browser to access the API.

## Project Files

- **app/** folder contains the FastAPI logic (controllers, services, etc.).
- **requirements.txt** lists dependencies.
- **Dockerfile** is the production Dockerfile.
- **.env** sets environment variables like API keys and debug flags.
