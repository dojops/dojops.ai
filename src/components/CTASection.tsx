"use client";

import { useState } from "react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Open mailto with pre-filled subject
    window.location.href = `mailto:contact@dojops.ai?subject=Newsletter%20Signup&body=Please%20add%20${encodeURIComponent(email)}%20to%20the%20DojOps%20newsletter.`;
    setSubmitted(true);
  }

  return (
    <section className="py-16 sm:py-24 px-5 relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Gradient badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-brand text-white text-[10px] sm:text-xs font-medium tracking-wide uppercase mb-6">
          Stay in the loop
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 tracking-tight">
          Get updates on DojOps
        </h2>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          New modules, provider integrations, and releases — straight to your inbox. No spam,
          unsubscribe anytime.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-success-bg border border-success-fg/20">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-success-fg"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span className="text-sm font-medium text-success-fg">
              Thanks! We&apos;ll be in touch.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full sm:flex-1 px-4 py-2.5 rounded-lg border border-border-primary bg-bg-card text-text-primary text-sm placeholder:text-text-tertiary focus:border-accent-border focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-brand text-white text-sm font-medium hover:opacity-90 transition-opacity shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-text-tertiary text-xs mt-4">
          Or reach us at{" "}
          <a
            href="mailto:contact@dojops.ai"
            className="text-accent-text hover:text-text-primary transition-colors"
          >
            contact@dojops.ai
          </a>
        </p>
      </div>
    </section>
  );
}
