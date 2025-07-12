/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare namespace App {
  interface Locals {
    cspNonce: string;
  }

  interface Platform {
    env: {
      RESEND_API_KEY: string;
      TO_EMAIL: string;
      FROM_EMAIL: string;
      TURNSTILE_SECRET_KEY: string;
      PUBLIC_CAPTCHA_ENABLED: string;
      PUBLIC_SANITY_PROJECT_ID: string;
      PUBLIC_SANITY_DATASET: string;
      PUBLIC_TURNSTILE_SITE_KEY: string;
    };
    context: {
      waitUntil(promise: Promise<any>): void;
    };
    caches: CacheStorage & { default: Cache };
  }
}