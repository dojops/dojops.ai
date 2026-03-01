"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_ITEMS, LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg-deep/70 backdrop-blur-2xl border-b border-glass-border shadow-[0_1px_40px_rgba(0,229,255,0.03)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <Image
            src="/icons/official-dojops-icon.png"
            alt="DojOps"
            width={28}
            height={28}
            className="group-hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.6)] transition-all duration-300"
          />
          <span className="font-semibold text-text-primary tracking-tight">DojOps</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#install"
            className="text-[13px] font-medium px-4 py-1.5 rounded-lg border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/8 hover:border-neon-cyan/40 transition-all duration-300"
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 -mr-2 rounded-lg text-text-secondary hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden mobile-drawer-enter bg-bg-deep/95 backdrop-blur-2xl border-b border-glass-border">
          <div className="px-5 py-5 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-text-secondary hover:text-text-primary transition-colors py-2.5 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-glass-border flex flex-col gap-2">
              <a
                href="#install"
                className="text-sm font-medium px-4 py-2.5 rounded-lg border border-neon-cyan/20 text-neon-cyan text-center hover:bg-neon-cyan/8 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary text-center py-2"
                onClick={() => setMobileOpen(false)}
              >
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
