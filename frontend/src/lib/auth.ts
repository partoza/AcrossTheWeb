// Shared NextAuth configuration with JWT hardening

import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { randomUUID } from 'crypto';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // Force token refresh every 1 hour
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Initial sign-in: set up the token
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.jti = randomUUID(); // Unique token ID for revocation capability
      }

      // Enforce maxAge server-side as additional guard
      const iat = token.iat as number | undefined;
      if (iat && Date.now() / 1000 - iat > 24 * 60 * 60) {
        return { ...token, expired: true };
      }

      return token;
    },
    async session({ session, token }) {
      // If token has expired, return minimal session to trigger re-auth
      if ((token as Record<string, unknown>).expired) {
        return {
          ...session,
          user: undefined,
          expires: new Date(0).toISOString(),
        };
      }

      // Principle of least privilege: expose only necessary fields
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
