import type { LucideIcon } from "lucide-react";

export type WizardOptionAccent = "primary" | "violet" | "sky";

export interface WizardOption<T extends string> {
  value: T;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: WizardOptionAccent;
}

interface AccentStyle {
  icon: string;
  shadow: string;
  border: string;
  bar: string;
}

const ACCENT_STYLES: Record<WizardOptionAccent, AccentStyle> = {
  primary: {
    icon: "bg-primary",
    shadow: "hover:shadow-primary/25",
    border: "hover:border-primary",
    bar: "from-primary/40 to-primary",
  },
  violet: {
    icon: "bg-violet-600",
    shadow: "hover:shadow-violet-600/25",
    border: "hover:border-violet-500",
    bar: "from-violet-400 to-violet-600",
  },
  sky: {
    icon: "bg-sky-600",
    shadow: "hover:shadow-sky-600/25",
    border: "hover:border-sky-500",
    bar: "from-sky-400 to-sky-600",
  },
};

interface WizardOptionGridProps<T extends string> {
  options: WizardOption<T>[];
  onSelect: (value: T) => void;
  columns?: 2 | 3;
}

export function WizardOptionGrid<T extends string>({ options, onSelect, columns = 3 }: WizardOptionGridProps<T>) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 w-full ${
        columns === 3 ? "sm:grid-cols-3 max-w-2xl" : "sm:grid-cols-2 max-w-xl"
      }`}
    >
      {options.map(({ value, label, description, icon: Icon, accent }) => {
        const style = ACCENT_STYLES[accent];
        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className={`group relative flex flex-col items-center text-center gap-3 p-7 rounded-3xl overflow-hidden bg-muted/30 dark:bg-white/[0.03] border-2 border-transparent ${style.border} hover:bg-white dark:hover:bg-card hover:-translate-y-1 shadow-sm ${style.shadow} hover:shadow-xl transition-all duration-300`}
          >
            <span
              className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${style.bar} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300`}
            />
            <div
              className={`w-16 h-16 rounded-2xl ${style.icon} flex items-center justify-center shadow-lg ${style.shadow} group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-base font-bold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
