export const RESERVATION_STATUS_LABEL: Record<string, string> = {
  pending: "Pendientes",
  accepted: "Aceptadas",
  rejected: "Rechazadas",
  cancelled: "Canceladas",
  completed: "Completadas",
};

export const RESERVATION_STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-500",
  accepted: "bg-emerald-500",
  rejected: "bg-red-500",
  cancelled: "bg-gray-400",
  completed: "bg-blue-500",
};

export const SPACE_STATUS_BADGE: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  paused: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  pending: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  deactivated: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export const SPACE_STATUS_LABEL: Record<string, string> = {
  active: "Activo",
  paused: "Pausado",
  pending: "Pendiente",
  deactivated: "Desactivado",
};

export const SPACE_TYPE_LABEL: Record<string, string> = {
  garage: "Garaje",
  parking: "Parking",
  basement: "Sótano",
  attic: "Ático",
  storage: "Almacén",
  other: "Otro",
};
