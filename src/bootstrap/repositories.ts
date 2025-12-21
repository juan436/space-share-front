import { ApiAuthRepository } from "@/infrastructure/repositories/api/ApiAuthRepository";
import { ApiSpaceRepository } from "@/infrastructure/repositories/api/ApiSpaceRepository";
import { httpClient } from "./http";

export const authRepository = new ApiAuthRepository(httpClient);
export const spaceRepository = new ApiSpaceRepository(httpClient);
