// Client-side CSRF token reader
// Reads the CSRF cookie set by middleware and provides it for fetch headers

export function getCsrfToken(): string {
  if (typeof document === 'undefined') return '';

  const cookieName =
    process.env.NODE_ENV === 'production' ? '__Host-csrf-token' : 'csrf-token';

  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${cookieName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`)
  );

  return match ? decodeURIComponent(match[1]) : '';
}
