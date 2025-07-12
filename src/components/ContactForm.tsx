import React, { useState, useEffect, lazy, Suspense } from "react";
import { Button } from "./ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";
const TurnstileWidget = lazy(() => import("./Turnstile"));

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // In development, we bypass the CAPTCHA by providing a dummy token.
  // In production, it starts as null and requires user interaction.
  const [captchaToken, setCaptchaToken] = useState<string | null>(
    // Initialize with a bypass token if CAPTCHA is disabled, otherwise require user action
    import.meta.env.PUBLIC_CAPTCHA_ENABLED === "false" ? "development-bypass-token" : null
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after initial render
    setIsClient(true);
  }, []);

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setSubmitStatus("error");
      // In a real app, you'd want a more specific error message here.
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, "cf-turnstile-response": captchaToken }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setErrorMessage(null); // Clear previous errors
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'An unknown server error occurred.');
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'A network error occurred. Please check your connection.');
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Tell us about your project..."
          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="flex items-center gap-2 p-4 border border-green-200 bg-green-50 text-green-800 rounded-md">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-sm">
            Thank you! Your message has been sent successfully.
            We'll get back to you soon.
          </span>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="flex items-center gap-2 p-4 border border-red-200 bg-red-50 text-red-800 rounded-md">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-sm">
            {errorMessage || 'Sorry, there was an error sending your message. Please try again or contact us directly.'}
          </span>
        </div>
      )}

      {/* The TurnstileWidget will automatically hide itself in development mode */}
      {isClient && (
        <Suspense fallback={<div className="h-20" />}>
          <TurnstileWidget onVerify={setCaptchaToken} />
        </Suspense>
      )}

      {submitStatus === "error" && !captchaToken && (
        <p className="text-sm text-red-600 text-center">Please complete the CAPTCHA before submitting.</p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}