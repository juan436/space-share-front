import { permanentRedirect } from "next/navigation";
import LegacySpaceRoute from "./LegacySpaceRoute";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * Enlace antiguo /space/:id. Si el espacio tiene slug, redirige de forma permanente (308)
 * a /espacio/:slug conservando la query (p. ej. ?from=). Si no, muestra la página como antes.
 */
export default async function LegacySpacePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  let slug: string | null = null;
  try {
    const res = await fetch(`${API_URL}/spaces/${encodeURIComponent(params.id)}`, { cache: "no-store" });
    if (res.ok) slug = ((await res.json()) as { slug?: string }).slug ?? null;
  } catch {
    // sin conexión con la API desde el servidor: se usa el respaldo del cliente
  }

  if (slug) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (typeof value === "string") query.set(key, value);
    }
    const qs = query.toString();
    permanentRedirect(`/espacio/${slug}${qs ? `?${qs}` : ""}`);
  }

  return <LegacySpaceRoute />;
}
