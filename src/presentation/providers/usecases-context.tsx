"use client";

import { createContext, useContext } from "react";
import { LoginUseCase } from "@/core/application/use-cases/auth/Login";
import { RegisterUseCase } from "@/core/application/use-cases/auth/Register";
import { LogoutUseCase } from "@/core/application/use-cases/auth/Logout";
import { GetCurrentUserUseCase } from "@/core/application/use-cases/auth/GetCurrentUser";
import { CreateSpaceUseCase } from "@/core/application/use-cases/spaces/CreateSpace";
import { ListSpacesUseCase } from "@/core/application/use-cases/spaces/ListSpaces";
import { UpdateSpaceUseCase } from "@/core/application/use-cases/spaces/UpdateSpace";
import { DeleteSpaceUseCase } from "@/core/application/use-cases/spaces/DeleteSpace";
import { FindSpaceByIdUseCase } from "@/core/application/use-cases/spaces/FindSpaceById";
import { FindHostSpacesUseCase } from "@/core/application/use-cases/spaces/FindHostSpaces";
import { UploadSpaceImagesUseCase } from "@/core/application/use-cases/spaces/UploadSpaceImages";
import { GetClientReservationsUseCase } from "@/core/application/use-cases/reservations/GetClientReservations";
import { GetHostReservationsUseCase } from "@/core/application/use-cases/reservations/GetHostReservations";
import { CreateReservationUseCase } from "@/core/application/use-cases/reservations/CreateReservation";
import { UpdateReservationStatusUseCase } from "@/core/application/use-cases/reservations/UpdateReservationStatus";
import { GetSpaceReviewsUseCase } from "@/core/application/use-cases/reviews/GetSpaceReviews";
import { CreateReviewUseCase } from "@/core/application/use-cases/reviews/CreateReview";
import { DeleteReviewUseCase } from "@/core/application/use-cases/reviews/DeleteReview";
import { GetFavoritesUseCase } from "@/core/application/use-cases/favorites/GetFavorites";
import { ToggleFavoriteUseCase } from "@/core/application/use-cases/favorites/ToggleFavorite";
import { GetAdminStatsUseCase } from "@/core/application/use-cases/admin/GetAdminStats";
import { GetAdminSpacesUseCase } from "@/core/application/use-cases/admin/GetAdminSpaces";
import { GetAdminUsersUseCase } from "@/core/application/use-cases/admin/GetAdminUsers";
import { GetAdminAnalyticsUseCase } from "@/core/application/use-cases/admin/GetAdminAnalytics";

/**
 * UseCases
 *
 * Qué hace: Tipado del objeto de use cases disponibles en el contexto.
 * Recibe:   —
 * Genera:   Interfaz con todos los use cases de la capa application.
 */
export interface UseCases {
  // Auth
  loginUseCase: LoginUseCase;
  registerUseCase: RegisterUseCase;
  logoutUseCase: LogoutUseCase;
  getCurrentUserUseCase: GetCurrentUserUseCase;
  // Spaces
  createSpaceUseCase: CreateSpaceUseCase;
  listSpacesUseCase: ListSpacesUseCase;
  updateSpaceUseCase: UpdateSpaceUseCase;
  deleteSpaceUseCase: DeleteSpaceUseCase;
  findSpaceByIdUseCase: FindSpaceByIdUseCase;
  findHostSpacesUseCase: FindHostSpacesUseCase;
  uploadSpaceImagesUseCase: UploadSpaceImagesUseCase;
  // Reservations
  getClientReservationsUseCase: GetClientReservationsUseCase;
  getHostReservationsUseCase: GetHostReservationsUseCase;
  createReservationUseCase: CreateReservationUseCase;
  updateReservationStatusUseCase: UpdateReservationStatusUseCase;
  // Reviews
  getSpaceReviewsUseCase: GetSpaceReviewsUseCase;
  createReviewUseCase: CreateReviewUseCase;
  deleteReviewUseCase: DeleteReviewUseCase;
  // Favorites
  getFavoritesUseCase: GetFavoritesUseCase;
  toggleFavoriteUseCase: ToggleFavoriteUseCase;
  // Admin
  getAdminStatsUseCase: GetAdminStatsUseCase;
  getAdminSpacesUseCase: GetAdminSpacesUseCase;
  getAdminUsersUseCase: GetAdminUsersUseCase;
  getAdminAnalyticsUseCase: GetAdminAnalyticsUseCase;
}

const UseCasesContext = createContext<UseCases | null>(null);

/**
 * UseCasesProvider
 *
 * Qué hace: Distribuye todos los use cases de aplicación vía React Context.
 * Recibe:   `children` — árbol de componentes; `useCases` — instancias inyectadas desde el composition root.
 * Genera:   Provider que pone los use cases a disposición de cualquier hook o componente hijo.
 * Procesa:  No importa de bootstrap — las instancias vienen del composition root (ClientProviders).
 */
export function UseCasesProvider({
  children,
  useCases,
}: {
  children: React.ReactNode;
  useCases: UseCases;
}) {
  return (
    <UseCasesContext.Provider value={useCases}>
      {children}
    </UseCasesContext.Provider>
  );
}

/**
 * useUseCases
 *
 * Qué hace: Hook para acceder a todos los use cases desde cualquier componente o hook.
 * Recibe:   — (debe estar dentro de `UseCasesProvider`).
 * Genera:   Objeto `UseCases` con todos los use cases de la aplicación.
 * Procesa:  Lanza error si se usa fuera del provider.
 */
export function useUseCases(): UseCases {
  const ctx = useContext(UseCasesContext);
  if (!ctx) throw new Error("useUseCases must be used within UseCasesProvider");
  return ctx;
}
