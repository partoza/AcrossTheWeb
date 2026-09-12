// Per-IP sliding window rate limiter

type RateLimitEntry = {
  count: number;
  resetTime: number;
};

const limiters = new Map<string, Map<string, RateLimitEntry>>();

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function startCleanup() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    limiters.forEach((entries, limiterId) => {
      entries.forEach((entry, ip) => {
        if (now > entry.resetTime) {
          entries.delete(ip);
        }
      });
      if (entries.size === 0) {
        limiters.delete(limiterId);
      }
    });
  }, 60_000);
}

export function rateLimit(options: {
  id: string;
  maxRequests: number;
  windowMs: number;
}) {
  const { id, maxRequests, windowMs } = options;

  if (!limiters.has(id)) {
    limiters.set(id, new Map());
  }
  startCleanup();

  return {
    check(ip: string): {
      success: boolean;
      remaining: number;
      retryAfter: number;
    } {
      const entries = limiters.get(id)!;
      const now = Date.now();
      const entry = entries.get(ip);

      if (!entry || now > entry.resetTime) {
        entries.set(ip, { count: 1, resetTime: now + windowMs });
        return { success: true, remaining: maxRequests - 1, retryAfter: 0 };
      }

      if (entry.count >= maxRequests) {
        const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
        return { success: false, remaining: 0, retryAfter };
      }

      entry.count++;
      return {
        success: true,
        remaining: maxRequests - entry.count,
        retryAfter: 0,
      };
    },
  };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  return '127.0.0.1';
}
