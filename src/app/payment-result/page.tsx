"use client";

import { useEffect } from "react";

export default function PaymentResultPage() {
  useEffect(() => {
    window.close();
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground">Pago procesado. Cerrando ventana...</p>
    </div>
  );
}
