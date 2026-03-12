"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation, SUPPORTED_LOCALES } from "@/i18n";
import type { Locale } from "@/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const current = SUPPORTED_LOCALES.find((l) => l.code === locale)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[12px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
        aria-label="Change language"
      >
        <span className="font-mono">{current.flag}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1.5 min-w-[130px] rounded-lg py-1 z-50 shadow-lg"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
            backdropFilter: "blur(12px)",
          }}
        >
          {SUPPORTED_LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code as Locale);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] transition-colors duration-150 text-left"
              style={{
                color: locale === l.code ? "var(--accent)" : "var(--text-secondary)",
                background: locale === l.code ? "var(--accent-subtle)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (locale !== l.code) e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                if (locale !== l.code) e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <span className="font-mono w-5 text-center">{l.flag}</span>
              <span>{l.label}</span>
              {locale === l.code && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="ml-auto"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
