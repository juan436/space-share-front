export function resolveHostId(value: unknown): string {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const obj = value as { _id?: string; id?: string };
    return obj._id ?? obj.id ?? "";
  }
  return (value as string) ?? "";
}
