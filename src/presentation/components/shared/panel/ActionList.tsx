import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface PanelAction {
  icon: React.ElementType;
  label: string;
  description: string;
  onClick?: () => void;
  href?: string;
  badge?: number;
}

function ActionCard({ action }: { action: PanelAction }) {
  const Icon = action.icon;
  const className =
    "group relative flex flex-col gap-6 p-5 text-left rounded-xl border border-border bg-white dark:bg-card hover:border-foreground/40 transition-colors";
  const content = (
    <>
      <div className="flex items-start justify-between">
        <Icon className="w-7 h-7 text-foreground" strokeWidth={1.5} />
        {!!action.badge && (
          <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
            {action.badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-[15px] font-semibold text-foreground flex items-center gap-1">
          {action.label}
          <ChevronRight className="w-4 h-4 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">{action.description}</p>
      </div>
    </>
  );
  return action.href ? (
    <Link href={action.href} className={className}>{content}</Link>
  ) : (
    <button onClick={action.onClick} className={className}>{content}</button>
  );
}

export function ActionList({ actions }: { actions: PanelAction[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {actions.map((a) => <ActionCard key={a.label} action={a} />)}
    </div>
  );
}
