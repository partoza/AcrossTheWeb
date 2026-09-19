import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { transporter } from '@/lib/mailer';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { escapeHtml, validateEmail, validateLength } from '@/lib/sanitize';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { validateCsrf } from '@/lib/csrf';

// Per-IP rate limiter: 5 requests per 15 minutes
const limiter = rateLimit({
  id: 'inquiry',
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
});

export async function POST(req: Request) {
  try {
    // Rate limiting (per IP)
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

    // CSRF validation (Origin + double-submit cookie)
    const csrfResult = validateCsrf(req);
    if (!csrfResult.valid) {
      return NextResponse.json(
        { error: 'CSRF validation failed' },
        { status: 403 }
      );
    }

    // Server-side session authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, email, items, totalEstimatedPrice, captchaToken } = body;

    // reCAPTCHA verification
    if (!captchaToken || typeof captchaToken !== 'string') {
      return NextResponse.json(
        { error: 'CAPTCHA verification is required' },
        { status: 400 }
      );
    }

    const captchaValid = await verifyRecaptcha(captchaToken);
    if (!captchaValid) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

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

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Service items are required' },
        { status: 400 }
      );
    }

    if (items.length === 0 || items.length > 20) {
      return NextResponse.json(
        { error: 'Between 1 and 20 items are required' },
        { status: 400 }
      );
    }

    // Sanitize all user-provided fields
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeTotal =
      typeof totalEstimatedPrice === 'number' ? totalEstimatedPrice : 0;

    const itemsHtml = items
      .map((item: { title?: string; estimatedPrice?: number; details?: Record<string, string> }) => {
        const safeTitle = escapeHtml(
          String(item.title || '').slice(0, 200)
        );
        const safePrice = Number(item.estimatedPrice) || 0;
        const priceDisplay = (safeTitle.toLowerCase().includes('custom') || safePrice === 0) 
          ? 'To Be Discussed' 
          : `₱${safePrice.toLocaleString()}`;

        const details = Object.entries(item.details || {})
          .filter(([, v]) => v && v !== 'no')
          .map(([k, v]) => escapeHtml(v === 'yes' ? k : String(v)))
          .join(' &bull; ');

        return `
  <div style="border: 1px solid #eaeaea; border-radius: 6px; padding: 16px; margin-bottom: 16px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border: none;">
      <tr>
        <td align="left">
          <p style="font-size: 14px; font-weight: 600; margin: 0 0 4px 0; color: #000;">${safeTitle}</p>
          <p style="font-size: 13px; color: #666; margin: 0;">${details}</p>
        </td>
        <td align="right" valign="middle">
          <p style="font-size: 14px; font-weight: 600; color: #000; margin: 0;">${priceDisplay}</p>
        </td>
      </tr>
    </table>
  </div>
      `;
      })
      .join('');

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'acrosstheweb2026@gmail.com',
      cc: email,
      subject: `New Service Inquiry from ${safeName}`,
      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 40px auto; color: #000;">
  <div style="text-align: center; margin-bottom: 32px;">
    <img src="https://res.cloudinary.com/wjd1ukmq/image/upload/v1789245494/AcrossTheWeb-big.png" alt="Across The Web" style="width: 40px; height: 40px; border-radius: 50%;" />
  </div>
  
  <p style="font-size: 14px; line-height: 24px; color: #000; margin-bottom: 24px;">
    Hello <strong>${safeName}</strong>,<br /><br />
    We have received your new service inquiry. Our team will review the details and reach out within 24 hours.
  </p>

  ${itemsHtml}

  <div style="border: 1px solid #eaeaea; border-radius: 6px; padding: 16px; margin-bottom: 32px; background-color: #fafafa;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border: none;">
      <tr>
        <td align="left">
          <p style="font-size: 14px; font-weight: 600; margin: 0 0 4px 0; color: #000;">Estimated Total</p>
          <p style="font-size: 12px; color: #666; margin: 0;">*Taxes calculated at checkout</p>
        </td>
        <td align="right" valign="middle">
          <p style="font-size: 16px; font-weight: 600; color: #000; margin: 0;">${safeTotal.toLocaleString()}</p>
        </td>
      </tr>
    </table>
  </div>

  <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 32px 0;" />
  
  <p style="font-size: 12px; color: #666; margin: 0 0 8px 0;">
    If you have any questions, reach out to <a href="mailto:acrosstheweb2026@gmail.com" style="color: #000; text-decoration: underline;">Support</a>.
  </p>
  <p style="font-size: 12px; color: #666; margin: 0;">
    Copyright &copy; 2026 Across The Web. All rights reserved.
  </p>
</div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    );
  } catch (error) {
    console.error('Inquiry Email Error:', error);
    return NextResponse.json(
      { error: 'Failed to send inquiry' },
      { status: 500 }
    );
  }
}
