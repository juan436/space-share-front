"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/presentation/providers/auth-context";
import { AuthGuard } from "@/presentation/guards/AuthGuard";
import { DashboardShell } from "@/presentation/layouts/DashboardShell";
import { useDashboardTabs } from "@/presentation/hooks/useDashboardTabs";

import { UserHome, UserReservations } from "@/presentation/features/dashboard/user";
import { HostHome, HostDashboard, HostReservations } from "@/presentation/features/dashboard/host";
import { Messages } from "@/presentation/features/messages";
import { AdminHome, AdminUsers, AdminSpaces, AdminAnalytics } from "@/presentation/features/admin";

/**
 * ClientContent
 *
 * Qué hace: Enruta la tab activa al componente correcto para el rol cliente.
 * Recibe:   `tab` — id de la tab activa (`"home"` | `"reservations"` | `"messages"`).
 * Genera:   `<UserHome>`, `<UserReservations>` o `<Messages>` según la tab.
 */
function ClientContent({ tab }: { tab: string }) {
  switch (tab) {
    case "reservations": return <UserReservations />;
    case "messages": return <Messages />;
    default: return <UserHome />;
  }
}

/**
 * HostContent
 *
 * Qué hace: Enruta la tab activa al componente correcto para el rol anfitrión.
 * Recibe:   `tab` — id de la tab activa; `onNavigate` — permite a `HostHome` cambiar de tab programáticamente.
 * Genera:   `<HostHome>`, `<HostDashboard>`, `<HostReservations>` o `<Messages>` según la tab.
 */
function HostContent({ tab, onNavigate }: { tab: string; onNavigate: (tab: string) => void }) {
  switch (tab) {
    case "spaces": return <HostDashboard />;
    case "reservations": return <HostReservations />;
    case "messages": return <Messages />;
    default: return <HostHome onNavigate={onNavigate} />;
  }
}

/**
 * AdminContent
 *
 * Qué hace: Enruta la tab activa al componente correcto para el rol administrador.
 * Recibe:   `tab` — id de la tab activa (`"home"` | `"users"` | `"spaces"` | `"analytics"`).
 * Genera:   `<AdminHome>`, `<AdminUsers>`, `<AdminSpaces>` o `<AdminAnalytics>` según la tab.
 */
function AdminContent({ tab }: { tab: string }) {
  switch (tab) {
    case "users": return <AdminUsers />;
    case "spaces": return <AdminSpaces />;
    case "analytics": return <AdminAnalytics />;
    default: return <AdminHome />;
  }
}

/**
 * DashboardContent
 *
 * Qué hace: Núcleo del dashboard autenticado — inicializa tabs, logout y enrutado de contenido.
 * Recibe:   Nada (obtiene `user` y `logout` de `useAuth`; solo se monta cuando `AuthGuard` confirma sesión).
 * Genera:   `<DashboardShell>` con las tabs del rol y el contenido de la tab activa como `children`.
 * Procesa:  Inicializa `useDashboardTabs(user.role)`, maneja `handleLogout` y selecciona el router de contenido por rol.
 */
function DashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { activeTab, setActiveTab, tabs } = useDashboardTabs(user!.role);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const renderContent = () => {
    if (user!.role === "client") return <ClientContent tab={activeTab} />;
    if (user!.role === "host") return <HostContent tab={activeTab} onNavigate={setActiveTab} />;
    return <AdminContent tab={activeTab} />;
  };

  return (
    <DashboardShell
      user={user!}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
    >
      {renderContent()}
    </DashboardShell>
  );
}

/**
 * DashboardLayout
 *
 * Qué hace: Layout raíz del dashboard en Next.js App Router.
 * Recibe:   `children` — requerido por Next.js pero no utilizado (el dashboard es tab-based, no route-based).
 * Genera:   `<AuthGuard>` envolviendo `<DashboardContent>`.
 * Procesa:  Delega la protección de auth a `AuthGuard` — si no hay sesión, redirige a `/login` antes de montar nada.
 */
export default function DashboardLayout({ children: _ }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
