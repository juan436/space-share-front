export const spaceTypeColors: Record<string, string> = {
  garage:  "bg-sky-50 text-sky-700 ring-sky-200/60 dark:bg-sky-950/20 dark:text-sky-400 dark:ring-sky-800/40",
  basement:"bg-violet-50 text-violet-700 ring-violet-200/60 dark:bg-violet-950/20 dark:text-violet-400 dark:ring-violet-800/40",
  attic:   "bg-amber-50 text-amber-700 ring-amber-200/60 dark:bg-amber-950/20 dark:text-amber-400 dark:ring-amber-800/40",
  storage: "bg-emerald-50 text-emerald-700 ring-emerald-200/60 dark:bg-emerald-950/20 dark:text-emerald-400 dark:ring-emerald-800/40",
  parking: "bg-blue-50 text-blue-700 ring-blue-200/60 dark:bg-blue-950/20 dark:text-blue-400 dark:ring-blue-800/40",
  other:   "bg-muted text-muted-foreground ring-border/60",
};

export const mapConfig = {
  defaultCenter: { lat: 13.6929, lng: -89.2182 },
  defaultZoom: 11,
};
