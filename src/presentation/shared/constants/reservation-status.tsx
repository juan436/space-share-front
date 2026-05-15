import { Clock, CheckCircle2, CreditCard, XCircle } from "lucide-react";
import React from "react";

export const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending:          { label: "Pendiente",        color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",     icon: Clock },
  accepted:         { label: "Aceptada",         color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  awaiting_payment: { label: "Pend. de Pago",   color: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",  icon: CreditCard },
  confirmed:        { label: "Confirmada",       color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  expired:          { label: "Expirada",         color: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",             icon: XCircle },
  rejected:         { label: "Rechazada",        color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",               icon: XCircle },
  cancelled:        { label: "Cancelada",        color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",             icon: XCircle },
  completed:        { label: "Completada",       color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",          icon: CheckCircle2 },
};
