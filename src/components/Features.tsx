import { FEATURES } from "@/lib/constants";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";

function FeatureIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    brain: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2a7 7 0 0 0-7 7c0 3 1.5 5.5 4 7v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2c2.5-1.5 4-4 4-7a7 7 0 0 0-7-7Z" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    agents: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="8" r="3" />
        <circle cx="5" cy="17" r="2.5" />
        <circle cx="19" cy="17" r="2.5" />
        <path d="M12 11v2m-4.5 2.5L10 13m4 2.5L14 13" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    plan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="8" y="14" width="7" height="7" rx="1" />
        <path d="M6.5 10v2.5a1 1 0 0 0 1 1H10m4-3.5v2.5a1 1 0 0 1-1 1H11.5" />
      </svg>
    ),
    scan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 8v6m-3-3h6" />
      </svg>
    ),
    plugin: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
        <circle cx="12" cy="12" r="4" />
        <path d="m15 9 2-2m-10 0 2 2m0 6-2 2m10 0-2-2" />
      </svg>
    ),
  };

  return (
    <div className="w-12 h-12 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan mb-4">
      {iconMap[icon] || null}
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-24 px-4">
      <SectionHeading
        id="features"
        title="Everything You Need to Ship Safely"
        subtitle="From generation to execution, every step is validated, sandboxed, and auditable"
      />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature) => (
          <GlowCard key={feature.title}>
            <FeatureIcon icon={feature.icon} />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {feature.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {feature.description}
            </p>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}
