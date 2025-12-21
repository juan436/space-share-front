import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/presentation/components/ui/toaster";
import { AuthProvider } from "@/presentation/providers/auth-context";
import { QueryProvider } from "@/presentation/providers/query-provider";

export const metadata: Metadata = {
  title: "SpaceShare - Marketplace de Espacios",
  description: "Conectamos personas con espacios de almacenamiento disponibles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
