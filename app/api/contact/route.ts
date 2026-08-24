import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Client-side payload validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Verify email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    // Graceful developer fallback when key is not configured locally
    if (!resendApiKey || resendApiKey === 'MOCK_KEY') {
      console.warn("RESEND_API_KEY environment variable is not defined or is set to mock. Simulating email delivery for local testing.");
      
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully (Simulated - Configure RESEND_API_KEY for production).'
      });
    }

    const resend = new Resend(resendApiKey);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'avanidpoojary02@gmail.com',
      subject: `New Portfolio Message from ${name}`,
      text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: error.message || 'An error occurred with the email provider.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
      data
    });
  } catch (err: any) {
    console.error("API Route Server Error:", err);
    return NextResponse.json(
      { error: err.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
