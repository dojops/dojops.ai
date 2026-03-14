"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { useTranslation, SUPPORTED_LOCALES } from "@/i18n";
import type { Locale } from "@/i18n";

const FLAGS: Record<Locale, ReactNode> = {
  en: (
    <svg width="20" height="14" viewBox="0 0 60 42" className="rounded-[2px]">
      <rect width="60" height="42" fill="#012169" />
      <path d="M0,0 L60,42 M60,0 L0,42" stroke="#FFF" strokeWidth="7" />
      <path d="M0,0 L60,42 M60,0 L0,42" stroke="#C8102E" strokeWidth="4" clipPath="url(#ukClip)" />
      <clipPath id="ukClip">
        <path d="M30,0 L30,21 L0,21 L0,0 Z M30,42 L30,21 L60,21 L60,42 Z" />
      </clipPath>
      <path d="M30,0 V42 M0,21 H60" stroke="#FFF" strokeWidth="10" />
      <path d="M30,0 V42 M0,21 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  ),
  fr: (
    <svg width="20" height="14" viewBox="0 0 60 42" className="rounded-[2px]">
      <rect width="20" height="42" fill="#002395" />
      <rect x="20" width="20" height="42" fill="#FFF" />
      <rect x="40" width="20" height="42" fill="#ED2939" />
    </svg>
  ),
  zh: (
    <svg width="20" height="14" viewBox="0 0 60 42" className="rounded-[2px]">
      <rect width="60" height="42" fill="#DE2910" />
      <g fill="#FFDE00" transform="translate(10,8)">
        <polygon points="0,-6 1.76,-1.85 6.18,-1.85 2.47,0.93 3.8,5.71 0,2.85 -3.8,5.71 -2.47,0.93 -6.18,-1.85 -1.76,-1.85" />
      </g>
      <g fill="#FFDE00" transform="translate(20,3)">
        <polygon points="0,-2.5 0.73,-0.77 2.57,-0.77 1.03,0.39 1.58,2.38 0,1.19 -1.58,2.38 -1.03,0.39 -2.57,-0.77 -0.73,-0.77" />
      </g>
      <g fill="#FFDE00" transform="translate(23,8)">
        <polygon points="0,-2.5 0.73,-0.77 2.57,-0.77 1.03,0.39 1.58,2.38 0,1.19 -1.58,2.38 -1.03,0.39 -2.57,-0.77 -0.73,-0.77" />
      </g>
      <g fill="#FFDE00" transform="translate(23,14)">
        <polygon points="0,-2.5 0.73,-0.77 2.57,-0.77 1.03,0.39 1.58,2.38 0,1.19 -1.58,2.38 -1.03,0.39 -2.57,-0.77 -0.73,-0.77" />
      </g>
      <g fill="#FFDE00" transform="translate(20,19)">
        <polygon points="0,-2.5 0.73,-0.77 2.57,-0.77 1.03,0.39 1.58,2.38 0,1.19 -1.58,2.38 -1.03,0.39 -2.57,-0.77 -0.73,-0.77" />
      </g>
    </svg>
  ),
};

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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[12px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
        aria-label="Change language"
      >
        {FLAGS[locale]}
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
          className="absolute right-0 top-full mt-1.5 min-w-[150px] rounded-lg py-1 z-50 shadow-lg"
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
              <span className="flex-shrink-0">{FLAGS[l.code]}</span>
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
