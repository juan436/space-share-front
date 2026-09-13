"use client";

import { UseCasesProvider } from "@/presentation/providers/usecases-context";
import { AuthProvider } from "@/presentation/providers/auth-context";
import {
  loginUseCase,
  registerUseCase,
  logoutUseCase,
  getCurrentUserUseCase,
  submitKycUseCase,
  createSpaceUseCase,
  listSpacesUseCase,
  updateSpaceUseCase,
  deleteSpaceUseCase,
  findSpaceByIdUseCase,
  findHostSpacesUseCase,
  uploadSpaceImagesUseCase,
  getClientReservationsUseCase,
  getHostReservationsUseCase,
  createReservationUseCase,
  updateReservationStatusUseCase,
  submitSiteEvidenceUseCase,
  getSpaceReviewsUseCase,
  createReviewUseCase,
  deleteReviewUseCase,
  getFavoritesUseCase,
  toggleFavoriteUseCase,
  getAdminStatsUseCase,
  getAdminSpacesUseCase,
  getAdminUsersUseCase,
  getAdminAnalyticsUseCase,
  reviewKycUseCase,
  initiatePaymentUseCase,
  initiateDirectPaymentUseCase,
  verifyCheckoutUseCase,
  findOrCreateConversationUseCase,
  listConversationsUseCase,
  getMessagesUseCase,
  sendMessageUseCase,
  getUnreadCountUseCase,
} from "@/bootstrap/application";

// Singleton de módulo — referencia estable, nunca provoca re-renders en los providers
const useCases = {
  loginUseCase,
  registerUseCase,
  logoutUseCase,
  getCurrentUserUseCase,
  submitKycUseCase,
  createSpaceUseCase,
  listSpacesUseCase,
  updateSpaceUseCase,
  deleteSpaceUseCase,
  findSpaceByIdUseCase,
  findHostSpacesUseCase,
  uploadSpaceImagesUseCase,
  getClientReservationsUseCase,
  getHostReservationsUseCase,
  createReservationUseCase,
  updateReservationStatusUseCase,
  submitSiteEvidenceUseCase,
  getSpaceReviewsUseCase,
  createReviewUseCase,
  deleteReviewUseCase,
  getFavoritesUseCase,
  toggleFavoriteUseCase,
  getAdminStatsUseCase,
  getAdminSpacesUseCase,
  getAdminUsersUseCase,
  getAdminAnalyticsUseCase,
  reviewKycUseCase,
  initiatePaymentUseCase,
  initiateDirectPaymentUseCase,
  verifyCheckoutUseCase,
  findOrCreateConversationUseCase,
  listConversationsUseCase,
  getMessagesUseCase,
  sendMessageUseCase,
  getUnreadCountUseCase,
};

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <UseCasesProvider useCases={useCases}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </UseCasesProvider>
  );
}
