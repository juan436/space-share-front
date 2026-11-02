import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/presentation/providers/auth-context";

// Bloquea acciones (reservar) hasta que el KYC del usuario esté aprobado y
// muestra un diálogo explicando por qué, en vez de dejar que la API falle.
export function useKycGate() {
  const { user } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const status = user?.kycStatus ?? "none";

  const requireKyc = (): boolean => {
    if (status === "approved") return false;
    setIsOpen(true);
    return true;
  };

  const goVerify = () => {
    setIsOpen(false);
    const base = user?.role === "host" ? "/dashboard/host" : "/dashboard/user";
    router.push(`${base}?tab=verification`);
  };

  return { isKycDialogOpen: isOpen, kycStatus: status, requireKyc, goVerify, closeKycDialog: () => setIsOpen(false) };
}
