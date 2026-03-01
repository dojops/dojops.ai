"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_ITEMS } from "@/lib/constants";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-deep/80 backdrop-blur-xl border-b border-glass-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Image
            src="/icons/official-dojops-icon.png"
            alt="DojOps"
            width={32}
            height={32}
            className="group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] transition-all"
          />
          <span className="font-bold text-lg text-text-primary">DojOps</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-neon-cyan transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-text-secondary hover:text-neon-cyan transition-colors"
              >
                {item.label}
              </a>
            )
          )}
          <a
            href="#install"
            className="text-sm font-medium px-4 py-2 rounded-lg border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan/60 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all"
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-secondary hover:text-neon-cyan transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-deep/95 backdrop-blur-xl border-b border-glass-border">
          <div className="px-4 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-text-secondary hover:text-neon-cyan transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#install"
              className="text-sm font-medium px-4 py-2 rounded-lg border border-neon-cyan/30 text-neon-cyan text-center hover:bg-neon-cyan/10 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
