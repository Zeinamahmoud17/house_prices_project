from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import joblib
import os

from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.preprocessing import prepare_input_data

model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the model once at startup
    global model
    
    # Using your exact absolute path (with the raw string 'r' prefix for Windows)
    model_path = r"C:\Users\COMPUMARTS\Desktop\house_prices_project\backend\models\house_price.pkl"
    
    try:
        model = joblib.load(model_path)
        print("Model loaded successfully!")
    except Exception as e:
        print(f"Error loading model: {e}")
    
    yield
    # Clean up on shutdown if needed
    model = None

app = FastAPI(lifespan=lifespan)

# Allow React frontend port
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictionResponse)
def predict_price(request: PredictionRequest):
    if model is None:
        raise HTTPException(status_code=503, detail="Model is not loaded.")
    
    try:
        df_input = prepare_input_data(request.model_dump())
        prediction = model.predict(df_input)[0]
        return PredictionResponse(predicted_price=prediction)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))