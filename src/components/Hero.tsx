import Image from "next/image";
import TerminalDemo from "./TerminalDemo";
import { LINKS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="ambient-glow bg-bg-primary relative min-h-screen flex flex-col items-center justify-center px-5 pt-24 pb-20">
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto">
        {/* Logo */}
        <div className="relative mb-6 flex items-center justify-center">
          <Image
            src="/icons/dojops-new-icon.png"
            alt="DojOps Logo"
            width={180}
            height={180}
            priority
            className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] lg:w-[180px] lg:h-[180px]"
          />
        </div>

        {/* Badge under logo */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-border bg-accent-subtle mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] sm:text-xs font-medium text-accent-text tracking-wide uppercase">
            AI DevOps Engine
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-bold mb-6 tracking-tight leading-[1.15] px-2"
          style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}
        >
          <span className="text-text-primary">From prompt to </span>
          <span className="text-gradient-brand">production</span>
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base lg:text-lg text-text-secondary max-w-lg mb-10 leading-relaxed px-2">
          Generate. Verify. Secure. Apply. All sandboxed. All auditable
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-14 sm:mb-16">
          <a
            href="#install"
            className="group inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-hover rounded-md px-5 py-2.5 shadow-[var(--shadow-sm)] font-medium text-sm transition-all"
          >
            Get Started
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-bg-card text-text-primary border border-border-primary hover:bg-bg-card-hover rounded-md px-5 py-2.5 text-sm transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Terminal demo */}
        <TerminalDemo />
      </div>
    </section>
  );
}
