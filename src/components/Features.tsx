import { FEATURES } from "@/lib/constants";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";
import ScrollReveal from "./ScrollReveal";

function FeatureIcon({
  icon,
  size = "normal",
}: Readonly<{ icon: string; size?: "normal" | "large" }>) {
  const cls = size === "large" ? "w-6 h-6" : "w-5 h-5";

  const iconMap: Record<string, React.ReactNode> = {
    brain: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M12 2a7 7 0 0 0-7 7c0 3 1.5 5.5 4 7v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2c2.5-1.5 4-4 4-7a7 7 0 0 0-7-7Z" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    agents: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <circle cx="12" cy="8" r="3" />
        <circle cx="5" cy="17" r="2.5" />
        <circle cx="19" cy="17" r="2.5" />
        <path d="M12 11v2m-4.5 2.5L10 13m4 2.5L14 13" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    plan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="8" y="14" width="7" height="7" rx="1" />
        <path d="M6.5 10v2.5a1 1 0 0 0 1 1H10m4-3.5v2.5a1 1 0 0 1-1 1H11.5" />
      </svg>
    ),
    scan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 8v6m-3-3h6" />
      </svg>
    ),
    plugin: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
        <circle cx="12" cy="12" r="4" />
        <path d="m15 9 2-2m-10 0 2 2m0 6-2 2m10 0-2-2" />
      </svg>
    ),
  };

  const boxSize = size === "large" ? "w-12 h-12" : "w-10 h-10";

  return (
    <div
      className={`${boxSize} rounded-xl bg-accent-subtle border border-accent-border flex items-center justify-center text-accent shrink-0`}
    >
      {iconMap[icon] || null}
    </div>
  );
}

/*
 * Bento layout — 4 columns on lg:
 *   Row 1: featured(3) + normal(1)
 *   Row 2: normal(1) + featured(3)
 *   Row 3: normal(2) + normal(2)
 * No dead space.
 */
const GRID_CLASSES: string[] = [
  "md:col-span-2 lg:col-span-3", // 0: "17 Specialist Agents" — featured
  "md:col-span-1 lg:col-span-1", // 1: "Plan Before You Ship"
  "md:col-span-1 lg:col-span-1", // 2: "Zero Hallucinated YAML"
  "md:col-span-2 lg:col-span-3", // 3: "Every Write is Sandboxed" — featured
  "md:col-span-1 lg:col-span-2", // 4: "10 Scanners"
  "md:col-span-1 lg:col-span-2", // 5: "Build & Share"
];

export default function Features() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5">
      <ScrollReveal>
        <SectionHeading
          id="features"
          title="Built for real infrastructure"
          subtitle="Every step is validated, sandboxed, and logged before anything touches your repo"
        />
      </ScrollReveal>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((feature, i) => (
          <ScrollReveal
            key={feature.title}
            delay={i * 80}
            className={`flex ${GRID_CLASSES[i] || ""}`}
          >
            <GlowCard
              className={`flex-1 flex ${
                feature.featured
                  ? "featured-card flex-col sm:flex-row sm:items-start gap-5"
                  : "flex-col"
              }`}
            >
              <FeatureIcon icon={feature.icon} size={feature.featured ? "large" : "normal"} />
              <div className={feature.featured ? "" : "mt-5"}>
                <h3 className="text-base font-semibold text-text-primary mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </div>
            </GlowCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
