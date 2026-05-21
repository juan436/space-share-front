import { FavoritesRepository } from "@/core/domain/ports/FavoritesRepository";
import { HttpClient } from "@/infrastructure/http/HttpClient";

export class ApiFavoritesRepository implements FavoritesRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getFavorites(): Promise<string[]> {
    const res = await this.httpClient.get<string[]>("/users/favorites");
    return res.data;
  }

  async toggleFavorite(spaceId: string): Promise<{ favorites: string[]; added: boolean }> {
    const res = await this.httpClient.post<{ favorites: string[]; added: boolean }>(
      `/users/favorites/${spaceId}`
    );
    return res.data;
  }
}
