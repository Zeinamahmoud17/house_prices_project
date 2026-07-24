import pandas as pd
import json

# Using your exact absolute path (with the raw string 'r' prefix for Windows)
locations_path = r"C:\Users\COMPUMARTS\Desktop\house_prices_project\backend\models\locations.json"

# Load the saved locations list
with open(locations_path, "r") as f:
    valid_locations = json.load(f)

def prepare_input_data(request_data: dict) -> pd.DataFrame:
    # Map unknown locations to "other"
    if request_data["location"] not in valid_locations:
        request_data["location"] = "other"
    
    # Rename location key to match the trained model feature name
    request_data["location_grouped"] = request_data.pop("location")
    
    # Create a 1-row DataFrame
    return pd.DataFrame([request_data])