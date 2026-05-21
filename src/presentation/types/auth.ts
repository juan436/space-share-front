import { UserRole } from "@/core/domain/entities/User";

export type { UserRole };

export interface RoleOption {
  value: UserRole;
  label: string;
}

export const roleOptions: RoleOption[] = [
  { value: "client", label: "Cliente - Busco espacio" },
  { value: "host", label: "Anfitrión - Ofrezco espacio" },
];
