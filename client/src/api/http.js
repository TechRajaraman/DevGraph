import axios from 'axios';

const defaultApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? `${window.location.origin}/api`
    : 'http://localhost:5001/api');

export const http = axios.create({
  baseURL: defaultApiBaseUrl,
  timeout: 60000
});
