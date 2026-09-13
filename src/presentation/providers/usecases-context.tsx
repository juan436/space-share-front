"use client";

import { createContext, useContext } from "react";
import { LoginUseCase } from "@/core/application/use-cases/auth/Login";
import { RegisterUseCase } from "@/core/application/use-cases/auth/Register";
import { LogoutUseCase } from "@/core/application/use-cases/auth/Logout";
import { GetCurrentUserUseCase } from "@/core/application/use-cases/auth/GetCurrentUser";
import { SubmitKycUseCase } from "@/core/application/use-cases/auth/SubmitKyc";
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
import { SubmitSiteEvidenceUseCase } from "@/core/application/use-cases/reservations/SubmitSiteEvidence";
import { GetSpaceReviewsUseCase } from "@/core/application/use-cases/reviews/GetSpaceReviews";
import { CreateReviewUseCase } from "@/core/application/use-cases/reviews/CreateReview";
import { DeleteReviewUseCase } from "@/core/application/use-cases/reviews/DeleteReview";
import { GetFavoritesUseCase } from "@/core/application/use-cases/favorites/GetFavorites";
import { ToggleFavoriteUseCase } from "@/core/application/use-cases/favorites/ToggleFavorite";
import { GetAdminStatsUseCase } from "@/core/application/use-cases/admin/GetAdminStats";
import { GetAdminSpacesUseCase } from "@/core/application/use-cases/admin/GetAdminSpaces";
import { GetAdminUsersUseCase } from "@/core/application/use-cases/admin/GetAdminUsers";
import { GetAdminAnalyticsUseCase } from "@/core/application/use-cases/admin/GetAdminAnalytics";
import { ReviewKycUseCase } from "@/core/application/use-cases/admin/ReviewKyc";
import { InitiatePaymentUseCase } from "@/core/application/use-cases/payments/InitiatePayment";
import { InitiateDirectPaymentUseCase } from "@/core/application/use-cases/payments/InitiateDirectPayment";
import { VerifyCheckoutUseCase } from "@/core/application/use-cases/payments/VerifyCheckout";
import { FindOrCreateConversationUseCase } from "@/core/application/use-cases/messages/FindOrCreateConversation";
import { ListConversationsUseCase } from "@/core/application/use-cases/messages/ListConversations";
import { GetMessagesUseCase } from "@/core/application/use-cases/messages/GetMessages";
import { SendMessageUseCase } from "@/core/application/use-cases/messages/SendMessage";
import { GetUnreadCountUseCase } from "@/core/application/use-cases/messages/GetUnreadCount";

export interface UseCases {
  // Auth
  loginUseCase: LoginUseCase;
  registerUseCase: RegisterUseCase;
  logoutUseCase: LogoutUseCase;
  getCurrentUserUseCase: GetCurrentUserUseCase;
  submitKycUseCase: SubmitKycUseCase;
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
  submitSiteEvidenceUseCase: SubmitSiteEvidenceUseCase;
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
  reviewKycUseCase: ReviewKycUseCase;
  // Payments
  initiatePaymentUseCase: InitiatePaymentUseCase;
  initiateDirectPaymentUseCase: InitiateDirectPaymentUseCase;
  verifyCheckoutUseCase: VerifyCheckoutUseCase;
  // Messages
  findOrCreateConversationUseCase: FindOrCreateConversationUseCase;
  listConversationsUseCase: ListConversationsUseCase;
  getMessagesUseCase: GetMessagesUseCase;
  sendMessageUseCase: SendMessageUseCase;
  getUnreadCountUseCase: GetUnreadCountUseCase;
}

const UseCasesContext = createContext<UseCases | null>(null);

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

export function useUseCases(): UseCases {
  const ctx = useContext(UseCasesContext);
  if (!ctx) throw new Error("useUseCases must be used within UseCasesProvider");
  return ctx;
}
