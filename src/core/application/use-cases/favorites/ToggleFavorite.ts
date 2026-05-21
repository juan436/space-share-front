import { FavoritesRepository } from "@/core/domain/ports/FavoritesRepository";

export class ToggleFavoriteUseCase {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async execute(spaceId: string): Promise<{ favorites: string[]; added: boolean }> {
    return this.favoritesRepository.toggleFavorite(spaceId);
  }
}
