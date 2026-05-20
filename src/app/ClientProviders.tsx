"use client";

import { RepositoriesProvider } from "@/presentation/providers/repositories-context";
import { UseCasesProvider } from "@/presentation/providers/usecases-context";
import { AuthProvider } from "@/presentation/providers/auth-context";
import {
  authRepository,
  spaceRepository,
  reservationRepository,
  reviewRepository,
  adminRepository,
  favoritesRepository,
  createSpaceUseCase,
  updateSpaceUseCase,
  deleteSpaceUseCase,
} from "@/bootstrap/application";

// Singletons de módulo — referencia estable, nunca provocan re-renders en los providers
const repositories = {
  authRepository,
  spaceRepository,
  reservationRepository,
  reviewRepository,
  adminRepository,
  favoritesRepository,
};

const useCases = {
  createSpaceUseCase,
  updateSpaceUseCase,
  deleteSpaceUseCase,
};

/**
 * ClientProviders
 *
 * Qué hace: composition root client-side — único punto que importa instancias concretas de bootstrap y las inyecta en el árbol de React vía context providers.
 * Recibe: `children` — toda la app que necesita acceso a repositorios, use cases y autenticación.
 * Genera: árbol RepositoriesProvider → UseCasesProvider → AuthProvider con los singletons de módulo.
 * Procesa: las constantes `repositories` y `useCases` se definen fuera del componente para garantizar referencia estable entre renders y evitar re-renders innecesarios en los consumidores de contexto.
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <RepositoriesProvider repositories={repositories}>
      <UseCasesProvider useCases={useCases}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </UseCasesProvider>
    </RepositoriesProvider>
  );
}
