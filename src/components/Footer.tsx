import Image from "next/image";
import { LINKS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-primary">
      {/* Final CTA */}
      <ScrollReveal>
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-accent border border-accent text-white text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            >
              Get Started
            </a>
            <a
              href={LINKS.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border-primary text-text-secondary text-sm hover:text-text-primary hover:border-border-secondary transition-all duration-300"
            >
              Read the Docs
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* Links */}
      <div className="border-t border-border-primary py-10 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Image
              src="/icons/dojops-new-logo-sm.png"
              alt="DojOps"
              width={20}
              height={20}
              className="opacity-60"
            />
            <span className="text-xs text-text-secondary">
              &copy; {new Date().getFullYear()} DojOps &middot; MIT License &middot; Created by{" "}
              <a
                href="https://github.com/MHChlagou"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-text hover:text-text-primary transition-colors duration-200"
              >
                Mohamed Hedi CHLAGOU
              </a>
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
                className="text-xs text-accent-text hover:text-text-primary transition-colors duration-200"
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
