/**
 * Estándar de color para estados: solo 4 tonos semánticos.
 * success = positivo · warning = pendiente · danger = negativo · neutral = cerrado/inactivo.
 */
export type StatusTone = "success" | "warning" | "danger" | "neutral";

export const TONE_DOT: Record<StatusTone, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  neutral: "bg-gray-400",
};

export const TONE_BADGE: Record<StatusTone, string> = {
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  danger: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  neutral: "bg-muted text-muted-foreground",
};

export const RESERVATION_TONE: Record<string, StatusTone> = {
  pending: "warning",
  awaiting_payment: "warning",
  accepted: "success",
  confirmed: "success",
  completed: "neutral",
  rejected: "danger",
  cancelled: "neutral",
  expired: "neutral",
};

export const SPACE_TONE: Record<string, StatusTone> = {
  active: "success",
  paused: "warning",
  pending: "warning",
  deactivated: "neutral",
};
