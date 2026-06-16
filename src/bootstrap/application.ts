import { LoginUseCase, RegisterUseCase, LogoutUseCase, GetCurrentUserUseCase } from "@/core/application/use-cases/auth";
import { CreateSpaceUseCase, ListSpacesUseCase, UpdateSpaceUseCase, DeleteSpaceUseCase, FindSpaceByIdUseCase, FindHostSpacesUseCase, UploadSpaceImagesUseCase } from "@/core/application/use-cases/spaces";
import { GetClientReservationsUseCase, GetHostReservationsUseCase, CreateReservationUseCase, UpdateReservationStatusUseCase } from "@/core/application/use-cases/reservations";
import { GetSpaceReviewsUseCase, CreateReviewUseCase, DeleteReviewUseCase } from "@/core/application/use-cases/reviews";
import { GetFavoritesUseCase, ToggleFavoriteUseCase } from "@/core/application/use-cases/favorites";
import { GetAdminStatsUseCase, GetAdminSpacesUseCase, GetAdminUsersUseCase, GetAdminAnalyticsUseCase } from "@/core/application/use-cases/admin";
import { InitiatePaymentUseCase, InitiateDirectPaymentUseCase, VerifyCheckoutUseCase } from "@/core/application/use-cases/payments";
import { authRepository, spaceRepository, reservationRepository, reviewRepository, adminRepository, favoritesRepository, paymentRepository } from "./repositories";

// Auth
export const loginUseCase = new LoginUseCase(authRepository);
export const registerUseCase = new RegisterUseCase(authRepository);
export const logoutUseCase = new LogoutUseCase(authRepository);
export const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);

// Spaces
export const createSpaceUseCase = new CreateSpaceUseCase(spaceRepository);
export const listSpacesUseCase = new ListSpacesUseCase(spaceRepository);
export const updateSpaceUseCase = new UpdateSpaceUseCase(spaceRepository);
export const deleteSpaceUseCase = new DeleteSpaceUseCase(spaceRepository);
export const findSpaceByIdUseCase = new FindSpaceByIdUseCase(spaceRepository);
export const findHostSpacesUseCase = new FindHostSpacesUseCase(spaceRepository);
export const uploadSpaceImagesUseCase = new UploadSpaceImagesUseCase(spaceRepository);

// Reservations
export const getClientReservationsUseCase = new GetClientReservationsUseCase(reservationRepository);
export const getHostReservationsUseCase = new GetHostReservationsUseCase(reservationRepository);
export const createReservationUseCase = new CreateReservationUseCase(reservationRepository);
export const updateReservationStatusUseCase = new UpdateReservationStatusUseCase(reservationRepository);

// Reviews
export const getSpaceReviewsUseCase = new GetSpaceReviewsUseCase(reviewRepository);
export const createReviewUseCase = new CreateReviewUseCase(reviewRepository);
export const deleteReviewUseCase = new DeleteReviewUseCase(reviewRepository);

// Favorites
export const getFavoritesUseCase = new GetFavoritesUseCase(favoritesRepository);
export const toggleFavoriteUseCase = new ToggleFavoriteUseCase(favoritesRepository);

// Admin
export const getAdminStatsUseCase = new GetAdminStatsUseCase(adminRepository);
export const getAdminSpacesUseCase = new GetAdminSpacesUseCase(adminRepository);
export const getAdminUsersUseCase = new GetAdminUsersUseCase(adminRepository);
export const getAdminAnalyticsUseCase = new GetAdminAnalyticsUseCase(adminRepository);

// Payments
export const initiatePaymentUseCase = new InitiatePaymentUseCase(paymentRepository);
export const initiateDirectPaymentUseCase = new InitiateDirectPaymentUseCase(paymentRepository);
export const verifyCheckoutUseCase = new VerifyCheckoutUseCase(paymentRepository);

export { authRepository, spaceRepository, reservationRepository, reviewRepository, adminRepository, favoritesRepository, paymentRepository };
