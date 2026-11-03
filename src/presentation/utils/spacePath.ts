/** Ruta pública de un espacio: usa el slug; si falta (datos antiguos), cae al enlace con ID, que redirige. */
export function spacePath(space: { id: string; slug?: string }, query = ""): string {
  const base = space.slug ? `/espacio/${space.slug}` : `/space/${space.id}`;
  return `${base}${query}`;
}
