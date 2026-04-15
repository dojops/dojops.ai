"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/i18n";

const TYPING_SPEED = 65; // ms per character
const BRAND_DELAY = 80; // slight pause before "production"

export default function TypingHeadline() {
  const { t } = useTranslation();
  const fullText = t.hero.headlinePart1;
  const brandText = t.hero.headlinePart2;

  const [charIndex, setCharIndex] = useState(0);
  const totalChars = fullText.length + brandText.length;
  const done = charIndex >= totalChars;

  useEffect(() => {
    if (done) return;

    // Small pause before starting the brand word
    const delay = charIndex === fullText.length ? BRAND_DELAY : TYPING_SPEED;
    const timer = setTimeout(() => setCharIndex((i) => i + 1), delay);
    return () => clearTimeout(timer);
  }, [charIndex, done, fullText.length]);

  const plainVisible = fullText.slice(0, Math.min(charIndex, fullText.length));
  const brandVisible =
    charIndex > fullText.length ? brandText.slice(0, charIndex - fullText.length) : "";

  return (
    <h1
      className="font-bold mb-6 tracking-tight leading-[1.15] px-2"
      style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}
      aria-label={`${fullText}${brandText}`}
    >
      <span className="text-text-primary">{plainVisible}</span>
      <span style={{ color: "#3b82f6" }}>{brandVisible}</span>
      {!done && (
        <span className="text-accent" style={{ animation: "blink 1s step-end infinite" }}>
          |
        </span>
      )}
    </h1>
  );
}
