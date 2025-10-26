import { create } from 'zustand';

type Tokens = { accessToken: string; refreshToken: string };
type User = { id: string; name: string; email: string };

type AuthState = {
  user?: User;
  tokens?: Tokens;
  loading: boolean;
  error?: string;
  login: (user: User, tokens: Tokens) => void;
  logout: () => void;
  setLoading: (v: boolean) => void;
  setError: (e?: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  tokens: undefined,
  loading: false,
  login: (user, tokens) => set({ user, tokens, loading: false }),
  logout: () => set({ user: undefined, tokens: undefined }),
  setLoading: (v) => set({ loading: v }),
  setError: (e) => set({ error: e }),
}));
