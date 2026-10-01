import { Apperio } from "apperio";

let logger: Apperio | null = null;

/**
 * Returns the browser-side Apperio logger, creating it on first call.
 *
 * Returns null during server rendering and when credentials are absent, so
 * neither SSR nor a checkout without .env.local has to special-case logging.
 * The Apperio constructor calls init() itself, which starts a flush interval,
 * hence the window guard rather than a module-scope instance.
 */
export function getLogger(): Apperio | null {
  if (typeof window === "undefined") return null;
  if (logger) return logger;

  const apiKey = process.env.NEXT_PUBLIC_APPERIO_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_APPERIO_PROJECT_ID;
  if (!apiKey || !projectId) return null;

  logger = new Apperio({
    apiKey,
    projectId,
    environment: process.env.NODE_ENV,
    serviceName: "femiajanaku",
    autoCapture: {
      errors: true,
      performance: true,
      pageViews: true,
      networkRequests: true,
      consoleMessages: false,
      userInteractions: false,
    },
    // Session replay. Inputs (the contact form) are masked by default;
    // wrap anything else private in .apperio-mask. sampleRate 1 records
    // every session; lower it once testing is done.
    replay: {
      enabled: true,
      sampleRate: 1,
    },
  });

  return logger;
}
