import { TONE_BADGE, TONE_DOT } from "./status-tones";

export const RESERVATION_STATUS_LABEL: Record<string, string> = {
  pending: "Pendientes",
  accepted: "Aceptadas",
  rejected: "Rechazadas",
  cancelled: "Canceladas",
  completed: "Completadas",
};

export const RESERVATION_STATUS_COLOR: Record<string, string> = {
  pending: TONE_DOT.warning,
  accepted: TONE_DOT.success,
  rejected: TONE_DOT.danger,
  cancelled: TONE_DOT.neutral,
  completed: TONE_DOT.neutral,
};

export const SPACE_STATUS_BADGE: Record<string, string> = {
  active: TONE_BADGE.success,
  paused: TONE_BADGE.warning,
  pending: TONE_BADGE.warning,
  deactivated: TONE_BADGE.neutral,
};

export const SPACE_STATUS_LABEL: Record<string, string> = {
  active: "Activo",
  paused: "Pausado",
  pending: "Pendiente",
  deactivated: "Desactivado",
};

