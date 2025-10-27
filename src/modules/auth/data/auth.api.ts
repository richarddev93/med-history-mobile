import { http } from '@/lib/http';
import { LoginData, LoginResponseSchema } from '@/schemas/auth.schema';

const loginApi = async ({email, password}: LoginData) => {
  try {
    const response = await http.post('/auth/login', {
      email,
      password,
    });
    const parsed = LoginResponseSchema.safeParse(response.data);
    console.log(parsed)
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error('Formato inesperado da resposta do servidor');
    }

    return response.data;
  } catch (error: any) {
    console.log("error",error);
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const authApi = {
  login: loginApi,
};
