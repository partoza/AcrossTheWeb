import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export async function POST(req: Request) {
  try {
    const { name, email, items } = await req.json();

    if (!name || !email || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const itemsHtml = items.map((item: { serviceName: string; price: number; preferences: { projectType: string; timeline: string; tier: string } }) => `
      <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 5px;">
        <h3 style="margin: 0 0 10px 0;">${item.serviceName} - $${item.price} (Starting)</h3>
        <p style="margin: 0;"><strong>Type/Scope:</strong> ${item.preferences.projectType}</p>
        <p style="margin: 0;"><strong>Timeline:</strong> ${item.preferences.timeline}</p>
        <p style="margin: 0;"><strong>Tier:</strong> ${item.preferences.tier}</p>
      </div>
    `).join('');

    const adminEmail = {
      from: 'Quotes <onboarding@resend.dev>',
      to: 'hello@acrosstheweb.com',
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Requested Services:</h3>
        ${itemsHtml}
      `
    };

    const userEmail = {
      from: 'AcrossTheWeb <onboarding@resend.dev>',
      to: email,
      subject: 'We received your quote request!',
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for requesting a quote from AcrossTheWeb. We have received your inquiry and will get back to you shortly with a detailed estimate.</p>
        <h3>Your Request Summary:</h3>
        ${itemsHtml}
        <p>Best regards,<br>The AcrossTheWeb Team</p>
      `
    };

    if (process.env.RESEND_API_KEY) {
      await resend.batch.send([adminEmail, userEmail]);
    } else {
      console.log('No RESEND_API_KEY provided. Mocking email send.');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending quote request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
