"use client";

import { useState, useEffect } from "react";

const FULL_TEXT = "From prompt to ";
const BRAND_TEXT = "production";
const TYPING_SPEED = 65; // ms per character
const BRAND_DELAY = 80; // slight pause before "production"

export default function TypingHeadline() {
  const [charIndex, setCharIndex] = useState(0);
  const totalChars = FULL_TEXT.length + BRAND_TEXT.length;
  const done = charIndex >= totalChars;

  useEffect(() => {
    if (done) return;

    // Small pause before starting the brand word
    const delay = charIndex === FULL_TEXT.length ? BRAND_DELAY : TYPING_SPEED;
    const timer = setTimeout(() => setCharIndex((i) => i + 1), delay);
    return () => clearTimeout(timer);
  }, [charIndex, done]);

  const plainVisible = FULL_TEXT.slice(0, Math.min(charIndex, FULL_TEXT.length));
  const brandVisible =
    charIndex > FULL_TEXT.length ? BRAND_TEXT.slice(0, charIndex - FULL_TEXT.length) : "";

  return (
    <h1
      className="font-bold mb-6 tracking-tight leading-[1.15] px-2"
      style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}
      aria-label={`${FULL_TEXT}${BRAND_TEXT}`}
    >
      <span className="text-text-primary">{plainVisible}</span>
      <span className="text-gradient-brand">{brandVisible}</span>
      {!done && (
        <span className="text-accent" style={{ animation: "blink 1s step-end infinite" }}>
          |
        </span>
      )}
    </h1>
  );
}
