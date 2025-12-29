import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/presentation/providers/auth-context";
import { UserRoleType } from "@/presentation/types/auth";

interface UseRegisterFormResult {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  role: UserRoleType;
  setRole: (role: UserRoleType) => void;
  acceptedTerms: boolean;
  setAcceptedTerms: (accepted: boolean) => void;
  isTermsModalOpen: boolean;
  setIsTermsModalOpen: (open: boolean) => void;
  isLoading: boolean;
  error: string;
  handleRegister: (e: React.FormEvent) => Promise<void>;
}

const dashboardRoutes: Record<string, string> = {
  client: "/dashboard/user",
  host: "/dashboard/host",
  admin: "/dashboard/admin",
};

export function useRegisterForm(): UseRegisterFormResult {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRoleType>("client");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (!acceptedTerms) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    setIsLoading(true);

    try {
      await register({ name, email, password, role });
      router.push(dashboardRoutes[role] || "/dashboard/user");
    } catch (err) {
      setError("Error al crear la cuenta. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    role,
    setRole,
    acceptedTerms,
    setAcceptedTerms,
    isTermsModalOpen,
    setIsTermsModalOpen,
    isLoading,
    error,
    handleRegister,
  };
}
