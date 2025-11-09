
import { http } from '../../../lib/http';
import {
  LoginData,
  LoginResponseSchema,
  RefreshSessionData,
  TokenSchema,
  RegisterData,
  MeSchema,
} from '../../../schemas/auth.schema';
import { AxiosError } from 'axios';

const register = async (data: RegisterData) => {
  try {
    const response = await http.post('/auth/register', data);
    if (!response || !response.data) {
      throw new Error('Resposta da API de login está vazia ou inválida');
    }
    const parsed = LoginResponseSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }
    return parsed.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
    console.error('Register error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Register failed');
  }
};

const login = async ({ email, password }: LoginData) => {
  try {
    const response = await http.post('/auth/login', {
      email,
      password,
    });
    const parsed = LoginResponseSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }
    return parsed.data;
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
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }

    return parsed.data;
  } catch (error: any) {
    console.error('Refresh session error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Refresh Session failed');
  }
};

const logout = async (userId: string) => {
  try {
    const response = await http.post('auth/logout', {
      userId,
    });
    return response.data;
  } catch (error: any) {
    console.error('Logout error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

const getMe = async () => {
  try {
    const response = await http.get('/auth/me');
    const parsed = MeSchema.safeParse(response.data);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }
    return parsed.data;
  } catch (error: any) {
    console.error('Get me error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Get me failed');
  }
};

export const authApi = {
  register,
  login,
  refreshSession,
  logout,
  getMe,
};
