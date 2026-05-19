import { LoginUseCase, RegisterUseCase, LogoutUseCase } from "@/core/application/use-cases/auth";
import { CreateSpaceUseCase, ListSpacesUseCase, UpdateSpaceUseCase, DeleteSpaceUseCase } from "@/core/application/use-cases/spaces";
import { authRepository, spaceRepository, reservationRepository, reviewRepository, adminRepository, favoritesRepository } from "./repositories";

export const loginUseCase = new LoginUseCase(authRepository);
export const registerUseCase = new RegisterUseCase(authRepository);
export const logoutUseCase = new LogoutUseCase(authRepository);

export const createSpaceUseCase = new CreateSpaceUseCase(spaceRepository);
export const listSpacesUseCase = new ListSpacesUseCase(spaceRepository);
export const updateSpaceUseCase = new UpdateSpaceUseCase(spaceRepository);
export const deleteSpaceUseCase = new DeleteSpaceUseCase(spaceRepository);

export { authRepository, spaceRepository, reservationRepository, reviewRepository, adminRepository, favoritesRepository };
