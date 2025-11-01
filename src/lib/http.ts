import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 10000,
});

