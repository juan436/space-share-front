import { configureHttpClient, createHttpClient } from "@/infrastructure/http/httpClientFactory";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006/api";
const TOKEN_KEY = "spaceshare_tokens";

let isRefreshing = false;

function getStoredTokens(): { accessToken?: string; refreshToken?: string } | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(TOKEN_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function saveTokens(tokens: { accessToken: string; refreshToken: string }) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}

function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

configureHttpClient({
  baseUrl: API_BASE_URL,
  getAccessToken: () => getStoredTokens()?.accessToken,
  onUnauthorized: async () => {
    if (isRefreshing) return false;
    const tokens = getStoredTokens();
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
        clearTokens();
        return false;
      }

      const data = (await response.json().catch(() => null)) as
        | { accessToken: string; refreshToken: string }
        | null;

      if (!data?.accessToken || !data?.refreshToken) {
        clearTokens();
        return false;
      }

      saveTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      return true;
    } finally {
      isRefreshing = false;
    }
  },
});

export const httpClient = createHttpClient();
