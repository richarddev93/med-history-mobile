import { http } from '@/lib/http';
import {
  LoginData,
  LoginResponseSchema,
  RefreshSessionData,
  TokenSchema,
} from '@/schemas/auth.schema';
import { AxiosError } from 'axios';

const loginApi = async ({ email, password }: LoginData) => {
  try {
    const response = await http.post('/auth/login', {
      email,
      password,
    });
    const parsed = LoginResponseSchema.safeParse(response.data);
    console.log(parsed);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }

    return response.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

const refreshSession = async ({ userId, refreshToken }: RefreshSessionData) => {
  try {
    const response = await http.post('auth/refresh', {
      userId,
      refreshToken,
    });

    const parsed = TokenSchema.safeParse(response.data);
    if (!parsed.success) console.error(parsed.error);

    return response.data;
  } catch (error: any) {
    console.error('Refresh session error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Refresh Session failed');
  }
};

const logout = async (userId: string) => {
  const response = await http.post('auth/logout', {
    userId,
  });

  return response.data;
};

export const authApi = {
  login: loginApi,
  refreshSession,
  logout,
};
