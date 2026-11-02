import React from "react";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
}

interface PageHeaderProps {
  name?: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function PageHeader({ name, subtitle, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
          {getGreeting()}, {name?.split(" ")[0] ?? "Usuario"}
        </h1>
        <p className="text-base text-muted-foreground mt-2">{subtitle}</p>
      </div>
      {children && <div className="flex flex-wrap gap-3 shrink-0">{children}</div>}
    </div>
  );
}
