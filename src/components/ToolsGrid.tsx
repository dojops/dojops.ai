import Image from "next/image";
import { DEVOPS_TOOLS, LLM_PROVIDERS } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

export default function ToolsGrid() {
  return (
    <section className="py-24 sm:py-32 px-5">
      <SectionHeading
        id="tools"
        title="Your tools. Your models."
        subtitle="12 built-in DevOps tools and 6 LLM providers, ready out of the box"
      />
      <div className="max-w-5xl mx-auto space-y-20">
        {/* DevOps Tools */}
        <div>
          <p className="text-[11px] font-medium text-text-secondary/60 uppercase tracking-[0.15em] text-center mb-8">
            DevOps Tools
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {DEVOPS_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-glass-border bg-surface/40 hover:border-glass-border-hover hover:bg-surface/70 transition-all duration-300 cursor-default"
              >
                <Image
                  src={`/icons/tools/${tool.icon}`}
                  alt={tool.name}
                  width={28}
                  height={28}
                  className="icon-tool"
                />
                <span className="text-[11px] text-text-secondary/70 group-hover:text-text-primary transition-colors text-center leading-tight">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* LLM Providers */}
        <div>
          <p className="text-[11px] font-medium text-text-secondary/60 uppercase tracking-[0.15em] text-center mb-8">
            LLM Providers
          </p>
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
                <span className="text-[11px] text-text-secondary/60 group-hover:text-text-primary transition-colors">
                  {provider.name}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-text-secondary/60 text-xs mt-8">
            Bring your own model. No vendor lock-in. Run fully local with Ollama.
          </p>
        </div>
      </div>
    </section>
  );
}
