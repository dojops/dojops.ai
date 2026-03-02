import Image from "next/image";
import TerminalDemo from "./TerminalDemo";
import { LINKS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-24 pb-20">
      {/* Gradient orbs — contained so they don't cause overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-neon-cyan/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-neon-cyan/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto">
        {/* Logo */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.08)_0%,transparent_70%)]" />
          <Image
            src="/icons/dojops-3d-icon.png"
            alt="DojOps Logo"
            width={180}
            height={180}
            priority
            className="relative drop-shadow-[0_0_50px_rgba(0,229,255,0.3)]"
          />
        </div>

        {/* Badge under logo */}
        <div className="badge-shimmer inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/15 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-[10px] sm:text-xs font-medium text-neon-cyan/90 tracking-wide uppercase">
            AI DevOps Engine
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[1.75rem] sm:text-5xl lg:text-[3.5rem] font-bold mb-6 tracking-tight leading-[1.15] px-2">
          From prompt to production
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base lg:text-lg text-text-secondary max-w-lg mb-10 leading-relaxed px-2">
          Generate. Verify. Secure. Apply. All sandboxed. All auditable
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-14 sm:mb-16">
          <a
            href="#install"
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-neon-cyan/10 border border-neon-cyan/25 text-neon-cyan text-sm font-medium hover:bg-neon-cyan/15 hover:border-neon-cyan/40 hover:shadow-[0_0_30px_rgba(0,229,255,0.12)] transition-all duration-300"
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
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-glass-border text-text-secondary text-sm hover:text-text-primary hover:border-glass-border-hover transition-all duration-300"
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
