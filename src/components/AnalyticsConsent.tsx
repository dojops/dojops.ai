"use client";

import { useCallback, useSyncExternalStore } from "react";
import Script from "next/script";

const GA_ID = "G-JV5TNH8C59";
const CONSENT_KEY = "analytics-consent";

type Consent = "granted" | "denied" | "pending";

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): Consent {
  try {
    const val = localStorage.getItem(CONSENT_KEY);
    if (val === "granted" || val === "denied") return val;
  } catch {
    /* blocked storage */
  }
  return "pending";
}

function getServerSnapshot(): Consent {
  return "pending";
}

function setConsent(value: "granted" | "denied") {
  localStorage.setItem(CONSENT_KEY, value);
  for (const cb of listeners) cb();
}

export default function AnalyticsConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const accept = useCallback(() => setConsent("granted"), []);
  const decline = useCallback(() => setConsent("denied"), []);

  return (
    <>
      {/* Only load GA when user has explicitly consented */}
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {/* Consent banner — only shown when no choice has been made */}
      {consent === "pending" && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[60] px-4 py-3 sm:px-6"
          style={{
            background: "color-mix(in srgb, var(--bg-card) 95%, transparent)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: "1px solid var(--border-primary)",
          }}
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-text-secondary text-center sm:text-left flex-1">
              We use cookies for analytics to understand how visitors interact with this site.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={decline}
                className="px-3 py-1.5 text-xs font-medium rounded-md text-text-secondary border border-border-primary hover:bg-bg-card-hover transition-colors"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-3 py-1.5 text-xs font-medium rounded-md text-white transition-colors"
                style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
