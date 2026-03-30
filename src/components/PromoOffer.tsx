"use client";

import ScrollReveal from "./ScrollReveal";

export default function PromoOffer() {
  return (
    <section className="py-12 sm:py-16 px-5">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto relative">
          {/* Gradient border wrapper */}
          <div className="relative rounded-2xl p-px overflow-hidden">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #06b6d4 100%)",
                opacity: 0.35,
              }}
            />

            <div
              className="relative rounded-[15px] px-8 py-10 sm:px-12 sm:py-12 overflow-hidden"
              style={{ background: "#0d1117" }}
            >
              {/* Top edge glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
                style={{
                  background: "linear-gradient(90deg, transparent, #38bdf8, transparent)",
                  opacity: 0.5,
                }}
              />
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-20 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, #38bdf8 6%, transparent), transparent 70%)",
                }}
              />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Icon */}
                <div className="shrink-0">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.15))",
                      border: "1px solid rgba(56, 189, 248, 0.25)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      className="w-8 h-8"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 text-center lg:text-left">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.08em] uppercase mb-3"
                    style={{
                      background: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.25)",
                      color: "#34d399",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: "#34d399" }}
                    />
                    Limited offer
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                    Try dojops-sa with a free demo license
                  </h3>
                  <p className="text-sm leading-relaxed max-w-xl" style={{ color: "#8b95a8" }}>
                    Request a 7-day demo license and let the autonomous agent resolve your tickets.
                    No credit card required. Fill out the form and we will review your request.
                  </p>
                </div>

                {/* CTA */}
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Contact us
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <span className="text-[11px]" style={{ color: "#5a6478" }}>
                    or email contact@dojops.ai
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
