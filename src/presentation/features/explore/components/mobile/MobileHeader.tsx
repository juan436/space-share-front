"use client";

import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";

export function MobileHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <Link href="/" className="text-xl font-bold">
        <span className="text-primary">Space</span>
        <span className="text-accent">Share</span>
      </Link>
      <Link href="/login">
        <Button variant="ghost" size="sm">
          Iniciar sesión
        </Button>
      </Link>
    </div>
  );
}
