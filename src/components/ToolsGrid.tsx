import Image from "next/image";
import { DEVOPS_TOOLS, LLM_PROVIDERS } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

export default function ToolsGrid() {
  return (
    <section className="py-24 px-4">
      <SectionHeading
        id="tools"
        title="Works With Your Stack"
        subtitle="12 built-in DevOps tools and 6 LLM providers, ready out of the box"
      />
      <div className="max-w-5xl mx-auto space-y-16">
        {/* DevOps Tools */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider text-center mb-8">
            DevOps Tools
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {DEVOPS_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-glass-border bg-surface/50 hover:border-glass-border-hover hover:bg-surface/80 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all cursor-default"
              >
                <Image
                  src={`/icons/tools/${tool.icon}`}
                  alt={tool.name}
                  width={32}
                  height={32}
                  className="icon-tool"
                />
                <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors text-center">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* LLM Providers */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider text-center mb-8">
            LLM Providers
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {LLM_PROVIDERS.map((provider) => (
              <div
                key={provider.name}
                className="group flex flex-col items-center gap-3 cursor-default"
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <Image
                    src={`/icons/providers/${provider.icon}`}
                    alt={provider.name}
                    width={40}
                    height={40}
                    className="object-contain w-10 h-10 icon-provider"
                  />
                </div>
                <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors">
                  {provider.name}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-text-secondary text-sm mt-6">
            Bring your own model. No vendor lock-in. Run fully local with Ollama.
          </p>
        </div>
      </div>
    </section>
  );
}
