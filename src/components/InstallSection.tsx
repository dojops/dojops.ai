"use client";

import { useState } from "react";
import { INSTALL_COMMANDS } from "@/lib/constants";
import CopyButton from "./CopyButton";
import ScrollReveal from "./ScrollReveal";

const tabs = [
  { key: "npm" as const, label: "npm", comment: "# Install globally via npm" },
  { key: "brew" as const, label: "Homebrew", comment: "# macOS / Linux via Homebrew" },
  { key: "curl" as const, label: "curl", comment: "# One-liner. Works everywhere." },
  {
    key: "docker" as const,
    label: "Docker",
    comment: "# Mount project + config so nothing is lost",
  },
];

const NEXT_STEPS = [
  { step: "01", label: "Configure your LLM provider", cmd: "dojops config" },
  { step: "02", label: "Initialize in your project", cmd: "dojops init" },
  {
    step: "03",
    label: "Describe what you need",
    cmd: 'dojops "Create a Terraform config for S3"',
  },
];

export default function InstallSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof INSTALL_COMMANDS>("npm");

  const activeTabData = tabs.find((t) => t.key === activeTab)!;

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 scroll-mt-20 relative" id="install">
      {/* Ambient glow behind the terminal */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-accent font-mono text-lg">&gt;_</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                Get Started
              </h2>
            </div>
            <div
              className="flex-1 h-px ml-4"
              style={{
                background: "linear-gradient(90deg, var(--accent-border), transparent 80%)",
              }}
            />
          </div>
        </ScrollReveal>

        {/* Terminal window */}
        <ScrollReveal delay={100}>
          <div
            className="rounded-[14px] overflow-hidden shadow-[var(--shadow-lg)]"
            style={{
              border: "1px solid #2a2d37",
              boxShadow:
                "var(--shadow-lg), 0 0 60px -20px color-mix(in srgb, var(--accent) 10%, transparent)",
            }}
          >
            {/* Chrome bar with tabs */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b"
              style={{ background: "#080b11", borderColor: "#1e2028" }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5 mr-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
              </div>

              {/* Tab pills */}
              <div className="flex items-center gap-0.5 bg-[#0f1117] rounded-lg p-0.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="relative px-3 py-1 rounded-md text-[12px] font-medium transition-all duration-200"
                    style={{
                      color: activeTab === tab.key ? "#7dd3fc" : "#5A6478",
                      background: activeTab === tab.key ? "#0c2d48" : "transparent",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal body */}
            <div
              className="p-5 sm:p-6 font-mono text-[13px] text-left"
              style={{ background: "#0c0e14", color: "#E8EDF5" }}
            >
              {/* Comment line */}
              <div className="mb-3" style={{ color: "#4a5568" }}>
                {activeTabData.comment}
              </div>

              {/* Command line with copy button */}
              <div className="flex items-start justify-between gap-4">
                <code className="flex-1 leading-relaxed break-all" style={{ color: "#E8EDF5" }}>
                  <span className="select-none" style={{ color: "#38BDF8" }}>
                    ${" "}
                  </span>
                  {INSTALL_COMMANDS[activeTab]}
                </code>
                <CopyButton text={INSTALL_COMMANDS[activeTab]} className="shrink-0 mt-0.5" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* What's next — connected step flow */}
        <ScrollReveal delay={200}>
          <div className="mt-10 relative">
            <p className="text-text-tertiary text-[10px] tracking-[0.2em] uppercase font-semibold mb-5 flex items-center gap-3">
              <span>What&apos;s next</span>
              <span
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(90deg, var(--border-secondary), transparent 60%)",
                }}
              />
            </p>

            <div className="relative">
              {/* Connecting line */}
              <div
                className="absolute left-[7px] top-3 bottom-3 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--accent-border), var(--border-primary))",
                }}
              />

              <div className="flex flex-col gap-5">
                {NEXT_STEPS.map((s) => (
                  <div key={s.step} className="flex items-start gap-4 group">
                    {/* Dot on the line */}
                    <div
                      className="w-[15px] h-[15px] rounded-full border-2 shrink-0 mt-0.5 transition-colors duration-300"
                      style={{
                        borderColor: "var(--accent-border)",
                        background: "var(--bg-primary)",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-text-secondary text-xs mb-1.5 group-hover:text-text-primary transition-colors">
                        {s.label}
                      </p>
                      <code className="font-mono text-[13px] text-text-primary">
                        <span className="text-accent select-none">$ </span>
                        {s.cmd}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
