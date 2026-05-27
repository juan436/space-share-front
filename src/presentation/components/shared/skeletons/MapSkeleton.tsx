import { MapPin } from "lucide-react";
import { cn } from "@/presentation/utils/cn";

export function MapSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-muted/30 dark:to-muted/50 flex items-center justify-center relative overflow-hidden", className)}>
      {/* Grid lines simulating map */}
      <div className="absolute inset-0">
        {[16, 32, 48, 64, 80].map((pct) => (
          <div key={`h${pct}`} className="absolute w-full h-px bg-slate-300/50" style={{ top: `${pct}%` }} />
        ))}
        {[16, 32, 48, 64, 80].map((pct) => (
          <div key={`v${pct}`} className="absolute h-full w-px bg-slate-300/50" style={{ left: `${pct}%` }} />
        ))}
      </div>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      {/* Center icon */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex items-center justify-center animate-pulse">
          <MapPin className="w-7 h-7 text-primary/50" />
        </div>
        <div className="h-3 w-28 bg-white/70 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
