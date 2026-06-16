const UPLOADS_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") || "http://localhost:3006";

export function resolveImageUrl(filename: string): string {
  if (filename.startsWith("http") || filename.startsWith("blob:")) return filename;
  return `${UPLOADS_BASE_URL}/uploads/${filename}`;
}
