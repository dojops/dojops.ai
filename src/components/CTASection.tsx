"use client";

import { useState } from "react";
import { LINKS } from "@/lib/constants";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const hubUrl = process.env.NEXT_PUBLIC_HUB_URL || LINKS.hub;
      const res = await fetch(`${hubUrl}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setStatus("success");
      } else if (res.status === 200) {
        setStatus("already");
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
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="relative rounded-2xl bg-[#0d1117] p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
          {/* Gradient glow border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#06b6d4]/20 via-[#3b82f6]/10 to-[#d946ef]/20 pointer-events-none" />
          <div className="absolute inset-px rounded-[15px] bg-[#0d1117] pointer-events-none" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-brand text-white text-[10px] sm:text-xs font-medium tracking-wide uppercase mb-6">
              Stay in the loop
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
              Get updates on DojOps
            </h2>
            <p className="text-[#8b95a8] text-sm sm:text-base leading-relaxed mb-10 max-w-lg mx-auto">
              New modules, provider integrations, and releases — straight to your inbox. No spam,
              unsubscribe anytime.
            </p>

            {status === "success" || status === "already" ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-emerald-400"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-sm font-medium text-emerald-400">
                  {status === "success"
                    ? "Welcome aboard! Check your inbox."
                    : "You\u2019re already subscribed!"}
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch gap-3 max-w-xl mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  disabled={status === "loading"}
                  className="flex-1 px-5 py-3.5 rounded-xl border border-[#2a2d37] bg-[#161921] text-white text-sm placeholder:text-[#5a6478] focus:border-[#38bdf8] focus:outline-none transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-8 py-3.5 rounded-xl bg-gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity shrink-0 disabled:opacity-50"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
                {status === "error" && (
                  <p className="text-red-400 text-xs mt-1 sm:mt-0 sm:absolute sm:top-full sm:left-0 sm:right-0 sm:text-center sm:pt-2">
                    {errorMsg}
                  </p>
                )}
              </form>
            )}

            <p className="text-[#5a6478] text-xs mt-6">
              Or reach us at{" "}
              <a
                href="mailto:contact@dojops.ai"
                className="text-[#38bdf8] hover:text-white transition-colors"
              >
                contact@dojops.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
