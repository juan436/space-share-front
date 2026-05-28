import { ShieldCheck } from "lucide-react";
import Image from "next/image";

export function WompiVerifiedBanner() {
  return (
    <div className="flex items-center justify-center gap-3 bg-[#f0f4ff] dark:bg-[#1a2040] border border-[#4666FF]/20 rounded-2xl px-5 py-4">
      <ShieldCheck className="w-5 h-5 text-[#4666FF] shrink-0" />
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-foreground/60">Verificado por</span>
        <Image src="/images/wompi-logo.svg" alt="Wompi" width={56} height={19} className="dark:brightness-0 dark:invert" />
      </div>
      <span className="text-xs text-foreground/40">· Pago 100% seguro</span>
    </div>
  );
}
