
# Financial Data Filtering App

Welcome to the **Financial Data Filtering App**!  
This project allows you to fetch and filter Apple's financial data, including revenue, net income, and more. You can also sort these records and view them in a user-friendly table.

## Project Structure

```
root
├── backend
│   ├── README.md
│   ├── Dockerfile
│   └── ... (Python FastAPI code)
├── frontend
│   ├── README.md
│   ├── Dockerfile
│   ├── nginx.conf
│   └── ... (Next.js + React code)
└── docker-compose.yml
```

- **backend/**: Contains the Python FastAPI service that fetches and filters the financial data.
- **frontend/**: Contains the Next.js + React application that displays and filters the data.
- **docker-compose.yml**: Spins up everything at once:
    - **Backend** accessible internally on port `8000`.
    - **Frontend** served by Nginx on port `8080`, with `/api` requests proxied to the backend.

## How to Start Everything with Docker Compose

1. **Install Docker** and **Docker Compose** on your machine if not already installed.
2. In your terminal, navigate to the **root** folder where `docker-compose.yml` is located.
3. Run the following command:
   ```bash
   docker-compose up --build
   ```
4. Once the containers are running, open your browser and go to [http://localhost:8080](http://localhost:8080).
    - The **frontend** will be served at the root (`/`).
    - API requests (like `/api/...`) will be automatically sent to the **backend**.

## Stopping the Project

To stop all running containers:
```bash
docker-compose down
```

## Additional Notes

- Make sure to update your `.env` files (e.g., in the backend) with your actual API key for Financial Modeling Prep.
- If you want to develop locally (without Docker), see the **backend** and **frontend** `README.md` files for instructions.
