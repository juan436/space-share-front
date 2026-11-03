import { Clock, CheckCircle2, CreditCard, XCircle } from "lucide-react";
import React from "react";
import { TONE_BADGE } from "./status-tones";

export const STATUS_CONFIG: Record<string, { label: string; tabLabel: string; color: string; icon: React.ElementType }> = {
  pending:          { label: "Pendiente",      tabLabel: "Pendientes",      color: TONE_BADGE.warning,        icon: Clock        },
  accepted:         { label: "Aceptada",       tabLabel: "Aceptadas",       color: TONE_BADGE.success, icon: CheckCircle2 },
  awaiting_payment: { label: "Pend. de Pago", tabLabel: "Pend. Pago",      color: TONE_BADGE.warning,     icon: CreditCard   },
  confirmed:        { label: "Confirmada",     tabLabel: "Confirmadas",     color: TONE_BADGE.success, icon: CheckCircle2 },
  expired:          { label: "Expirada",       tabLabel: "Expiradas",       color: TONE_BADGE.neutral,                icon: XCircle      },
  rejected:         { label: "Rechazada",      tabLabel: "Rechazadas",      color: TONE_BADGE.danger,                 icon: XCircle      },
  cancelled:        { label: "Cancelada",      tabLabel: "Canceladas",      color: TONE_BADGE.neutral,                icon: XCircle      },
  completed:        { label: "Completada",     tabLabel: "Completadas",     color: TONE_BADGE.neutral,             icon: CheckCircle2 },
};
