import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { RESEND_API_KEY, TO_EMAIL, FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !TO_EMAIL || !FROM_EMAIL) {
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
      reply_to: email,
    });

    if (response.error) {
      console.error({ error: response.error });
      return new Response(
        JSON.stringify({ message: 'Error sending email.' }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Message sent successfully!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Something went wrong.' }),
      { status: 500 }
    );
  }
};