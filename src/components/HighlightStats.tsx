import { HIGHLIGHT_STATS } from "@/lib/constants";

export default function HighlightStats() {
  return (
    <section className="py-12 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="section-divider mb-12" />
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-y-8">
          {HIGHLIGHT_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-2xl sm:text-3xl font-bold text-gradient-cyan">
                {stat.value}
              </span>
              <span className="text-[11px] text-text-secondary tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="section-divider mt-12" />
      </div>
    </section>
  );
}
