import axios from 'axios';

// Base Axios instance configured for future Spring Boot REST API (Phase 2)
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for JWT token injection in Phase 2
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('careerai_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected server error occurred',
      status: error.response?.status,
    };
    return Promise.reject(customError);
  }
);

// Helper simulator for realistic network latency in Phase 1 mock mode
export const simulateDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default apiClient;
