"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { NAV_ITEMS, LINKS } from "@/lib/constants";

function ThemeToggle() {
  const dark = useSyncExternalStore(
    (cb) => {
      const obs = new MutationObserver(cb);
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => obs.disconnect();
    },
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );

  function toggle() {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-colors"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-bg-card border-b border-border-primary sticky top-0 z-50 dark:backdrop-blur-sm dark:bg-bg-card/95">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/icons/dojops-new-logo-sm.png" alt="DojOps" width={28} height={28} />
          <span className="font-bold text-text-primary tracking-tight">DojOps</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#install"
            className="text-[13px] font-medium px-4 py-1.5 rounded-lg bg-accent text-white hover:bg-accent-hover transition-all duration-200"
          >
            Get Started
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            className="p-2 -mr-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
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
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden animate-slide-down bg-bg-card border-b border-border-primary">
          <div className="px-5 py-5 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-text-secondary hover:text-text-primary transition-colors py-2.5 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-border-primary flex flex-col gap-2">
              <a
                href="#install"
                className="text-sm font-medium px-4 py-2.5 rounded-lg bg-accent text-white text-center hover:bg-accent-hover transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary text-center py-2 hover:text-text-primary transition-colors"
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
