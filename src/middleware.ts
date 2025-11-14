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

  // Define security headers with nonce
  const securityHeaders = {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), midi=(), sync-xhr=(), microphone=(), camera=(), magnetometer=(), gyroscope=(), fullscreen=(), payment=()',
    'Content-Security-Policy': [
      `default-src 'self';`,
      // Use nonce for inline scripts, allow necessary external scripts
      `script-src 'self' 'nonce-${nonce}' https://challenges.cloudflare.com https://*.googletagmanager.com;`,
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;`,
      `img-src 'self' data:;`,
      `font-src 'self' https://fonts.gstatic.com;`,
      `frame-src https://challenges.cloudflare.com;`,
      `connect-src 'self' https://challenges.cloudflare.com;`,
      `object-src 'none';`,
      `base-uri 'self';`
    ].join(' '),
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
});
