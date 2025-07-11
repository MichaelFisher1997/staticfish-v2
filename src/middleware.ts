import { defineMiddleware } from 'astro:middleware';

// Define security headers with recommended values
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), midi=(), sync-xhr=(), microphone=(), camera=(), magnetometer=(), gyroscope=(), fullscreen=(), payment=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    // Allow scripts from self, inline (for Astro), and Cloudflare Turnstile

    // Allow styles from self and inline
    "style-src 'self' 'unsafe-inline'",
    // Allow images from self, data URIs, and the Sanity CDN
    "img-src 'self' data: https://cdn.sanity.io",
    // Allow fonts from self
    "font-src 'self'",
    // Allow iframes from Cloudflare Turnstile
    "frame-src https://challenges.cloudflare.com",
    // Allow API connections to self, Sanity, and Cloudflare Turnstile
    "connect-src 'self' https://*.sanity.io https://challenges.cloudflare.com"
  ].join('; ')
};

// Astro middleware to apply the headers to every response
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const nonce = context.locals.cspNonce;

  // Clone the original headers object to avoid direct mutation
  const newHeaders = { ...securityHeaders };

  // Update the CSP to use the nonce
  newHeaders['Content-Security-Policy'] = [
    "default-src 'self'",
    // Use the nonce for scripts
    `script-src 'self' 'nonce-${nonce}' https://challenges.cloudflare.com`,
    // Style-src can also use a nonce if needed, but 'unsafe-inline' is common for styles
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://cdn.sanity.io",
    "font-src 'self'",
    "frame-src https://challenges.cloudflare.com",
    "connect-src 'self' https://*.sanity.io https://challenges.cloudflare.com"
  ].join('; ');

  // Apply all headers
  Object.entries(newHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
});
