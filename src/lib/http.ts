import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

export const http = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 10000,
});

// Intercepta requisições e injeta token
http.interceptors.request.use(
  async (config) => {
    const { tokens } = useAuthStore.getState();
    if (tokens?.accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${tokens.accessToken}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepta erros 401 e limpa auth
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();
    }
    return Promise.reject(error);
  }
);
