const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const predictPrice = async (data: any) => {
  const response = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch prediction');
  }
  return response.json();
};