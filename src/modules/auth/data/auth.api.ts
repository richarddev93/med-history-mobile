import { http } from '@/lib/http';

const loginApi = async (email: string, password: string) => {
  try {
    const response = await http.post('/auth/login', {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const authApi = {
  login: loginApi,
};
