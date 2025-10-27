import { useState, useMemo } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { authApi } from '../data/auth.api';
import { LoginResponse, LoginSchema } from '@/schemas/auth.schema';
import { useMutation } from '@tanstack/react-query';

export function useAuthVM() {
  const { login, setLoading, setError, loading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = useMemo(() => email.length > 3 && password.length >= 6, [email, password]);

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data: LoginResponse) => {
      login(data.user, { accessToken: data.accessToken, refreshToken: data.refreshToken });
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  const handleLogin = async () => {
    try {
      setLoading(true);
      const parsed = LoginSchema.safeParse({ email, password });
      if (!parsed.success) {
        setError(parsed.error.message);
        return;
      }
      loginMutation.mutate(parsed.data);

      // const data = await authApi.login(email, password);
      // login(data.user, { accessToken: data.accessToken, refreshToken: data.refreshToken });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, handleLogin, canSubmit, loading: loginMutation.isPending };
}
