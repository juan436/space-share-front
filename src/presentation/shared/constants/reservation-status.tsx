import { Clock, CheckCircle2, CreditCard, XCircle } from "lucide-react";
import React from "react";

export const STATUS_CONFIG: Record<string, { label: string; tabLabel: string; color: string; icon: React.ElementType }> = {
  pending:          { label: "Pendiente",      tabLabel: "Pendientes",      color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",        icon: Clock        },
  accepted:         { label: "Aceptada",       tabLabel: "Aceptadas",       color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  awaiting_payment: { label: "Pend. de Pago", tabLabel: "Pend. Pago",      color: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",     icon: CreditCard   },
  confirmed:        { label: "Confirmada",     tabLabel: "Confirmadas",     color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  expired:          { label: "Expirada",       tabLabel: "Expiradas",       color: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",                icon: XCircle      },
  rejected:         { label: "Rechazada",      tabLabel: "Rechazadas",      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",                 icon: XCircle      },
  cancelled:        { label: "Cancelada",      tabLabel: "Canceladas",      color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",                icon: XCircle      },
  completed:        { label: "Completada",     tabLabel: "Completadas",     color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",             icon: CheckCircle2 },
};
