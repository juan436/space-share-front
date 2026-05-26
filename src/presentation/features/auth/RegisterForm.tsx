"use client";

import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { UserRole } from "@/presentation/types/auth";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { TermsModal } from "./components/TermsModal";
import { Mail, Lock, User, ArrowRight, Loader2, ShieldCheck, Zap, Heart, Compass, Building2, Check } from "lucide-react";
import { cn } from "@/presentation/utils/cn";

const TRUST_POINTS = [
  { icon: ShieldCheck, text: "Pagos seguros y protegidos" },
  { icon: Zap, text: "Reserva en minutos, sin papeleo" },
  { icon: Heart, text: "Anfitriones verificados" },
];

const ROLE_CARDS: { value: UserRole; label: string; description: string; icon: typeof Compass }[] = [
  {
    value: "client",
    label: "Arrendar espacio",
    description: "Busco donde guardar mis cosas",
    icon: Compass,
  },
  {
    value: "host",
    label: "Publicar espacio",
    description: "Tengo espacio disponible para rentar",
    icon: Building2,
  },
];

export function RegisterForm() {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    role, setRole,
    acceptedTerms, setAcceptedTerms,
    isTermsModalOpen, setIsTermsModalOpen,
    isLoading, error,
    handleRegister,
  } = useRegisterForm();

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel — branding ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-foreground dark:bg-zinc-900 relative overflow-hidden flex-col justify-between p-14">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/15 blur-3xl pointer-events-none" />

        <Link href="/" className="relative inline-flex">
          <span className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Space</span>
            <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">Share</span>
          </span>
        </Link>

        <div className="relative space-y-8">
          <div>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-background leading-[1.15] tracking-tight">
              Únete a miles de<br />personas que ya<br />confían en nosotros
            </h1>
            <p className="mt-5 text-base text-background/55 leading-relaxed max-w-sm">
              Regístrate gratis y empieza a explorar o publicar espacios en minutos.
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
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center px-6 sm:px-12 py-12 bg-white dark:bg-card overflow-y-auto">
        <div className="w-full max-w-[400px] space-y-6">

          {/* Mobile logo */}
          <div className="lg:hidden text-center">
            <Link href="/">
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Space</span>
                <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">Share</span>
              </span>
            </Link>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Crea tu cuenta</h2>
            <p className="mt-1 text-sm text-muted-foreground">Es gratis y solo toma un minuto</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">

            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-semibold">Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 pl-10 rounded-xl border-border/50 bg-white dark:bg-card"
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-semibold">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pl-9 rounded-xl border-border/50 bg-white dark:bg-card"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirmar</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-11 pl-9 rounded-xl border-border/50 bg-white dark:bg-card"
                  />
                </div>
              </div>
            </div>

            {/* Role selection */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Tipo de cuenta</Label>
              <div className="grid grid-cols-2 gap-2.5">
                {ROLE_CARDS.map(({ value, label, description, icon: Icon }) => {
                  const isActive = role === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRole(value)}
                      className={cn(
                        "relative flex flex-col items-start gap-2 p-3.5 rounded-xl border text-left transition-all duration-200",
                        isActive
                          ? "border-foreground/30 bg-foreground/5 dark:border-foreground/20 dark:bg-foreground/8"
                          : "border-border/60 bg-white dark:bg-card hover:border-border/80 hover:bg-muted/30"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                        isActive ? "bg-foreground/10" : "bg-muted/60"
                      )}>
                        <Icon className={cn("w-4 h-4", isActive ? "text-foreground" : "text-muted-foreground")} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground leading-tight">{label}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{description}</p>
                      </div>
                      {isActive && (
                        <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-foreground flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-background" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                className="mt-0.5 shrink-0"
              />
              <Label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer font-normal">
                Acepto los{" "}
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(true)}
                  className="text-foreground font-semibold hover:underline underline-offset-2"
                >
                  términos y condiciones
                </button>
                {" "}y la política de privacidad de SpaceShare
              </Label>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-destructive/8 border border-destructive/20 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 rounded-xl gap-2 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />Creando cuenta...</>
              ) : (
                <>Crear cuenta gratis <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </form>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 border-t border-border/40" />
            <span className="text-xs text-muted-foreground/60 shrink-0">¿Ya tienes cuenta?</span>
            <div className="flex-1 border-t border-border/40" />
          </div>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border border-border/60 shadow-[0_1px_4px_rgba(0,0,0,0.05)] text-sm font-semibold text-foreground hover:bg-muted/40 hover:border-border/80 transition-all"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>

      <TermsModal
        open={isTermsModalOpen}
        onOpenChange={setIsTermsModalOpen}
        onAccept={() => setAcceptedTerms(true)}
      />
    </div>
  );
}
