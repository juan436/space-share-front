"use client";

import { Users, Building2, BarChart3, AlertCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "@/presentation/providers/auth-context";
import { useAdminStats } from "@/presentation/features/admin/hooks/useAdminStats";
import { useAdminUsers } from "@/presentation/features/admin/hooks/useAdminUsers";
import { PageHeader } from "@/presentation/components/shared/panel/PageHeader";
import { StatStrip } from "@/presentation/components/shared/panel/StatStrip";
import { PanelSection } from "@/presentation/components/shared/panel/PanelSection";
import { ActionList } from "@/presentation/components/shared/panel/ActionList";

interface AdminHomeProps {
  onNavigate: (tab: string) => void;
}

export function AdminHome({ onNavigate }: AdminHomeProps) {
  const { user } = useAuth();
  const { stats, isLoading, error } = useAdminStats();
  const { users } = useAdminUsers();
  const pendingKyc = users.filter((u) => u.kycStatus === "pending");
  const value = (n?: number) => (isLoading ? "…" : n?.toLocaleString() ?? "—");
  const go = (tab: string) => () => onNavigate(tab);

  return (
    <div className="space-y-10">
      <PageHeader name={user?.name} subtitle="Resumen de la plataforma y tareas que requieren tu atención." />

      {error && (
        <div className="flex items-center gap-3 px-6 py-5 rounded-xl bg-white border border-red-300">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <StatStrip
        items={[
          { label: "Usuarios", value: value(stats?.totalUsers), hint: "Registrados", onClick: go("users") },
          { label: "Espacios", value: value(stats?.totalSpaces), hint: "Publicados", onClick: go("spaces") },
          { label: "Reservas solicitadas", value: value(stats?.totalReservations), hint: "Total histórico", onClick: go("analytics") },
          { label: "Reservas aceptadas", value: value(stats?.acceptedReservations), hint: "Aprobadas por anfitriones", onClick: go("analytics") },
        ]}
      />

      <PanelSection title="Verificaciones pendientes" actionLabel="Ver usuarios" onAction={go("users")}>
        {pendingKyc.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-14 rounded-xl border border-dashed border-border bg-white dark:bg-card text-muted-foreground">
            <ShieldCheck className="w-9 h-9 opacity-40" />
            <p className="text-sm">No hay verificaciones por revisar</p>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-white dark:bg-card divide-y divide-border">
            {pendingKyc.slice(0, 6).map((u) => (
              <button key={u.id} onClick={go("users")} className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-muted/60 transition-colors">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center shrink-0">
                  {u.name.slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-foreground truncate">{u.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{u.email}</p>
                </div>
                <span className="text-sm font-semibold text-foreground underline underline-offset-4 shrink-0">Revisar</span>
              </button>
            ))}
          </div>
        )}
      </PanelSection>

      <PanelSection title="Atajos">
        <ActionList
          actions={[
            { icon: Users, label: "Usuarios", description: "Gestiona y verifica usuarios", onClick: go("users"), badge: pendingKyc.length },
            { icon: Building2, label: "Espacios", description: "Revisa los espacios publicados", onClick: go("spaces") },
            { icon: BarChart3, label: "Analíticas", description: "Métricas de la plataforma", onClick: go("analytics") },
          ]}
        />
      </PanelSection>
    </div>
  );
}
