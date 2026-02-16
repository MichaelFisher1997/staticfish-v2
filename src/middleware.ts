import { defineMiddleware } from 'astro:middleware';

// Generate a secure random nonce for CSP
function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, Array.from(array)));
}

// Astro middleware to apply the headers to every response
export const onRequest = defineMiddleware(async (context, next) => {
  // Generate a unique nonce for this request
  const nonce = generateNonce();
  
  // Store nonce in locals for use in components
  context.locals.cspNonce = nonce;

  const response = await next();

  // Relax CSP for Sanity Studio (it requires inline scripts)
  if (context.url.pathname.startsWith('/studio')) {
    const studioHeaders = {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': [
        `default-src 'self';`,
        `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sanity.io;`,
        `style-src 'self' 'unsafe-inline';`,
        `img-src 'self' data: https://cdn.sanity.io https://*.sanity.io;`,
        `font-src 'self' data:;`,
        `connect-src 'self' https://*.sanity.io wss://*.sanity.io;`,
        `frame-src https://*.sanity.io;`,
        `object-src 'none';`,
        `base-uri 'self';`
      ].join(' '),
    };

    Object.entries(studioHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

  // Define security headers with nonce for other routes
  const securityHeaders = {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), midi=(), sync-xhr=(), microphone=(), camera=(), magnetometer=(), gyroscope=(), fullscreen=(), payment=()',
    'Content-Security-Policy': [
      `default-src 'self';`,
      `script-src 'self' 'nonce-${nonce}' https://challenges.cloudflare.com https://*.googletagmanager.com;`,
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;`,
      `img-src 'self' data: https://cdn.sanity.io;`,
      `font-src 'self' https://fonts.gstatic.com;`,
      `frame-src https://challenges.cloudflare.com;`,
      `connect-src 'self' https://challenges.cloudflare.com https://*.sanity.io;`,
      `object-src 'none';`,
      `base-uri 'self';`
    ].join(' '),
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
});
