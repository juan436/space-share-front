export function ReservationCardSkeleton() {
  return (
    <div className="bg-white dark:bg-card rounded-2xl border border-border/30 shadow-[0_8px_32px_rgba(0,0,0,0.10)] overflow-hidden animate-pulse">
      <div className="h-40 bg-gradient-to-r from-muted/80 via-muted/40 to-muted/80" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-24 bg-muted/60 rounded-full" />
        <div className="space-y-1.5">
          <div className="h-4 w-full bg-muted/60 rounded-lg" />
          <div className="h-4 w-3/4 bg-muted/50 rounded-lg" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-28 bg-muted/50 rounded-md" />
          <div className="h-3 w-3 bg-muted/40 rounded" />
          <div className="h-3 w-28 bg-muted/50 rounded-md" />
        </div>
        <div className="h-px bg-border/40" />
        <div className="flex items-center justify-between pt-0.5">
          <div className="space-y-1">
            <div className="h-3 w-14 bg-muted/40 rounded" />
            <div className="h-5 w-20 bg-muted/60 rounded-md" />
          </div>
          <div className="h-9 w-24 bg-muted/50 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ReservationsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ReservationCardSkeleton key={i} />
      ))}
    </div>
  );
}
