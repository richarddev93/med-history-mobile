import { authApi } from '@/modules/auth/data/auth.api';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log('🧩 STORE carregada em:', new Date().toISOString());

type Tokens = { accessToken: string; refreshToken: string };
type User = { id: string; name: string; email: string };

type AuthState = {
  user?: User;
  tokens?: Tokens;
  loading: boolean;
  error?: string;
  login: (user: User, tokens: Tokens) => void;
  logout: () => void;
  isRestoring: boolean;

  refreshSession: () => Promise<void>;
  restoreSession: () => Promise<void>;
  setLoading: (v: boolean) => void;
  setError: (e?: string) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: undefined,
  tokens: undefined,
  loading: false,
  isRestoring: true,
  login: async (user, tokens) => {
    set({ user, tokens, loading: false });
    await AsyncStorage.setItem('auth', JSON.stringify({ user, tokens }));
  },
  logout: () => set({ user: undefined, tokens: undefined }),
  refreshSession: async () => {
    const { user, tokens } = get();
    if (!user || !tokens?.refreshToken) return;

    const dataTokens = await authApi.refreshSession({
      userId: user.id,
      refreshToken: tokens.refreshToken,
    });

    set({
      tokens: dataTokens,
    });
    await AsyncStorage.mergeItem('auth', JSON.stringify({ user, tokens: { ...dataTokens } }));
  },
  restoreSession: async () => {
    try {
      const stored = await AsyncStorage.getItem('auth');
      if (!stored) return;
      const parsed = JSON.parse(stored);
      set({
        user: parsed.user,
        tokens: parsed.tokens,
      });
    } finally {
      set({ isRestoring: false });
    }
  },
  setLoading: (v) => set({ loading: v }),
  setError: (e) => set({ error: e }),
}));
