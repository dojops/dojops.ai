import { HIGHLIGHT_STATS } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

export default function HighlightStats() {
  return (
    <section className="py-16 sm:py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="section-divider mb-12" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8">
          {HIGHLIGHT_STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 80}>
              <div className="flex flex-col items-center gap-1 group cursor-default">
                <span className="text-2xl sm:text-3xl font-bold text-gradient-cyan group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </span>
                <span className="text-xs text-text-secondary/80 tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="section-divider mt-12" />
      </div>
    </section>
  );
}
