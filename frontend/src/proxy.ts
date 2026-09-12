// Next.js middleware for route protection, CSRF cookie initialization, and security headers

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
  const response = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // Add security headers to all responses
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '0');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );
  }

  // Protected API routes: require authenticated session
  const protectedApiRoutes = ['/api/contact', '/api/inquiry'];
  if (protectedApiRoutes.some((route) => pathname.startsWith(route))) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }
  }

  // Initialize CSRF cookie on page loads (not API calls or static assets)
  if (!pathname.startsWith('/api/') && !pathname.startsWith('/_next/')) {
    const csrfCookieName =
      process.env.NODE_ENV === 'production'
        ? '__Host-csrf-token'
        : 'csrf-token';

    const existingCsrfCookie = req.cookies.get(csrfCookieName);

    if (!existingCsrfCookie) {
      // Generate a random CSRF token
      const csrfToken = crypto.randomUUID() + '-' + crypto.randomUUID();

      response.cookies.set({
        name: csrfCookieName,
        value: csrfToken,
        httpOnly: false, // Client-side JS must be able to read this
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 24 * 60 * 60, // 24 hours, matching session
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and images
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
