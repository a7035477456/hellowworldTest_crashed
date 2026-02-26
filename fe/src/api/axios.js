import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:40000'),
  withCredentials: true, // Essential for sending/receiving cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor to handle 401s globally if needed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: redirect to login if not already there
      // window.location.href = '/pages/login';
    }
    return Promise.reject(error);
  }
);

export default api;
