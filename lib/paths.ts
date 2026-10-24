/** Respect Next.js basePath (empty on aiwithbassa.com; optional for subfolders). */
export function appPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
