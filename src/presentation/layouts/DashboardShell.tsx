"use client";

import React from "react";
import { cn } from "@/presentation/utils/cn";
import { TabDef } from "@/presentation/hooks/useDashboardTabs";
import { User } from "@/core/domain/entities/User";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardShellProps {
  user: User;
  tabs: TabDef[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onLogout: () => void;
  tabBadges?: Record<string, number>;
  children: React.ReactNode;
}

export function DashboardShell({ user, tabs, activeTab, onTabChange, onLogout, tabBadges, children }: DashboardShellProps) {
  const title = tabs.find((t) => t.id === activeTab)?.label ?? "";

  return (
    <div className="panel-theme h-screen bg-background flex overflow-hidden">
      <DashboardSidebar tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} tabBadges={tabBadges} />

      <div className="flex-1 min-w-0 flex flex-col">
        <DashboardHeader user={user} title={title} onLogout={onLogout} />

        <main className="flex-1 overflow-y-auto thin-scrollbar pb-20 md:pb-0 bg-background">
          <div className="mx-auto w-full max-w-6xl px-6 py-6">{children}</div>
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white dark:bg-card shadow-[0_-2px_10px_0_rgb(15_23_42/0.06)] safe-area-bottom">
        <div className="flex justify-around py-1.5">
          {tabs.slice(0, 4).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn("flex flex-col items-center gap-0.5 p-2 rounded-lg transition-colors", isActive ? "text-primary" : "text-muted-foreground")}
              >
                <span className="relative">
                  <tab.icon className="h-5 w-5" />
                  {!!tabBadges?.[tab.id] && (
                    <span className="absolute -top-1 -right-1.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                      {tabBadges[tab.id] > 9 ? "9+" : tabBadges[tab.id]}
                    </span>
                  )}
                </span>
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
