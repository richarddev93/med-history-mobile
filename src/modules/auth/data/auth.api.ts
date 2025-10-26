import { http } from '@/lib/http';

export const authApi = {
  login: async (email: string, password: string) =>
    (await http.post('/auth/login', { email, password })).data,
};
