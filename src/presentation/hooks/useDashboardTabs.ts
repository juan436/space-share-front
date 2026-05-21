import { useState, useMemo } from "react";
import React from "react";
import { Home, Building2, Calendar, MessageSquare, Users, BarChart3 } from "lucide-react";

export type TabDef = {
  id: string;
  label: string;
  icon: React.ElementType;
};

const tabsByRole: Record<string, TabDef[]> = {
  client: [
    { id: "home", label: "Inicio", icon: Home },
    { id: "reservations", label: "Reservaciones", icon: Calendar },
    { id: "messages", label: "Mensajes", icon: MessageSquare },
  ],
  host: [
    { id: "home", label: "Inicio", icon: Home },
    { id: "spaces", label: "Mis Espacios", icon: Building2 },
    { id: "reservations", label: "Reservaciones", icon: Calendar },
    { id: "messages", label: "Mensajes", icon: MessageSquare },
  ],
  admin: [
    { id: "home", label: "Dashboard", icon: Home },
    { id: "users", label: "Usuarios", icon: Users },
    { id: "spaces", label: "Espacios", icon: Building2 },
    { id: "analytics", label: "Analíticas", icon: BarChart3 },
  ],
};

export function useDashboardTabs(role: string) {
  const [activeTab, setActiveTab] = useState("home");
  const tabs = useMemo(() => tabsByRole[role] ?? tabsByRole.client, [role]);
  return { activeTab, setActiveTab, tabs };
}
