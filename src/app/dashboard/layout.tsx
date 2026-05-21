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

function ClientContent({ tab }: { tab: string }) {
  switch (tab) {
    case "reservations": return <UserReservations />;
    case "messages": return <Messages />;
    default: return <UserHome />;
  }
}

function HostContent({ tab, onNavigate }: { tab: string; onNavigate: (tab: string) => void }) {
  switch (tab) {
    case "spaces": return <HostDashboard />;
    case "reservations": return <HostReservations />;
    case "messages": return <Messages />;
    default: return <HostHome onNavigate={onNavigate} />;
  }
}

function AdminContent({ tab }: { tab: string }) {
  switch (tab) {
    case "users": return <AdminUsers />;
    case "spaces": return <AdminSpaces />;
    case "analytics": return <AdminAnalytics />;
    default: return <AdminHome />;
  }
}

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

export default function DashboardLayout({ children: _ }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
