import { defineMiddleware } from 'astro:middleware';

// Define security headers with recommended values
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), midi=(), sync-xhr=(), microphone=(), camera=(), magnetometer=(), gyroscope=(), fullscreen=(), payment=()'
};

// Astro middleware to apply the headers to every response
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Only apply CSP to HTML pages
  if (response.headers.get('Content-Type')?.includes('text/html')) {
    const nonce = context.locals.cspNonce;

    const csp = [
      // Base policy
      "default-src 'self'",
      // Scripts from self, Turnstile, and Google Tag Manager (for extensions), with nonce for inline scripts
      `script-src 'self' https://challenges.cloudflare.com https://*.googletagmanager.com 'nonce-${nonce}'`,
      // Styles from self, inline, and Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Images from self, data URIs, and Sanity CDN
      "img-src 'self' data: https://cdn.sanity.io",
      // Fonts from self and Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Allow iframes from Cloudflare Turnstile
      "frame-src https://challenges.cloudflare.com",
      // Allow API connections to self, Sanity, and Cloudflare Turnstile
      "connect-src 'self' https://*.sanity.io https://challenges.cloudflare.com",
      // Disallow embedding in object/embed tags
      "object-src 'none'",
      // All sub-resources must use a secure transport
      "base-uri 'self'",
    ].join('; ');

    response.headers.set('Content-Security-Policy', csp);
  }

  // Apply all other security headers to every request
  response.headers.set('Strict-Transport-Security', securityHeaders['Strict-Transport-Security']);
  response.headers.set('X-Frame-Options', securityHeaders['X-Frame-Options']);
  response.headers.set('X-Content-Type-Options', securityHeaders['X-Content-Type-Options']);
  response.headers.set('Referrer-Policy', securityHeaders['Referrer-Policy']);
  response.headers.set('Permissions-Policy', securityHeaders['Permissions-Policy']);

  return response;
});
