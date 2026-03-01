import Image from "next/image";
import CopyButton from "./CopyButton";
import TerminalDemo from "./TerminalDemo";
import { INSTALL_COMMANDS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16">
      {/* Radial glow behind logo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Logo */}
        <Image
          src="/logo/official-dojops-logo.png"
          alt="DojOps Logo"
          width={160}
          height={160}
          priority
          className="mb-8 drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]"
        />

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-text-primary via-neon-cyan to-text-primary bg-clip-text text-transparent leading-tight">
          DevOps configs from English,
          <br />
          not from scratch.
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed">
          DojOps generates, validates, and applies infrastructure & CI/CD
          configurations using AI &mdash; with sandboxed execution, approval
          workflows, and tamper-proof audit trails.
        </p>

        {/* Install command */}
        <div className="flex items-center gap-3 bg-surface/80 border border-glass-border rounded-lg px-5 py-3 font-mono text-sm mb-4 backdrop-blur-sm hover:border-glass-border-hover transition-colors group">
          <span className="text-neon-cyan">$</span>
          <code className="text-text-primary">{INSTALL_COMMANDS.npm}</code>
          <CopyButton text={INSTALL_COMMANDS.npm} />
        </div>

        <p className="text-text-secondary text-xs mb-12">
          Also available via{" "}
          <a href="#install" className="text-neon-cyan hover:underline">
            curl or Docker
          </a>
        </p>

        {/* Terminal demo */}
        <TerminalDemo />
      </div>
    </section>
  );
}
