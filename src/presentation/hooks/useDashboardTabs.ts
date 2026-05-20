import { useState, useMemo } from "react";
import { Home, Building2, Calendar, MessageSquare, Users, BarChart3 } from "lucide-react";

/** Definición de una tab del dashboard. */
export type TabDef = { id: string; icon: typeof Home; label: string };

const tabsByRole: Record<string, TabDef[]> = {
  client: [
    { id: "home", icon: Home, label: "Inicio" },
    { id: "reservations", icon: Calendar, label: "Mis Reservaciones" },
    { id: "messages", icon: MessageSquare, label: "Mensajes" },
  ],
  host: [
    { id: "home", icon: Home, label: "Inicio" },
    { id: "spaces", icon: Building2, label: "Mis Espacios" },
    { id: "reservations", icon: Calendar, label: "Reservaciones" },
    { id: "messages", icon: MessageSquare, label: "Mensajes" },
  ],
  admin: [
    { id: "home", icon: Home, label: "Inicio" },
    { id: "users", icon: Users, label: "Usuarios" },
    { id: "spaces", icon: Building2, label: "Espacios" },
    { id: "analytics", icon: BarChart3, label: "Analíticas" },
  ],
};

/**
 * useDashboardTabs
 *
 * Qué hace: Gestiona las tabs de navegación del dashboard según el rol del usuario.
 * Recibe:   `role` — rol del usuario (`"client"` | `"host"` | `"admin"`).
 * Genera:   `{ tabs, activeTab, setActiveTab }` — lista de tabs del rol, tab activa y setter.
 * Procesa:  Deriva `tabs` del mapa `tabsByRole` con `useMemo`; mantiene `activeTab` en estado local.
 */
export function useDashboardTabs(role: string) {
  const [activeTab, setActiveTab] = useState("home");
  const tabs = useMemo(() => tabsByRole[role] ?? tabsByRole.client, [role]);
  return { activeTab, setActiveTab, tabs };
}
