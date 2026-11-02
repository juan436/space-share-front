import React from "react";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon: React.ElementType;
  /** Clases del tile del ícono, p. ej. "bg-sky-100 text-sky-600" */
  tone: string;
  onClick?: () => void;
}

export function StatCard({ label, value, hint, icon: Icon, tone, onClick }: StatCardProps) {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper
      onClick={onClick}
      className={`text-left rounded-2xl bg-white dark:bg-card border border-border p-5 flex items-center gap-4 ${
        onClick ? "hover:border-primary/40 hover:shadow-md transition-all" : ""
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${tone}`}>
        <Icon className="w-7 h-7" />
      </div>
      <div className="min-w-0">
        <p className="text-3xl font-bold text-foreground tracking-tight leading-none">{value}</p>
        <p className="text-sm font-semibold text-foreground mt-1.5">{label}</p>
        {hint && <p className="text-xs text-muted-foreground mt-0.5 truncate">{hint}</p>}
      </div>
    </Wrapper>
  );
}
