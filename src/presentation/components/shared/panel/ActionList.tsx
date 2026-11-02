import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface PanelAction {
  icon: React.ElementType;
  label: string;
  description: string;
  onClick?: () => void;
  href?: string;
  badge?: number;
}

function ActionRow({ action }: { action: PanelAction }) {
  const Icon = action.icon;
  const className = "group w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-primary/[0.04] transition-colors";
  const content = (
    <>
      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{action.label}</p>
        <p className="text-xs text-muted-foreground">{action.description}</p>
      </div>
      {!!action.badge && (
        <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
          {action.badge}
        </span>
      )}
      <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
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
    <div className="divide-y divide-border">
      {actions.map((a) => <ActionRow key={a.label} action={a} />)}
    </div>
  );
}
