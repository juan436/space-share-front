"use client";

import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { useLoginForm } from "./hooks/useLoginForm";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Logo } from "@/presentation/components/shared/Logo";
import { TRUST_POINTS } from "./data/authConstants";

export function LoginForm() {
  const { email, setEmail, password, setPassword, isLoading, error, handleLogin } = useLoginForm();

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel — branding ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-foreground dark:bg-zinc-900 relative overflow-hidden flex-col justify-between p-14">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/15 blur-3xl pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="relative inline-flex">
          <Logo className="h-28 w-28" />
        </Link>

        {/* Hero text */}
        <div className="relative space-y-8">
          <div>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-background leading-[1.15] tracking-tight">
              El espacio que<br />necesitas, cuando<br />lo necesitas
            </h1>
            <p className="mt-5 text-base text-background/55 leading-relaxed max-w-sm">
              Conectamos personas con espacios libres — garajes, bodegas, parqueos y más. Simple, seguro y confiable.
            </p>
          </div>
          <div className="space-y-3.5">
            {TRUST_POINTS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-background/8 border border-background/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-background/60" />
                </div>
                <span className="text-sm text-background/65 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-background/25">© 2025 SpaceShare. Todos los derechos reservados.</p>
      </div>

      {/* ── Right panel — form ── */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center px-6 sm:px-12 py-12 bg-white dark:bg-card">
        <div className="w-full max-w-[380px] space-y-7">

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center">
            <Link href="/">
              <img src="/images/logo.svg" alt="SpaceShare" className="h-20 w-20 rounded-2xl" />
            </Link>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Bienvenido de vuelta</h2>
            <p className="mt-1 text-sm text-muted-foreground">Ingresa tus datos para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-semibold">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 pl-10 rounded-xl border-border/50 bg-white dark:bg-card"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-semibold">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pl-10 rounded-xl border-border/50 bg-white dark:bg-card"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-destructive/8 border border-destructive/20 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 rounded-xl gap-2 font-semibold"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />Iniciando sesión...</>
              ) : (
                <>Iniciar Sesión <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </form>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 border-t border-border/40" />
            <span className="text-xs text-muted-foreground/60 shrink-0">¿No tienes cuenta?</span>
            <div className="flex-1 border-t border-border/40" />
          </div>

          <Link
            href="/register"
            className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border border-border/60 shadow-[0_1px_4px_rgba(0,0,0,0.05)] text-sm font-semibold text-foreground hover:bg-muted/40 hover:border-border/80 transition-all"
          >
            Crear cuenta gratis
          </Link>
        </div>
      </div>

    </div>
  );
}
