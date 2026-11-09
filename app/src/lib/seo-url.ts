const SITE_ORIGIN = 'https://www.vilatechub.com.br';

/** Canonical metadata must never contain tracking, fragments or a preview host.
 * This does not redirect visitors or remove click IDs from the address bar.
 */
export function canonicalUrl(url: string): string {
  const { pathname } = new URL(url, SITE_ORIGIN);
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  return SITE_ORIGIN + cleanPath;
}
