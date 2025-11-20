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
    console.log("HTTP error:", error);

    const originalRequest = error.config;
    const { tokens, refreshSession, logout } = useAuthStore.getState();

    // Se falhou e NÃO é o /auth/refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&           // evita loop
      tokens?.refreshToken &&
      !originalRequest.url.includes("/auth/refresh") // evita loop 401 -> refresh -> 401
    ) {
      originalRequest._retry = true;

      try {
        console.log("📌 tentando refresh...");

        await refreshSession(); // isto atualiza o store
        const newTokens = useAuthStore.getState().tokens;

        // --- CORREÇÃO: headers no axios RN ---
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newTokens?.accessToken}`,
        };

        return http(originalRequest); // retry
      } catch (err) {
        console.log("❌ Refresh falhou -> logout", err);
        logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);


}