"use client";

import Link from "next/link";
import { Compass } from "lucide-react";
import { Logo } from "@/presentation/components/shared/Logo";
import { cn } from "@/presentation/utils/cn";
import { TabDef } from "@/presentation/hooks/useDashboardTabs";

interface DashboardSidebarProps {
  tabs: TabDef[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabBadges?: Record<string, number>;
}

function TabBadge({ count }: { count: number }) {
  return (
    <span className="ml-auto flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
      {count > 9 ? "9+" : count}
    </span>
  );
}

export function DashboardSidebar({ tabs, activeTab, onTabChange, tabBadges }: DashboardSidebarProps) {
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-white dark:bg-card/50 border-r border-border shadow-[2px_0_10px_0_rgb(15_23_42/0.05)]">
      <div className="h-[72px] shrink-0 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center">
          <Logo cropped className="h-9 w-auto" />
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 text-left",
                isActive
                  ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted border-l-4 border-transparent"
              )}
            >
              <tab.icon className={cn("h-[18px] w-[18px]", isActive && "text-primary")} />
              {tab.label}
              {!!tabBadges?.[tab.id] && <TabBadge count={tabBadges[tab.id]} />}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-border">
        <Link
          href="/explore"
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted border-l-4 border-transparent transition-colors"
        >
          <Compass className="h-[18px] w-[18px]" />
          Explorar espacios
        </Link>
      </div>
    </aside>
  );
}
