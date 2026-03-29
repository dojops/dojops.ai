"use client";

import { useState } from "react";
import { LINKS } from "@/lib/constants";
import { useTranslation } from "@/i18n";

export default function CTASection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || LINKS.api;
      const res = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Unable to connect. Please try again later.");
    }
  }

  return (
    <section className="py-20 sm:py-28 px-5 bg-bg-primary relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, color-mix(in srgb, var(--accent) 4%, transparent), transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Card with gradient border effect */}
        <div className="relative rounded-2xl p-px overflow-hidden">
          {/* Gradient border layer — the 1px padding on parent reveals this behind the inner card */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, #06b6d4 0%, #3b82f6 40%, #d946ef 70%, #06b6d4 100%)",
              opacity: 0.4,
            }}
          />

          {/* Inner card */}
          <div
            className="relative rounded-[15px] p-8 sm:p-12 lg:p-16 text-center overflow-hidden"
            style={{ background: "#0d1117" }}
          >
            {/* Interior glow effects */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px"
              style={{
                background: "linear-gradient(90deg, transparent, #38bdf8, transparent)",
                opacity: 0.5,
              }}
            />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-24 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, #38bdf8 8%, transparent), transparent 70%)",
              }}
            />

            <div className="relative z-10">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.1em] uppercase mb-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.15))",
                  border: "1px solid rgba(56, 189, 248, 0.25)",
                  color: "#7dd3fc",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#38bdf8" }} />
                {t.newsletter.badge}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
                {t.newsletter.heading}
              </h2>
              <p
                className="text-sm sm:text-base leading-relaxed mb-10 max-w-lg mx-auto"
                style={{ color: "#8b95a8" }}
              >
                {t.newsletter.description}
              </p>

              {status === "success" ? (
                <div
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl"
                  style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-sm font-medium" style={{ color: "#34d399" }}>
                    {t.newsletter.successMessage}
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-stretch gap-3 max-w-xl mx-auto relative"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.newsletter.placeholder}
                    aria-label={t.newsletter.placeholder}
                    disabled={status === "loading"}
                    className="flex-1 px-5 py-3.5 rounded-xl text-sm transition-all duration-200 disabled:opacity-50"
                    style={{
                      border: "1px solid #2a2d37",
                      background: "#161921",
                      color: "#e8edf5",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#38bdf8";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(56, 189, 248, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#2a2d37";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-8 py-3.5 rounded-xl bg-gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity shrink-0 disabled:opacity-50"
                  >
                    {status === "loading" ? t.newsletter.subscribing : t.newsletter.subscribe}
                  </button>
                  {status === "error" && (
                    <p
                      className="text-xs mt-2 text-center sm:text-left"
                      style={{ color: "#f87171" }}
                    >
                      {errorMsg}
                    </p>
                  )}
                </form>
              )}

              <p className="text-xs mt-6" style={{ color: "#5a6478" }}>
                {t.newsletter.reachUs}{" "}
                <a
                  href="mailto:contact@dojops.ai"
                  className="hover:text-white transition-colors"
                  style={{ color: "#38bdf8" }}
                >
                  contact@dojops.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
