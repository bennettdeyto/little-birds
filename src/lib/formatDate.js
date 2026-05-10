/** Lowercase month day, e.g. "may 10" — no year */
export function formatEntryDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    .toLowerCase()
}
