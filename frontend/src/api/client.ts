const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://api-demo.etalonfood.com:9000";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export { API_BASE_URL, request };
