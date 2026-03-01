import { SECURITY_FEATURES } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

export default function Security() {
  return (
    <section className="py-24 px-4">
      <SectionHeading
        id="security"
        title="Built for Trust"
        subtitle="Defense-in-depth so compliance teams can sign off on AI-generated infrastructure"
      />
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-glass-border rounded-xl overflow-hidden">
        {SECURITY_FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="bg-surface/80 p-6 hover:bg-surface transition-colors"
          >
            <h3 className="text-sm font-semibold text-text-primary mb-2">
              {feature.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
