import { ApiAuthRepository } from "@/infrastructure/repositories/api/ApiAuthRepository";
import { ApiSpaceRepository } from "@/infrastructure/repositories/api/ApiSpaceRepository";
import { ApiReservationRepository } from "@/infrastructure/repositories/api/ApiReservationRepository";
import { ApiReviewRepository } from "@/infrastructure/repositories/api/ApiReviewRepository";
import { ApiAdminRepository } from "@/infrastructure/repositories/api/ApiAdminRepository";
import { httpClient } from "./http";

export const authRepository = new ApiAuthRepository(httpClient);
export const spaceRepository = new ApiSpaceRepository(httpClient);
export const reservationRepository = new ApiReservationRepository(httpClient);
export const reviewRepository = new ApiReviewRepository(httpClient);
export const adminRepository = new ApiAdminRepository(httpClient);
