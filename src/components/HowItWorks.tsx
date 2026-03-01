import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  return (
    <section className="py-24 px-4">
      <SectionHeading
        id="how-it-works"
        title="How It Works"
        subtitle="From natural language to production-ready configs in seconds"
      />
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-gradient-to-r from-neon-cyan/30 via-neon-cyan/50 to-neon-cyan/30" />

          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              {/* Step number */}
              <div className="w-14 h-14 rounded-full border-2 border-neon-cyan/50 bg-bg-deep flex items-center justify-center mb-6 relative z-10">
                <span className="text-neon-cyan font-bold text-lg">
                  {step.step}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4 max-w-xs">
                {step.description}
              </p>

              {step.command && (
                <div className="bg-surface/80 border border-glass-border rounded-lg px-4 py-2 font-mono text-xs text-text-secondary max-w-full overflow-x-auto">
                  <span className="text-neon-cyan">$ </span>
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
