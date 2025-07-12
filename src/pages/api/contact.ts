import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const { RESEND_API_KEY, TO_EMAIL, FROM_EMAIL, TURNSTILE_SECRET_KEY } = import.meta.env;

  if (!RESEND_API_KEY || !TO_EMAIL || !FROM_EMAIL || !TURNSTILE_SECRET_KEY) {
    console.error("Email service is not configured. Missing one or more required environment variables.");
    return new Response(
      JSON.stringify({ message: 'Internal Server Error: Email service not configured.' }),
      { status: 500 }
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const data = await request.json();
    const { name, email, message } = data;
    const token = data['cf-turnstile-response'];

    // Validate the Turnstile token, but skip in development
    // Only verify CAPTCHA if it's explicitly enabled
  if (import.meta.env.PUBLIC_CAPTCHA_ENABLED === 'true') {
      const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          secret: TURNSTILE_SECRET_KEY,
          response: token,
          remoteip: clientAddress,
        }),
      }
    );

      const outcome = await turnstileResponse.json();
      if (!outcome.success) {
        return new Response(JSON.stringify({ message: 'CAPTCHA verification failed.' }), {
          status: 400,
        });
      }
    }

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: 'Name, email, and message are required.' }),
        { status: 400 }
      );
    }

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New message from ${name} on Staticfish`,
      html: `<p>You have a new contact form submission:</p><br>
             <strong>Name:</strong> ${name}<br>
             <strong>Email:</strong> ${email}<br>
             <strong>Message:</strong><br>
             <p>${message}</p>`,
      replyTo: email,
    });

    if (response.error) {
      console.error('Error sending email:', response.error);
      return new Response(JSON.stringify({ message: 'Sorry, there was an error sending your message. Please try again or contact us directly.', error: response.error.message }), { status: 500 });
    }

    return new Response(
      JSON.stringify({ message: 'Message sent successfully!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('An exception occurred while sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return new Response(
      JSON.stringify({ message: 'Sorry, there was an error sending your message. Please try again or contact us directly.', error: errorMessage }),
      { status: 500 }
    );
  }
};