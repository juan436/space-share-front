import { configureHttpClient, createHttpClient } from "@/infrastructure/http/httpClientFactory";
import { TokenStorage } from "@/infrastructure/services/TokenStorage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006/api";

let isRefreshing = false;

configureHttpClient({
  baseUrl: API_BASE_URL,
  getAccessToken: () => TokenStorage.get()?.accessToken,
  onUnauthorized: async () => {
    if (isRefreshing) return false;
    const tokens = TokenStorage.get();
    if (!tokens?.refreshToken) return false;

    isRefreshing = true;
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      });

      if (!response.ok) {
        TokenStorage.clear();
        return false;
      }

      const data = (await response.json().catch(() => null)) as
        | { accessToken: string; refreshToken: string }
        | null;

      if (!data?.accessToken || !data?.refreshToken) {
        TokenStorage.clear();
        return false;
      }

      TokenStorage.save({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      return true;
    } finally {
      isRefreshing = false;
    }
  },
});

export const httpClient = createHttpClient();
