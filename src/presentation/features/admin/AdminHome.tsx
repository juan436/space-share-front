"use client";

import { Users, Building2, Calendar, CheckCircle2, AlertCircle, ShieldCheck, BarChart3 } from "lucide-react";
import { useAuth } from "@/presentation/providers/auth-context";
import { useAdminStats } from "@/presentation/features/admin/hooks/useAdminStats";
import { useAdminUsers } from "@/presentation/features/admin/hooks/useAdminUsers";
import { WelcomeBanner } from "@/presentation/components/shared/panel/WelcomeBanner";
import { StatCard } from "@/presentation/components/shared/panel/StatCard";
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

  return (
    <div className="space-y-6">
      <WelcomeBanner name={user?.name} subtitle="Resumen de la plataforma y tareas que requieren tu atención." />

      {error && (
        <div className="flex items-center gap-3 p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Usuarios" value={value(stats?.totalUsers)} hint="Registrados" icon={Users} tone="bg-sky-100 text-sky-600" onClick={() => onNavigate("users")} />
        <StatCard label="Espacios" value={value(stats?.totalSpaces)} hint="Publicados" icon={Building2} tone="bg-violet-100 text-violet-600" onClick={() => onNavigate("spaces")} />
        <StatCard label="Reservas solicitadas" value={value(stats?.totalReservations)} hint="Total histórico" icon={Calendar} tone="bg-amber-100 text-amber-600" onClick={() => onNavigate("analytics")} />
        <StatCard label="Reservas aceptadas" value={value(stats?.acceptedReservations)} hint="Aprobadas por anfitriones" icon={CheckCircle2} tone="bg-emerald-100 text-emerald-600" onClick={() => onNavigate("analytics")} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <PanelSection title="Verificaciones pendientes" actionLabel="Ver usuarios" onAction={() => onNavigate("users")} className="lg:col-span-2">
          {pendingKyc.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
              <ShieldCheck className="w-9 h-9 opacity-40" />
              <p className="text-sm">No hay verificaciones por revisar</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {pendingKyc.slice(0, 6).map((u) => (
                <button key={u.id} onClick={() => onNavigate("users")} className="w-full flex items-center gap-4 px-5 py-3.5 text-left hover:bg-primary/[0.04] transition-colors">
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                    {u.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground truncate">{u.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold shrink-0">Por revisar</span>
                </button>
              ))}
            </div>
          )}
        </PanelSection>

        <PanelSection title="Accesos rápidos">
          <ActionList
            actions={[
              { icon: Users, label: "Usuarios", description: "Gestiona y verifica usuarios", onClick: () => onNavigate("users"), badge: pendingKyc.length },
              { icon: Building2, label: "Espacios", description: "Revisa los espacios publicados", onClick: () => onNavigate("spaces") },
              { icon: BarChart3, label: "Analíticas", description: "Métricas de la plataforma", onClick: () => onNavigate("analytics") },
            ]}
          />
        </PanelSection>
      </div>
    </div>
  );
}
