---

```markdown
# House Price Prediction (End-to-End ML Web App)

## Overview
This repository contains a complete, end-to-end machine learning product that predicts real estate prices in India. Built by an Artificial Intelligence and Data Science student at the Faculty of Computer Science, Suez Canal University, this project covers the entire ML lifecycle: from raw data exploration and cleaning to model training, and finally serving the model via a FastAPI backend connected to a React frontend.

## Architecture Diagram
```text
[ Kaggle Dataset ] --> [ Jupyter Notebook (Pandas & Scikit-Learn) ]
                                |
                                v (Exports .pkl pipeline & locations.json)
                                |
[ React Frontend ] <----(REST API/JSON)----> [ FastAPI Backend ]
  (Vite + TS)                                (Loads .pkl model)

```

## Tech Stack

* **Machine Learning & Data Processing:** Python 3.11, Pandas, NumPy, Scikit-Learn, Matplotlib, Seaborn


* **Backend API:** FastAPI, Uvicorn, Pydantic, Joblib


* **Frontend Interface:** React, TypeScript, Vite, React Router



## Project Structure

```text
house_prices_project/
├── backend/                  # FastAPI server application
│   ├── app/                  # API routes, schemas, and prediction services
│   ├── models/               # Contains house_price.pkl and locations.json
│   └── requirements.txt      # Pinned Python dependencies
├── frontend/                 # React application
│   ├── src/                  # React components, API client, and styles
│   └── .env.example          # Template for frontend environment variables
├── notebooks/                
│   ├── data/                 # Directory for the raw CSV (ignored in version control)
│   └── house_price_model.ipynb # Data cleaning, EDA, and model training
└── README.md

```

## Dataset Setup

This project uses the **House Price** dataset by Juhi Bhojani.

* **Link:** [Kaggle: House Price by Juhi Bhojani](https://www.kaggle.com/datasets/juhibhojani/house-price)

* **Instructions:** Download the dataset, extract it, and place the `house_prices.csv` file inside the `notebooks/data/` directory.


* *Note: The raw CSV is explicitly ignored by version control due to its size.*


## Local Environment Setup

### 1. Backend Setup

Navigate to the `backend` directory, create a virtual environment, and start the FastAPI server:

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # On Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

```

The API will be available at `http://localhost:8000`.

### 2. Frontend Setup

Navigate to the `frontend` directory, install Node packages, and start the Vite development server:

```bash
cd frontend
npm install
npm run dev

```

The React app will be available at `http://localhost:5173`.

## Environment Variables

Create a `.env` file in the `frontend/` directory with the following configuration:

| Variable | Description | Default Value |
| --- | --- | --- |
| `VITE_API_BASE_URL` | The URL for the backend API | `http://localhost:8000` |

## API Reference

**Endpoint:** `POST /predict`

You can test the backend directly using the following `curl` command:

```bash
curl -X POST http://localhost:8000/predict -H "accept: application/json" -H "Content-Type: application/json" -d "{\"location\": \"other\", \"carpet_area_sqft\": 1200, \"floor_num\": 2, \"bathroom\": 2, \"balcony\": 1, \"Furnishing\": \"Semi-Furnished\", \"Transaction\": \"Resale\", \"Ownership\": \"Freehold\", \"facing\": \"East\"}"

```

**Expected Response:**

```json
{
  "predicted_price": 4250000.0
}

```

## Model Metrics

The chosen model for this application is the **Random Forest Regressor**, which utilizes a robust `Pipeline` and `ColumnTransformer` to handle dynamic data imputation and one-hot encoding internally.

* **MAE (Mean Absolute Error):** *[Replace with the final MAE from your notebook]*

* **RMSE (Root Mean Squared Error):** *[Replace with the final RMSE from your notebook]*

* **R² Score:** *[Replace with the final R² from your notebook]*
```

```
