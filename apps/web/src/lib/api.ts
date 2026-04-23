import axios from 'axios';

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function healthCheck() {
  const res = await api.get('/health');
  return res.data as { status: string; service: string; timestamp: string };
}
