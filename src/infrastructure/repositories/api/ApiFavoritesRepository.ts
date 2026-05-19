import { FavoritesRepository } from "@/core/domain/ports/FavoritesRepository";
import { HttpClient } from "@/infrastructure/http/HttpClient";

export class ApiFavoritesRepository implements FavoritesRepository {
  constructor(private http: HttpClient) {}

  async getFavorites(): Promise<string[]> {
    const res = await this.http.get<string[]>("/users/favorites");
    return res.data;
  }

  async toggleFavorite(spaceId: string): Promise<{ favorites: string[]; added: boolean }> {
    const res = await this.http.post<{ favorites: string[]; added: boolean }>(
      `/users/favorites/${spaceId}`
    );
    return res.data;
  }
}
