export interface StoredTokens {
  accessToken: string;
  refreshToken: string;
}

const TOKEN_KEY = "spaceshare_tokens";

export const TokenStorage = {
  get(): StoredTokens | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as StoredTokens;
    } catch {
      return null;
    }
  },

  save(tokens: StoredTokens): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  },

  clear(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  },
};
