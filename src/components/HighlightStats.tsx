import { HIGHLIGHT_STATS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

export default function HighlightStats() {
  return (
    <section className="py-16 sm:py-20 px-5 bg-bg-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="section-divider mb-12" />
        <ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-6">
            {HIGHLIGHT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 group cursor-default"
              >
                <span className="text-2xl sm:text-3xl font-bold text-text-primary group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs text-text-secondary tracking-wide uppercase text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <div className="section-divider mt-12" />
      </div>
    </section>
  );
}
