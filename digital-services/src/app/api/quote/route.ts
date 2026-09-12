import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { escapeHtml, validateEmail, validateLength } from '@/lib/sanitize';

// Fail safely if RESEND_API_KEY is not configured - no hardcoded fallback
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Per-IP rate limiter: 5 requests per 15 minutes
const limiter = rateLimit({
  id: 'quote',
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
});

export async function POST(req: Request) {
  try {
    // Rate limiting
    const clientIp = getClientIp(req);
    const rateLimitResult = limiter.check(clientIp);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    const body = await req.json();
    const { name, email, items } = body;

    // Input validation
    if (!validateLength(name, 100)) {
      return NextResponse.json(
        { error: 'Name is required and must be under 100 characters' },
        { status: 400 }
      );
    }

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'At least one service item is required' },
        { status: 400 }
      );
    }

    if (items.length > 20) {
      return NextResponse.json(
        { error: 'Maximum 20 items per quote request' },
        { status: 400 }
      );
    }

    // Sanitize all user inputs before HTML interpolation
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);

    const itemsHtml = items
      .map(
        (item: {
          serviceName: string;
          price: number;
          preferences: {
            projectType: string;
            timeline: string;
            tier: string;
          };
        }) => {
          const safeServiceName = escapeHtml(
            String(item.serviceName || '').slice(0, 200)
          );
          const safePrice = Number(item.price) || 0;
          const safeProjectType = escapeHtml(
            String(item.preferences?.projectType || '').slice(0, 200)
          );
          const safeTimeline = escapeHtml(
            String(item.preferences?.timeline || '').slice(0, 200)
          );
          const safeTier = escapeHtml(
            String(item.preferences?.tier || '').slice(0, 200)
          );

          return `
      <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 5px;">
        <h3 style="margin: 0 0 10px 0;">${safeServiceName} - \$${safePrice} (Starting)</h3>
        <p style="margin: 0;"><strong>Type/Scope:</strong> ${safeProjectType}</p>
        <p style="margin: 0;"><strong>Timeline:</strong> ${safeTimeline}</p>
        <p style="margin: 0;"><strong>Tier:</strong> ${safeTier}</p>
      </div>
    `;
        }
      )
      .join('');

    const adminEmail = {
      from: 'Quotes <onboarding@resend.dev>',
      to: 'hello@acrosstheweb.com',
      subject: `New Quote Request from ${safeName}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <h3>Requested Services:</h3>
        ${itemsHtml}
      `,
    };

    const userEmail = {
      from: 'AcrossTheWeb <onboarding@resend.dev>',
      to: email,
      subject: 'We received your quote request!',
      html: `
        <h2>Hi ${safeName},</h2>
        <p>Thank you for requesting a quote from AcrossTheWeb. We have received your inquiry and will get back to you shortly with a detailed estimate.</p>
        <h3>Your Request Summary:</h3>
        ${itemsHtml}
        <p>Best regards,<br>The AcrossTheWeb Team</p>
      `,
    };

    if (resend) {
      await resend.batch.send([adminEmail, userEmail]);
    } else {
      console.warn(
        'RESEND_API_KEY is not configured. Email not sent. Set RESEND_API_KEY in environment variables.'
      );
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    );
  } catch (error) {
    console.error('Error sending quote request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
