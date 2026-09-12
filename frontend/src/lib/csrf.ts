// CSRF protection: Origin validation + Double-submit cookie pattern

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  for (const part of cookieHeader.split(';')) {
    const [key, ...val] = part.trim().split('=');
    if (key) {
      cookies[key.trim()] = decodeURIComponent(val.join('='));
    }
  }
  return cookies;
}

// Layer 1: Origin/Referer header validation
export function validateOrigin(req: Request): {
  valid: boolean;
  error?: string;
} {
  const allowedOrigins = [
    process.env.NEXTAUTH_URL || 'http://localhost:3000',
  ].filter(Boolean);

  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');

  const requestOrigin = origin || (referer ? new URL(referer).origin : null);

  if (!requestOrigin) {
    return { valid: false, error: 'Missing Origin header' };
  }

  const isAllowed = allowedOrigins.some((allowed) => {
    try {
      return requestOrigin === new URL(allowed).origin;
    } catch {
      return requestOrigin === allowed;
    }
  });

  if (!isAllowed) {
    return { valid: false, error: `Origin ${requestOrigin} not allowed` };
  }

  return { valid: true };
}

// Layer 2: Double-submit cookie token validation
function validateDoubleSubmit(req: Request): {
  valid: boolean;
  error?: string;
} {
  const headerToken = req.headers.get('x-csrf-token');
  if (!headerToken) {
    return { valid: false, error: 'Missing X-CSRF-Token header' };
  }

  const cookieHeader = req.headers.get('cookie') || '';
  const csrfCookieName =
    process.env.NODE_ENV === 'production' ? '__Host-csrf-token' : 'csrf-token';
  const cookies = parseCookies(cookieHeader);
  const cookieToken = cookies[csrfCookieName];

  if (!cookieToken) {
    return { valid: false, error: 'Missing CSRF cookie' };
  }

  if (headerToken !== cookieToken) {
    return { valid: false, error: 'CSRF token mismatch' };
  }

  return { valid: true };
}

// Combined CSRF validation: both layers must pass
export function validateCsrf(req: Request): {
  valid: boolean;
  error?: string;
} {
  // Layer 1: Origin validation
  const originResult = validateOrigin(req);
  if (!originResult.valid) {
    return originResult;
  }

  // Layer 2: Double-submit cookie
  const doubleSubmitResult = validateDoubleSubmit(req);
  if (!doubleSubmitResult.valid) {
    return doubleSubmitResult;
  }

  return { valid: true };
}

export const CSRF_COOKIE_NAME =
  process.env.NODE_ENV === 'production' ? '__Host-csrf-token' : 'csrf-token';
