"use client";

import { useRef, useEffect, useState } from "react";
import {
  MessageSquare,
  GitBranch,
  LayoutList,
  Code,
  ShieldCheck,
  Play,
  FileCheck,
} from "lucide-react";
import { PIPELINE_OVERVIEW_STEPS } from "@/lib/constants";
import { useTranslation } from "@/i18n";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  GitBranch,
  LayoutList,
  Code,
  ShieldCheck,
  Play,
  FileCheck,
};

const STEP_DELAY_MS = 500;
const TOTAL_STEPS = PIPELINE_OVERVIEW_STEPS.length;
const HOLD_MS = 2500;
const RESET_GAP_MS = 400;

export default function HowItWorks() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  // Observe viewport entry
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sequential step activation + loop (flat tick model, no nested timers)
  useEffect(() => {
    if (!inView) return;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    let current = 0;

    function tick() {
      if (cancelled) return;
      if (current < TOTAL_STEPS) {
        setActiveStep(current);
        current += 1;
        timer = setTimeout(tick, STEP_DELAY_MS);
      } else {
        // All steps lit — hold, then reset
        timer = setTimeout(reset, HOLD_MS);
      }
    }

    function reset() {
      if (cancelled) return;
      setActiveStep(-1);
      current = 0;
      timer = setTimeout(tick, RESET_GAP_MS);
    }

    timer = setTimeout(tick, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [inView]);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 lg:py-32 px-5 bg-bg-primary">
      <ScrollReveal>
        <SectionHeading id="how-it-works" title={t.pipeline.title} subtitle={t.pipeline.subtitle} />
      </ScrollReveal>

      {/* Desktop: horizontal pipeline (md+) */}
      <div className="hidden md:block max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="flex items-start justify-center">
            {PIPELINE_OVERVIEW_STEPS.map((step, i) => {
              const Icon = ICON_MAP[step.icon];
              const translated = t.pipeline.steps[i];
              const isActive = i <= activeStep;
              const isCurrent = i === activeStep;
              const showConnector = i < TOTAL_STEPS - 1;
              const connectorActive = i < activeStep;

              return (
                <div key={step.icon} className="flex items-start flex-1 min-w-0">
                  {/* Step */}
                  <div className="flex flex-col items-center text-center w-full">
                    {/* Step number */}
                    <div
                      className="text-[10px] font-mono font-bold mb-2 transition-colors duration-400"
                      style={{
                        color: isActive ? "var(--accent-text)" : "var(--text-tertiary)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Icon circle */}
                    <div
                      className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center mb-3"
                      style={{
                        borderColor: isActive ? "var(--accent)" : "var(--border-primary)",
                        backgroundColor: isActive ? "var(--accent-subtle)" : "var(--bg-card)",
                        boxShadow: isCurrent
                          ? "0 0 20px color-mix(in srgb, var(--accent) 20%, transparent), 0 0 40px color-mix(in srgb, var(--accent) 8%, transparent)"
                          : isActive
                            ? "0 0 12px color-mix(in srgb, var(--accent) 10%, transparent)"
                            : "none",
                        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        transform: isCurrent ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      {Icon && (
                        <span
                          className="transition-colors duration-400"
                          style={{
                            color: isActive ? "var(--accent)" : "var(--text-tertiary)",
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </span>
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className="text-sm font-semibold mb-1 tracking-tight transition-colors duration-400"
                      style={{
                        color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      }}
                    >
                      {translated?.label ?? step.label}
                    </span>

                    {/* Description */}
                    <span
                      className="text-[11px] leading-snug max-w-[110px] transition-colors duration-400"
                      style={{
                        color: isActive ? "var(--text-secondary)" : "var(--text-tertiary)",
                      }}
                    >
                      {translated?.description ?? step.description}
                    </span>
                  </div>

                  {/* Connector line */}
                  {showConnector && (
                    <div
                      className="flex items-center shrink-0 px-0.5"
                      style={{ height: 72, paddingTop: 26 }}
                    >
                      <div
                        className="pipeline-connector rounded-full"
                        style={{
                          width: 28,
                          backgroundSize: connectorActive ? "100% 100%" : "0% 100%",
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>

      {/* Mobile: vertical timeline (<md) */}
      <div className="md:hidden max-w-sm mx-auto">
        <ScrollReveal>
          <div className="relative pl-12">
            {/* Vertical line */}
            <div
              className="absolute left-[18px] top-1 bottom-1 w-px rounded-full"
              style={{ backgroundColor: "var(--border-secondary)" }}
            />

            {PIPELINE_OVERVIEW_STEPS.map((step, i) => {
              const Icon = ICON_MAP[step.icon];
              const translated = t.pipeline.steps[i];
              const isActive = i <= activeStep;
              const isCurrent = i === activeStep;

              return (
                <div key={step.icon} className="relative flex items-start gap-4 mb-7 last:mb-0">
                  {/* Circle on the line */}
                  <div
                    className="absolute -left-12 w-9 h-9 rounded-xl border-2 flex items-center justify-center z-10"
                    style={{
                      borderColor: isActive ? "var(--accent)" : "var(--border-primary)",
                      backgroundColor: isActive ? "var(--accent-subtle)" : "var(--bg-card)",
                      boxShadow: isCurrent
                        ? "0 0 16px color-mix(in srgb, var(--accent) 20%, transparent)"
                        : "none",
                      transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {Icon && (
                      <span
                        className="transition-colors duration-400"
                        style={{
                          color: isActive ? "var(--accent)" : "var(--text-tertiary)",
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <span
                      className="text-sm font-semibold tracking-tight transition-colors duration-400"
                      style={{
                        color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      }}
                    >
                      {translated?.label ?? step.label}
                    </span>
                    <p
                      className="text-xs leading-relaxed mt-0.5 transition-colors duration-400"
                      style={{
                        color: isActive ? "var(--text-secondary)" : "var(--text-tertiary)",
                      }}
                    >
                      {translated?.description ?? step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
