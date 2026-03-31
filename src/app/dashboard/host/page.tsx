"use client";

import { HostHome } from "@/presentation/features/dashboard/host";
import { useRouter } from "next/navigation";

export default function HostDashboardPage() {
  const router = useRouter();
  
  return <HostHome onNavigate={() => router.push("/dashboard")} />;
}
