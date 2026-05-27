"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/presentation/providers/auth-context";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="h-screen bg-white dark:bg-background flex flex-col overflow-hidden animate-pulse">
        {/* Header skeleton */}
        <div className="h-14 border-b border-border/40 bg-white dark:bg-card flex items-center justify-between px-6 shrink-0">
          <div className="h-10 w-10 rounded-xl bg-muted/60" />
          <div className="flex items-center gap-3">
            <div className="h-6 w-24 rounded-md bg-muted/50" />
            <div className="h-8 w-32 rounded-full bg-muted/50" />
          </div>
        </div>
        <div className="flex flex-1 min-h-0">
          {/* Sidebar skeleton */}
          <div className="hidden md:flex w-60 border-r border-border/40 flex-col gap-2 p-3 bg-white dark:bg-card/50">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 rounded-xl bg-muted/50" />
            ))}
            <div className="mt-auto h-10 rounded-xl bg-muted/40" />
          </div>
          {/* Content skeleton */}
          <div className="flex-1 p-6 space-y-5 bg-slate-50 dark:bg-slate-900 overflow-hidden">
            <div className="space-y-2">
              <div className="h-8 w-52 bg-muted/60 rounded-lg" />
              <div className="h-4 w-72 bg-muted/40 rounded-md" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 rounded-2xl bg-white dark:bg-card shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-border/30" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
