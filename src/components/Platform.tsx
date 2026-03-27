"use client";

import { PLATFORM_PRODUCTS } from "@/lib/constants";
import { useTranslation } from "@/i18n";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";
import ScrollReveal from "./ScrollReveal";

function ProductIcon({ icon }: Readonly<{ icon: string }>) {
  const icons: Record<string, React.ReactNode> = {
    terminal: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="m7 9 3 3-3 3" />
        <path d="M13 15h4" />
      </svg>
    ),
    bot: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <rect x="3" y="8" width="18" height="12" rx="2" />
        <path d="M12 8V5" />
        <circle cx="12" cy="3" r="2" />
        <circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none" />
        <path d="M9 18h6" />
      </svg>
    ),
    browser: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M2 9h20" />
        <circle cx="5.5" cy="6" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="8" cy="6" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="10.5" cy="6" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  };

  return (
    <div className="w-12 h-12 rounded-xl bg-accent-subtle border border-accent-border flex items-center justify-center text-accent shrink-0">
      {icons[icon] || null}
    </div>
  );
}

function FeatureItem({ text }: Readonly<{ text: string }>) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-4 h-4 text-accent shrink-0 mt-0.5"
      >
        <path d="m5 12 5 5L20 7" />
      </svg>
      {text}
    </li>
  );
}

export default function Platform() {
  const { t } = useTranslation();

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5" id="platform">
      <ScrollReveal>
        <SectionHeading
          id="platform-heading"
          title={t.platform.title}
          subtitle={t.platform.subtitle}
        />
      </ScrollReveal>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PLATFORM_PRODUCTS.map((product, i) => {
          const translated = t.platform.items[i];
          return (
            <ScrollReveal
              key={product.id}
              delay={i * 100}
              className={`flex ${product.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <GlowCard
                className={`flex-1 flex flex-col relative ${product.featured ? "featured-card" : ""}`}
              >
                {(translated?.badge || product.badge) && (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.08em] uppercase bg-accent-subtle border border-accent-border text-accent-text">
                    <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                    {translated?.badge || product.badge}
                  </span>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <ProductIcon icon={product.icon} />
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary tracking-tight">
                      {translated?.title ?? product.title}
                    </h3>
                    <p className="text-sm text-text-secondary mt-0.5">
                      {translated?.tagline ?? product.tagline}
                    </p>
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {(translated?.features ?? product.features).map((feature) => (
                    <FeatureItem key={feature} text={feature} />
                  ))}
                </ul>

                <a
                  href={product.cta.href}
                  {...(product.cta.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-accent-text hover:text-accent transition-colors mt-auto py-1"
                >
                  {translated?.ctaLabel ?? product.cta.label}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-0.5 transition-transform"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </GlowCard>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
