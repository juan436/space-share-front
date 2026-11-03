"use client";

import { UserHome } from "@/presentation/features/dashboard/user";
import { useRouter } from "next/navigation";

export default function UserDashboardPage() {
  const router = useRouter();
  return <UserHome onNavigate={() => router.push("/dashboard")} />;
}
