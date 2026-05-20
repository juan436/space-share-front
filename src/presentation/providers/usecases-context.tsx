"use client";

import { createContext, useContext } from "react";
import { CreateSpaceUseCase } from "@/core/application/use-cases/spaces/CreateSpace";
import { UpdateSpaceUseCase } from "@/core/application/use-cases/spaces/UpdateSpace";
import { DeleteSpaceUseCase } from "@/core/application/use-cases/spaces/DeleteSpace";

/**
 * UseCases
 *
 * Qué hace: Tipado del objeto de use cases disponibles en el contexto.
 * Recibe:   —
 * Genera:   Interfaz con los use cases de espacios que requieren lógica de dominio.
 */
export interface UseCases {
  createSpaceUseCase: CreateSpaceUseCase;
  updateSpaceUseCase: UpdateSpaceUseCase;
  deleteSpaceUseCase: DeleteSpaceUseCase;
}

const UseCasesContext = createContext<UseCases | null>(null);

/**
 * UseCasesProvider
 *
 * Qué hace: Distribuye los use cases de aplicación vía React Context para toda la app.
 * Recibe:   `children` — árbol de componentes consumidores; `useCases` — instancias inyectadas desde el composition root.
 * Genera:   Provider que pone los use cases a disposición de cualquier hook o componente hijo.
 * Procesa:  No importa de bootstrap — las instancias vienen del composition root (app/layout.tsx).
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
 * Qué hace: Hook para acceder a los use cases de aplicación desde cualquier componente o hook.
 * Recibe:   — (debe estar dentro de `UseCasesProvider`).
 * Genera:   Objeto `UseCases` con los use cases de espacios.
 * Procesa:  Lanza error si se usa fuera del provider.
 */
export function useUseCases(): UseCases {
  const ctx = useContext(UseCasesContext);
  if (!ctx) throw new Error("useUseCases must be used within UseCasesProvider");
  return ctx;
}
