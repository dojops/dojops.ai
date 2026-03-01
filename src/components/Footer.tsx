import Image from "next/image";
import { LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-glass-border">
      {/* Final CTA */}
      <div className="py-16 sm:py-20 px-5 text-center">
        <p className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 tracking-tight">
          Ready to stop writing YAML by hand?
        </p>
        <p className="text-text-secondary text-sm mb-8 max-w-md mx-auto">
          Install DojOps in seconds. Open source, zero telemetry, runs anywhere.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#install"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-neon-cyan/10 border border-neon-cyan/25 text-neon-cyan text-sm font-medium hover:bg-neon-cyan/15 hover:border-neon-cyan/40 transition-all duration-300"
          >
            Get Started
          </a>
          <a
            href={LINKS.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-glass-border text-text-secondary text-sm hover:text-text-primary hover:border-glass-border-hover transition-all duration-300"
          >
            Read the Docs
          </a>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-glass-border py-10 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Image
              src="/icons/official-dojops-icon.png"
              alt="DojOps"
              width={20}
              height={20}
              className="opacity-60"
            />
            <span className="text-xs text-text-secondary/60">
              &copy; {new Date().getFullYear()} DojOps &middot; MIT License
            </span>
          </div>

          <div className="flex items-center gap-6">
            {[
              { label: "GitHub", href: LINKS.github },
              { label: "npm", href: LINKS.npm },
              { label: "Docs", href: LINKS.docs },
              { label: "Hub", href: LINKS.hub },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-secondary/50 hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
