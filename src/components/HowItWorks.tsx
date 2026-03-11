import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 bg-bg-primary">
      <ScrollReveal>
        <SectionHeading
          id="how-it-works"
          title="Three steps. Zero YAML."
          subtitle="From natural language to production-ready configs in seconds"
        />
      </ScrollReveal>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-border-secondary" />

          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 150}>
              <div className="relative flex flex-col items-center text-center group">
                {/* Step number */}
                <div className="w-16 h-16 rounded-xl border border-border-primary bg-bg-card flex items-center justify-center mb-6 relative z-10 group-hover:border-accent-border group-hover:bg-bg-card-hover transition-all duration-300">
                  <span className="text-accent-text font-bold text-lg">
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
                  <div className="bg-bg-card border border-border-primary rounded-lg px-4 py-2 font-mono text-xs text-text-secondary max-w-full overflow-x-auto">
                    <span className="text-text-tertiary">$ </span>
                    {step.command}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
