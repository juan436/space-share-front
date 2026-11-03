"use client";

import { AdminHome } from "@/presentation/features/admin";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  return <AdminHome onNavigate={() => router.push("/dashboard")} />;
}
