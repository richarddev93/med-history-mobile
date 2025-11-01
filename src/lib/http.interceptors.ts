import { useAuthStore } from "@/store/useAuthStore";
import { http } from "./http";


export const  setupHttpInterceptors= ()=> {
    http.interceptors.request.use(
  async (config) => {
    const { tokens } = useAuthStore.getState();
    if (tokens?.accessToken) config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { tokens, logout, refreshSession } = useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry && tokens?.refreshToken) {
      originalRequest._retry = true;

      try {
        await refreshSession();
        const newTokens = useAuthStore.getState().tokens;
        originalRequest.headers.Authorization = `Bearer ${newTokens?.accessToken}`;

        return http(originalRequest);
      } catch {
        logout();
      }
    }
    return Promise.reject(error);
  }
);

}