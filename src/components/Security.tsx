import { SECURITY_FEATURES } from "@/lib/constants";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

export default function Security() {
  return (
    <section className="py-24 sm:py-32 px-5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/[0.01] to-transparent pointer-events-none" />
      <ScrollReveal>
        <SectionHeading
          id="security"
          title="8 layers of defense"
          subtitle="Enterprise-grade security so compliance teams sign off on AI-generated infrastructure"
        />
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-glass-border/50 rounded-2xl overflow-hidden">
          {SECURITY_FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="bg-[#080b12] p-6 hover:bg-surface-elevated/40 transition-colors duration-300"
            >
              <div className="text-xs text-neon-cyan/60 font-mono mb-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-2.5 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-text-secondary/70 text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
