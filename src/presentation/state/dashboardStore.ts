import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DashboardSection =
  | "home"
  | "spaces"
  | "reservations"
  | "messages"
  | "settings"
  | "users"
  | "analytics";

interface DashboardState {
  activeSection: DashboardSection;
  setActiveSection: (section: DashboardSection) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      activeSection: "home",
      setActiveSection: (section) => set({ activeSection: section }),
    }),
    {
      name: "spaceshare-dashboard",
    }
  )
);
