import { FavoritesRepository } from "@/core/domain/ports/FavoritesRepository";

export class GetFavoritesUseCase {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async execute(): Promise<string[]> {
    return this.favoritesRepository.getFavorites();
  }
}
