import axios from 'axios';

// Base Axios instance configured for future Spring Boot REST API (Phase 2)
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
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
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'An unexpected server error occurred';

    if (status === 401) {
      // Clear authentication state centrally
      localStorage.removeItem('careerai_auth_user');
      localStorage.removeItem('careerai_token');
      
      // Dispatch a custom event to notify AuthContext or UI components
      window.dispatchEvent(new CustomEvent('auth-expired', { detail: message }));
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login?expired=true';
      }
    }

    const customError = {
      message: status === 401 ? 'Your session has expired. Please log in again.' : message,
      status: status,
    };
    return Promise.reject(customError);
  }
);

// Helper simulator for realistic network latency in Phase 1 mock mode
export const simulateDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default apiClient;
