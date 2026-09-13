import { useState, useEffect, useCallback } from "react";
import { useUseCases } from "@/presentation/providers/usecases-context";

const POLL_MS = 15000;

export function useUnreadMessages() {
  const { getUnreadCountUseCase } = useUseCases();
  const [count, setCount] = useState(0);

  const refresh = useCallback(() => {
    getUnreadCountUseCase.execute().then((r) => setCount(r.count)).catch(() => {});
  }, [getUnreadCountUseCase]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, POLL_MS);
    return () => clearInterval(interval);
  }, [refresh]);

  return { unreadCount: count, refreshUnreadCount: refresh };
}
