import Image from "next/image";
import { LLM_PROVIDERS } from "@/lib/constants";
import SectionHeading from "./SectionHeading";

export default function Providers() {
  return (
    <section className="py-24 px-4">
      <SectionHeading
        title="6 LLM Providers"
        subtitle="Bring your own model. No vendor lock-in."
      />
      <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-12">
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
    </section>
  );
}
