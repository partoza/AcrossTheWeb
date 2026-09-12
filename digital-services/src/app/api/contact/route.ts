import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { escapeHtml, validateEmail, validateLength } from '@/lib/sanitize';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Per-IP rate limiter: 5 requests per 15 minutes
const limiter = rateLimit({
  id: 'contact',
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
    const { name, email, subject, message } = body;

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

    if (!validateLength(subject, 200)) {
      return NextResponse.json(
        { error: 'Subject is required and must be under 200 characters' },
        { status: 400 }
      );
    }

    if (!validateLength(message, 5000)) {
      return NextResponse.json(
        { error: 'Message is required and must be under 5000 characters' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    const mailOptions = {
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'hello@acrosstheweb.com',
      subject: `Contact: ${safeSubject} (from ${safeName})`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <h3>Message:</h3>
        <div style="padding: 15px; border: 1px solid #eee; border-radius: 5px; white-space: pre-wrap;">${safeMessage}</div>
      `,
    };

    if (resend) {
      await resend.emails.send(mailOptions);
    } else {
      console.warn(
        'RESEND_API_KEY is not configured. Email not sent.'
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
    console.error('Error sending contact message:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
