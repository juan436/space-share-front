export type UserRoleType = "client" | "host" | "admin";

export interface RoleOption {
  value: UserRoleType;
  label: string;
}

export const roleOptions: RoleOption[] = [
  { value: "client", label: "Cliente - Busco espacio" },
  { value: "host", label: "Anfitrión - Ofrezco espacio" },
];
