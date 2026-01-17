"use client";

import { useEffect, useState } from "react";
import { ExplorePage, MobileExplorePage } from "@/presentation/features/explore";

export default function ExploreRoute() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return isMobile ? <MobileExplorePage /> : <ExplorePage />;
}
