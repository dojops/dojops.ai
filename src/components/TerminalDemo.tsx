"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useTranslation } from "@/i18n";

const LINE_INTERVAL_S = 0.3;
const INITIAL_DELAY_S = 0.4;
const HOLD_MS = 3000;
const FADE_OUT_MS = 600;

export default function TerminalDemo() {
  const { t } = useTranslation();

  const TERMINAL_LINES = useMemo(
    () => [
      { id: "prompt", type: "prompt" as const, text: t.terminal.prompt },
      { id: "blank-1", type: "info" as const, text: "" },
      { id: "routing", type: "info" as const, text: t.terminal.routing },
      { id: "routed", type: "success" as const, text: t.terminal.routed },
      { id: "blank-2", type: "info" as const, text: "" },
      { id: "decomposing", type: "info" as const, text: t.terminal.decomposing },
      { id: "tasks-planned", type: "success" as const, text: t.terminal.tasksPlanned },
      { id: "blank-3", type: "info" as const, text: "" },
      { id: "task-1", type: "task" as const, text: t.terminal.task1 },
      { id: "task-2", type: "task" as const, text: t.terminal.task2 },
      { id: "task-3", type: "task" as const, text: t.terminal.task3 },
      { id: "blank-4", type: "info" as const, text: "" },
      { id: "done", type: "done" as const, text: t.terminal.ready },
    ],
    [t.terminal],
  );

  const TOTAL_ANIM_MS = (INITIAL_DELAY_S + TERMINAL_LINES.length * LINE_INTERVAL_S) * 1000 + 400;
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [fading, setFading] = useState(false);

  // Observe viewport entry
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Loop: animate in → hold → fade out → reset → repeat
  const scheduleLoop = useCallback(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // After lines finish + hold, start fade-out
    timers.push(
      setTimeout(() => {
        setFading(true);
      }, TOTAL_ANIM_MS + HOLD_MS),
    );

    // After fade-out completes, reset and restart
    timers.push(
      setTimeout(
        () => {
          setFading(false);
          setAnimKey((k) => k + 1);
        },
        TOTAL_ANIM_MS + HOLD_MS + FADE_OUT_MS,
      ),
    );

    return timers;
  }, [TOTAL_ANIM_MS]);

  useEffect(() => {
    if (!inView) return;
    const timers = scheduleLoop();
    return () => timers.forEach(clearTimeout);
  }, [inView, animKey, scheduleLoop]);

  return (
    <div
      ref={containerRef}
      className="terminal w-full max-w-2xl mx-auto overflow-hidden shadow-[var(--shadow-lg)]"
    >
      {/* Terminal chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: "#2A2D37", background: "#0a0d14" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <span className="ml-3 text-[11px] tracking-wider uppercase" style={{ color: "#5A6478" }}>
          dojops
        </span>
      </div>

      {/* Terminal body */}
      <div
        className="p-5 sm:p-6 text-[13px] leading-relaxed overflow-x-auto text-left"
        style={{
          opacity: fading ? 0 : 1,
          transition: fading ? `opacity ${FADE_OUT_MS}ms ease-out` : "none",
        }}
      >
        {TERMINAL_LINES.map((line, i) => {
          const delay = `${INITIAL_DELAY_S + i * LINE_INTERVAL_S}s`;
          const animate = inView;

          if (line.text === "") {
            return (
              <div
                key={`${line.id}-${animKey}`}
                className={animate ? "terminal-line" : ""}
                style={{
                  height: "1rem",
                  opacity: animate ? undefined : 0,
                  animationDelay: animate ? delay : undefined,
                }}
              />
            );
          }

          let colorStyle: React.CSSProperties = { color: "#8B95A8" };
          if (line.type === "prompt") colorStyle = { color: "#E8EDF5" };
          if (line.type === "success") colorStyle = { color: "#34D399" };
          if (line.type === "task") colorStyle = { color: "#8B95A8" };
          if (line.type === "done") colorStyle = { color: "#38BDF8", fontWeight: 500 };

          return (
            <div
              key={`${line.id}-${animKey}`}
              className={`whitespace-pre ${animate ? "terminal-line" : ""}`}
              style={{
                ...colorStyle,
                opacity: animate ? undefined : 0,
                animationDelay: animate ? delay : undefined,
              }}
            >
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
