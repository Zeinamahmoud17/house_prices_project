# House Price Prediction (End-to-End ML Web App)

## Overview
A full-stack machine learning application that predicts house prices based on property listings from India. 

## Tech Stack
*   **Data & ML:** Python 3.11, pandas, scikit-learn
*   **Backend:** FastAPI, uvicorn
*   **Frontend:** React, TypeScript, Vite

## Setup Instructions

### 1. Dataset
Download the dataset from [Kaggle House Price by Juhi Bhojani](https://www.kaggle.com/datasets/juhibhojani/house-price). Extract `house_prices.csv` into `notebooks/data/`. Do not commit this file to version control.

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
uvicorn app.main:app --reload