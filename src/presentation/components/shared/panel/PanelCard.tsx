import React from "react";
import { Warehouse } from "lucide-react";
import { cn } from "@/presentation/utils/cn";
import { resolveImageUrl } from "@/presentation/utils/image";

/**
 * Tarjeta del panel con la misma identidad visual que la tarjeta de Explorar:
 * contenedor con borde y sombra suave, foto 4:3 con degradado inferior,
 * insignia arriba a la izquierda, dato en blanco abajo a la izquierda.
 */
interface PanelCardProps {
  image?: string;
  alt: string;
  /** Insignia sobre la foto, arriba a la izquierda */
  badge: React.ReactNode;
  /** Control sobre la foto, arriba a la derecha (menú, etc.) */
  topRight?: React.ReactNode;
  /** Texto blanco sobre la foto, abajo a la izquierda */
  bottomLeft?: React.ReactNode;
  /** Etiqueta sobre la foto, abajo a la derecha */
  bottomRight?: React.ReactNode;
  /** Al hacer clic en la foto */
  onImageClick?: () => void;
  children: React.ReactNode;
}

export function PanelCard({ image, alt, badge, topRight, bottomLeft, bottomRight, onImageClick, children }: PanelCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col rounded-2xl overflow-hidden transition-all duration-300",
        "bg-white dark:bg-card border border-border",
        "shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.11)] hover:border-foreground/20",
      )}
    >
      <div className="relative w-full aspect-[4/3] flex-shrink-0 bg-muted">
        <button
          type="button"
          onClick={onImageClick}
          disabled={!onImageClick}
          aria-label={alt}
          className={cn("block w-full h-full overflow-hidden", onImageClick ? "cursor-pointer" : "cursor-default")}
        >
          {image ? (
            <img src={resolveImageUrl(image)} alt={alt} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/10 to-accent/10 text-primary/60">
              <Warehouse className="w-10 h-10" strokeWidth={1.5} />
              <span className="text-xs font-medium">Sin foto</span>
            </div>
          )}
        </button>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 dark:bg-card/90 backdrop-blur-sm text-foreground text-[11px] font-semibold rounded-lg shadow-sm pointer-events-none">
          {badge}
        </div>
        {topRight && <div className="absolute top-2.5 right-2.5">{topRight}</div>}
        {bottomLeft && (
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-white text-xs font-medium pointer-events-none">{bottomLeft}</div>
        )}
        {bottomRight && (
          <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[11px] font-bold rounded-lg shadow-sm pointer-events-none">
            {bottomRight}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 p-3.5 flex-1">{children}</div>
    </article>
  );
}
