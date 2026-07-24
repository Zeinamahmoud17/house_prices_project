import { useState, useEffect } from 'react';
import { predictPrice } from '../api/predictionClient';

export default function PredictionForm() {
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, you might fetch this from the backend.
    // For now, assuming locations.json is placed in public/locations.json
    fetch('/locations.json')
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch(() => console.error("Failed to load locations"));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      location: formData.get('location'),
      carpet_area_sqft: Number(formData.get('carpet_area_sqft')),
      floor_num: Number(formData.get('floor_num')),
      bathroom: Number(formData.get('bathroom')),
      balcony: Number(formData.get('balcony')),
      Furnishing: formData.get('Furnishing'),
      Transaction: formData.get('Transaction'),
      Ownership: formData.get('Ownership'),
      facing: formData.get('facing')
    };

    try {
      const response = await predictPrice(data);
      setResult(response.predicted_price);
    } catch (err) {
      setError('An error occurred while predicting the price.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>House Price Predictor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <select name="location" required>
            <option value="">Select Location</option>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </label>
        
        <label>Carpet Area (sqft): <input type="number" name="carpet_area_sqft" min="1" required /></label>
        <label>Floor Number: <input type="number" name="floor_num" required /></label>
        <label>Bathrooms: <input type="number" name="bathroom" min="0" required /></label>
        <label>Balconies: <input type="number" name="balcony" min="0" required /></label>

        <label>Furnishing:
          <select name="Furnishing" required>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Furnished">Furnished</option>
          </select>
        </label>
        
        <label>Transaction:
          <select name="Transaction" required>
            <option value="Resale">Resale</option>
            <option value="New Property">New Property</option>
          </select>
        </label>

        <label>Ownership: <input type="text" name="Ownership" required placeholder="e.g. Freehold" /></label>
        <label>Facing: <input type="text" name="facing" required placeholder="e.g. East" /></label>

        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Price'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {result !== null && (
        <div className="result">
          <h3>Predicted Price: ₹{(result / 100000).toFixed(2)} Lac</h3>
        </div>
      )}
    </div>
  );
}