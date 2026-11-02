export function ReservationCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-card border border-border animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      <div className="p-3.5 space-y-2">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-3 w-2/3 rounded bg-muted" />
      </div>
    </div>
  );
}

export function ReservationsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <ReservationCardSkeleton key={i} />
      ))}
    </div>
  );
}
