"use client";

import { createContext, useContext } from "react";
import { AuthRepository } from "@/core/domain/ports/AuthRepository";
import { SpaceRepository } from "@/core/domain/ports/SpaceRepository";
import { ReservationRepository } from "@/core/domain/ports/ReservationRepository";
import { ReviewRepository } from "@/core/domain/ports/ReviewRepository";
import { AdminRepository } from "@/core/domain/ports/AdminRepository";
import { FavoritesRepository } from "@/core/domain/ports/FavoritesRepository";

/**
 * Repositories
 *
 * Qué hace: Tipado del objeto de repositorios disponibles en el contexto.
 * Recibe:   —
 * Genera:   Interfaz con los 6 repositorios del dominio.
 */
export interface Repositories {
  authRepository: AuthRepository;
  spaceRepository: SpaceRepository;
  reservationRepository: ReservationRepository;
  reviewRepository: ReviewRepository;
  adminRepository: AdminRepository;
  favoritesRepository: FavoritesRepository;
}

const RepositoriesContext = createContext<Repositories | null>(null);

/**
 * RepositoriesProvider
 *
 * Qué hace: Distribuye los repositorios del dominio vía React Context para toda la app.
 * Recibe:   `children` — árbol de componentes consumidores; `repositories` — instancias inyectadas desde el composition root.
 * Genera:   Provider que pone los repositorios a disposición de cualquier hook o componente hijo.
 * Procesa:  No importa de bootstrap — las instancias vienen del composition root (app/ClientProviders.tsx).
 */
export function RepositoriesProvider({
  children,
  repositories,
}: {
  children: React.ReactNode;
  repositories: Repositories;
}) {
  return (
    <RepositoriesContext.Provider value={repositories}>
      {children}
    </RepositoriesContext.Provider>
  );
}

/**
 * useRepositories
 *
 * Qué hace: Hook para acceder a los repositorios del dominio desde cualquier componente o hook.
 * Recibe:   — (debe estar dentro de `RepositoriesProvider`).
 * Genera:   Objeto `Repositories` con los 6 repositorios.
 * Procesa:  Lanza error si se usa fuera del provider.
 */
export function useRepositories(): Repositories {
  const ctx = useContext(RepositoriesContext);
  if (!ctx) throw new Error("useRepositories must be used within RepositoriesProvider");
  return ctx;
}
