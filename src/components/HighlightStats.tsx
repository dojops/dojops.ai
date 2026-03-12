"use client";

import { HIGHLIGHT_STATS } from "@/lib/constants";

function StatItem({ value, label }: Readonly<{ value: string; label: string }>) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 shrink-0 cursor-default group">
      <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-accent-text transition-colors duration-300 group-hover:text-accent">
        {value}
      </span>
      <span className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-[0.12em] whitespace-nowrap leading-tight">
        {label}
      </span>
    </div>
  );
}

export default function HighlightStats() {
  // Build items with separators between them, then duplicate for seamless loop
  const items = HIGHLIGHT_STATS.flatMap((stat, i) => {
    const el = <StatItem key={`stat-${stat.label}`} value={stat.value} label={stat.label} />;
    if (i < HIGHLIGHT_STATS.length - 1) {
      return [el, <div key={`sep-${i}`} className="stat-separator" />];
    }
    return [el];
  });

  // Full separator before the duplicate set
  const fullSet = [
    ...items,
    <div key="sep-loop" className="stat-separator" />,
    ...HIGHLIGHT_STATS.flatMap((stat, i) => {
      const el = <StatItem key={`stat-dup-${stat.label}`} value={stat.value} label={stat.label} />;
      if (i < HIGHLIGHT_STATS.length - 1) {
        return [el, <div key={`sep-dup-${i}`} className="stat-separator" />];
      }
      return [el];
    }),
  ];

  return (
    <section className="py-14 sm:py-18 px-5 bg-bg-secondary">
      <div className="max-w-5xl mx-auto">
        <div className="section-divider mb-10" />

        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 z-10"
            style={{
              background: "linear-gradient(to right, var(--bg-secondary), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 z-10"
            style={{
              background: "linear-gradient(to left, var(--bg-secondary), transparent)",
            }}
          />

          <div className="marquee-track py-2">{fullSet}</div>
        </div>

        <div className="section-divider mt-10" />
      </div>
    </section>
  );
}
