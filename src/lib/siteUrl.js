/** Public site origin for share links (never use localhost in shared URLs). */
export function getSiteOrigin() {
  const raw = import.meta.env.VITE_SITE_URL
  if (typeof raw === 'string' && /^https?:\/\//.test(raw.trim())) {
    return raw.trim().replace(/\/$/, '')
  }
  return 'https://little-birds-nine.vercel.app'
}
