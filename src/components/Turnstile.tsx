import ReactTurnstile from "react-turnstile";

// Handle module import differences between environments
const Turnstile = (ReactTurnstile as any).default || ReactTurnstile;

const TurnstileWidget = ({ onVerify }: { onVerify: (token: string) => void }) => {
  // Disable Turnstile in development for easier testing
  if (import.meta.env.DEV) {
    return (
      <div className="text-center text-xs text-muted-foreground/50 my-4">
        CAPTCHA disabled
      </div>
    );
  }
  const siteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    console.error("PUBLIC_TURNSTILE_SITE_KEY is not set in environment variables.");
    // Render a disabled-like state or a message
    return (
      <div className="p-4 text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
        CAPTCHA is not configured correctly. Please contact support.
      </div>
    );
  }

  return (
    <div className="flex justify-center my-4">
      <Turnstile
        sitekey={siteKey}
        onSuccess={onVerify}
      />
    </div>
  );
};

export default TurnstileWidget;
