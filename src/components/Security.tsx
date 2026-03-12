"use client";

import { useTranslation } from "@/i18n";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

export default function Security() {
  const { t } = useTranslation();

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 bg-bg-secondary relative">
      <ScrollReveal>
        <SectionHeading id="security" title={t.security.title} subtitle={t.security.subtitle} />
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border-primary rounded-xl overflow-hidden border border-border-primary">
          {t.security.items.map((feature, i) => (
            <div
              key={feature.title}
              className="bg-bg-card p-6 hover:bg-bg-card-hover transition-colors duration-300"
            >
              <div className="text-xs text-accent font-mono mb-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-2.5 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-xs leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
