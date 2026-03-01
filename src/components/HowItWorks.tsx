import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  return (
    <section className="py-24 sm:py-32 px-5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/[0.01] to-transparent pointer-events-none" />
      <SectionHeading
        id="how-it-works"
        title="Three steps. Zero YAML."
        subtitle="From natural language to production-ready configs in seconds"
      />
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-neon-cyan/20 via-neon-cyan/40 to-neon-cyan/20" />

          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              {/* Step number */}
              <div className="w-16 h-16 rounded-2xl border border-neon-cyan/20 bg-surface/80 flex items-center justify-center mb-6 relative z-10">
                <span className="text-neon-cyan font-bold text-lg">
                  {String(step.step).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-text-primary mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4 max-w-[280px]">
                {step.description}
              </p>

              {step.command && (
                <div className="bg-surface/80 border border-glass-border rounded-lg px-4 py-2 font-mono text-[11px] text-text-secondary/70 max-w-full overflow-x-auto">
                  <span className="text-neon-cyan/50">$ </span>
                  {step.command}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
