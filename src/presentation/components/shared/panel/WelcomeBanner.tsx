import React from "react";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
}

function getTodayDate(): string {
  return new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
}

interface WelcomeBannerProps {
  name?: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function WelcomeBanner({ name, subtitle, children }: WelcomeBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-[hsl(215_90%_42%)] text-white p-6 sm:p-8 shadow-md">
      <div className="absolute -right-10 -top-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute right-24 -bottom-24 w-56 h-56 rounded-full bg-accent/20 pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-white/80 capitalize">{getTodayDate()}</p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
            {getGreeting()}, {name?.split(" ")[0] ?? "Usuario"}
          </h1>
          <p className="text-sm sm:text-base text-white/85 mt-2 max-w-xl">{subtitle}</p>
        </div>
        {children && <div className="flex flex-wrap gap-3 shrink-0">{children}</div>}
      </div>
    </div>
  );
}
