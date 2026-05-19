import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/presentation/providers/auth-context";

interface UseLoginFormResult {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  error: string;
  handleLogin: (e: React.FormEvent) => Promise<void>;
}

const dashboardRoutes: Record<string, string> = {
  client: "/dashboard/user",
  host: "/dashboard/host",
  admin: "/dashboard/admin",
};

export function useLoginForm(): UseLoginFormResult {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await login(email, password);
      router.push(dashboardRoutes[user.role] || "/dashboard/user");
    } catch (err) {
      const serverMsg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(serverMsg ?? "Credenciales inválidas. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
  };
}
