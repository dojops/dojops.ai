import Image from "next/image";
import { DEVOPS_TOOLS, LLM_PROVIDERS } from "@/lib/constants";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

export default function ToolsGrid() {
  return (
    <section className="py-24 sm:py-32 px-5">
      <ScrollReveal>
        <SectionHeading
          id="tools"
          title="Your tools. Your models."
          subtitle="12 built-in DevOps tools and 6 LLM providers, ready out of the box"
        />
      </ScrollReveal>
      <div className="max-w-5xl mx-auto space-y-20">
        {/* DevOps Tools */}
        <div>
          <ScrollReveal>
            <p className="text-xs font-medium text-text-secondary/70 uppercase tracking-[0.15em] text-center mb-8">
              DevOps Tools
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {DEVOPS_TOOLS.map((tool, i) => (
              <ScrollReveal key={tool.name} delay={i * 50}>
                <div className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-glass-border bg-surface/40 hover:border-glass-border-hover hover:bg-surface/70 transition-all duration-300 cursor-default">
                  <Image
                    src={`/icons/tools/${tool.icon}`}
                    alt={tool.name}
                    width={28}
                    height={28}
                    className="icon-tool"
                  />
                  <span className="text-xs text-text-secondary/70 group-hover:text-text-primary transition-colors text-center leading-tight">
                    {tool.name}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* LLM Providers */}
        <div>
          <ScrollReveal>
            <p className="text-xs font-medium text-text-secondary/70 uppercase tracking-[0.15em] text-center mb-8">
              LLM Providers
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
              {LLM_PROVIDERS.map((provider) => (
                <div
                  key={provider.name}
                  className="group flex flex-col items-center gap-3 cursor-default"
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Image
                      src={`/icons/providers/${provider.icon}`}
                      alt={provider.name}
                      width={36}
                      height={36}
                      className="object-contain w-9 h-9 icon-provider"
                    />
                  </div>
                  <span className="text-xs text-text-secondary/70 group-hover:text-text-primary transition-colors">
                    {provider.name}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-center text-text-secondary/70 text-xs mt-8">
              Bring your own model. No vendor lock-in. Run fully local with Ollama.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
