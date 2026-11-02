"use client";

import { Building2 } from "lucide-react";
import { SpaceViewModel } from "@/presentation/types/spaces";
import { SpaceCard, SpaceCardActions } from "./SpaceCard";

interface SpaceCardsProps extends SpaceCardActions {
  spaces: SpaceViewModel[];
  isLoading: boolean;
  emptyText: string;
}

export function SpaceCards({ spaces, isLoading, emptyText, ...actions }: SpaceCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden bg-white dark:bg-card border border-border animate-pulse">
            <div className="aspect-[4/3] bg-muted" />
            <div className="p-3.5 space-y-2">
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (spaces.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 rounded-xl border border-dashed border-border bg-white dark:bg-card text-muted-foreground">
        <Building2 className="w-9 h-9 opacity-40" />
        <p className="text-sm">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {spaces.map((space) => (
        <SpaceCard key={space.id} space={space} actions={actions} />
      ))}
    </div>
  );
}
