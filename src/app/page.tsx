"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/explore");
  }, [router]);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden animate-pulse">
      {/* Header — espejo de MainHeader */}
      <div className="h-16 border-b border-border/40 bg-white flex items-center justify-between px-6 shrink-0">
        <div className="h-10 w-10 rounded-xl bg-muted/60" />
        <div className="flex items-center gap-2">
          {[80, 72, 88, 64].map((w, i) => (
            <div key={i} className={`h-8 w-${w === 80 ? '20' : w === 72 ? '18' : w === 88 ? '22' : '16'} rounded-lg bg-muted/50 hidden md:block`} style={{ width: w }} />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-28 rounded-xl bg-muted/50" />
          <div className="h-9 w-9 rounded-full bg-muted/50" />
        </div>
      </div>

      {/* Body — espejo del layout de explore: izq lista + der mapa */}
      <div className="flex flex-1 min-h-0">
        {/* Panel izquierdo — filtros + cards */}
        <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col border-r border-border/40">
          {/* Search bar skeleton */}
          <div className="px-4 py-3 border-b border-border/40 flex items-center gap-3">
            <div className="flex-1 h-10 rounded-xl bg-muted/50" />
            <div className="h-10 w-10 rounded-xl bg-muted/50 shrink-0" />
          </div>
          {/* Cards grid */}
          <div className="flex-1 overflow-hidden p-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-white border border-border/30 shadow-[0_8px_32px_rgba(0,0,0,0.09)] overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-r from-muted/80 via-muted/40 to-muted/80" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 w-16 bg-muted/60 rounded-full" />
                    <div className="h-4 w-3/4 bg-muted/60 rounded-md" />
                    <div className="h-3 w-1/2 bg-muted/40 rounded-md" />
                    <div className="h-4 w-20 bg-muted/55 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel derecho — mapa */}
        <div className="hidden md:block flex-1 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
          {[16,32,48,64,80].map((p) => (
            <div key={`h${p}`} className="absolute w-full h-px bg-slate-300/50" style={{ top: `${p}%` }} />
          ))}
          {[16,32,48,64,80].map((p) => (
            <div key={`v${p}`} className="absolute h-full w-px bg-slate-300/50" style={{ left: `${p}%` }} />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-muted/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
