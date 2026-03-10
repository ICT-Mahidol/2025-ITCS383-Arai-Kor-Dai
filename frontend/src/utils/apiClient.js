import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error);
    }

    const code = error.code || 'UNKNOWN';
    const message = error.message || 'Network error: please try again.';
    return Promise.reject(new Error(`Network error [${code}]: ${message}`));
  }
);

export default apiClient;
