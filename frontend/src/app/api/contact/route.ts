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
  id: 'contact',
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
    const { name, email, message, captchaToken } = body;

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

    if (!validateLength(message, 5000)) {
      return NextResponse.json(
        { error: 'Message is required and must be under 5000 characters' },
        { status: 400 }
      );
    }

    // Sanitize all inputs before HTML interpolation
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'acrosstheweb2026@gmail.com',
      subject: `New Contact Message from ${safeName}`,
      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 40px auto; color: #000;">
  <div style="text-align: center; margin-bottom: 32px;">
    <img src="https://res.cloudinary.com/wjd1ukmq/image/upload/v1789245494/AcrossTheWeb-big.png" alt="Across The Web" style="width: 40px; height: 40px; border-radius: 50%;" />
  </div>
  
  <p style="font-size: 14px; line-height: 24px; color: #000; margin-bottom: 24px;">
    Hello,<br /><br />
    You have received a new contact message from <strong>${safeName}</strong> (<a href="mailto:${safeEmail}" style="color: #000; text-decoration: none;">${safeEmail}</a>).
  </p>

  <div style="border: 1px solid #eaeaea; border-radius: 6px; padding: 16px; margin-bottom: 32px;">
    <p style="font-size: 14px; font-weight: 600; margin: 0 0 12px 0; color: #000;">Message:</p>
    <p style="font-size: 14px; line-height: 24px; color: #444; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
  </div>

  <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 32px 0;" />
  
  <p style="font-size: 12px; color: #666; margin: 0 0 8px 0;">
    If you'd like to report an issue, reach out to <a href="mailto:acrosstheweb2026@gmail.com" style="color: #000; text-decoration: underline;">Support</a>.
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
    console.error('Contact Email Error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
