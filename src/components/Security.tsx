import { SECURITY_FEATURES } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

export default function Security() {
  return (
    <section className="py-24 sm:py-32 px-5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/[0.01] to-transparent pointer-events-none" />
      <SectionHeading
        id="security"
        title="8 layers of defense"
        subtitle="Enterprise-grade security so compliance teams sign off on AI-generated infrastructure"
      />
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-glass-border/50 rounded-2xl overflow-hidden">
        {SECURITY_FEATURES.map((feature, i) => (
          <div
            key={feature.title}
            className="bg-[#080b12] p-6 hover:bg-surface-elevated/40 transition-colors duration-300"
          >
            <div className="text-[10px] text-neon-cyan/40 font-mono mb-2">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="text-[13px] font-semibold text-text-primary mb-2.5 tracking-tight">
              {feature.title}
            </h3>
            <p className="text-text-secondary/60 text-xs leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
