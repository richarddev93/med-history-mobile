import { useState, useMemo } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { authApi } from '../data/auth.api';

export function useAuthVM() {
  const { login, setLoading, setError, loading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = useMemo(() => email.length > 3 && password.length >= 6, [email, password]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await authApi.login(email, password);
      login(data.user, { accessToken: data.accessToken, refreshToken: data.refreshToken });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, handleLogin, canSubmit, loading };
}
