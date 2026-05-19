export interface FavoritesRepository {
  getFavorites(): Promise<string[]>;
  toggleFavorite(spaceId: string): Promise<{ favorites: string[]; added: boolean }>;
}
