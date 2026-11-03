"use client";

import { ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "@/presentation/providers/auth-context";
import { useAdminStats } from "@/presentation/features/admin/hooks/useAdminStats";
import { useAdminUsers } from "@/presentation/features/admin/hooks/useAdminUsers";
import { PageHeader } from "@/presentation/components/shared/panel/PageHeader";
import { PanelSection } from "@/presentation/components/shared/panel/PanelSection";
import { AttentionList, AttentionItem } from "@/presentation/components/shared/panel/AttentionList";
import { SummaryCard } from "@/presentation/components/shared/panel/SummaryCard";

interface AdminHomeProps {
  onNavigate: (tab: string) => void;
}

export function AdminHome({ onNavigate }: AdminHomeProps) {
  const { user } = useAuth();
  const { stats, isLoading, error } = useAdminStats();
  const { users } = useAdminUsers();
  const go = (tab: string) => () => onNavigate(tab);
  const value = (n?: number) => (isLoading ? "…" : n?.toLocaleString() ?? "—");

  const attention: AttentionItem[] = users
    .filter((u) => u.kycStatus === "pending")
    .slice(0, 8)
    .map((u) => ({
      id: u.id,
      icon: ShieldCheck,
      title: `Verificar a ${u.name}`,
      description: u.email,
      actionLabel: "Revisar",
      onAction: go("users"),
    }));

  return (
    <div className="space-y-8">
      <PageHeader name={user?.name} subtitle="Esto es lo que necesita tu atención hoy." />

      {error && (
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-red-300">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <PanelSection title="Requiere tu atención" actionLabel="Ver usuarios" onAction={go("users")} className="lg:col-span-2">
          <AttentionList items={attention} emptyText="No hay verificaciones por revisar. Todo al día." />
        </PanelSection>

        <SummaryCard
          title="Plataforma"
          rows={[
            { label: "Usuarios", value: value(stats?.totalUsers), onClick: go("users") },
            { label: "Espacios", value: value(stats?.totalSpaces), onClick: go("spaces") },
            { label: "Reservas solicitadas", value: value(stats?.totalReservations), onClick: go("analytics") },
            { label: "Reservas aceptadas", value: value(stats?.acceptedReservations), onClick: go("analytics") },
          ]}
        />
      </div>
    </div>
  );
}
