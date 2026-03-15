// Labels for space types
export const spaceTypeLabels: Record<string, string> = {
  garage: "Garaje",
  basement: "Sótano",
  attic: "Ático",
  storage: "Bodega",
  parking: "Parqueo",
  other: "Otro",
};

// Colors for space type badges
export const spaceTypeColors: Record<string, string> = {
  garage: "bg-blue-500",
  basement: "bg-purple-500",
  attic: "bg-amber-500",
  storage: "bg-emerald-500",
  parking: "bg-sky-500",
  other: "bg-gray-500",
};

// Map configuration
export const mapConfig = {
  defaultCenter: { lat: 13.6929, lng: -89.2182 },
  defaultZoom: 11,
};
