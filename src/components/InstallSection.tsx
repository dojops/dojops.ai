"use client";

import { useState } from "react";
import { INSTALL_COMMANDS } from "@/lib/constants";
import CopyButton from "./CopyButton";

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

export default function InstallSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof INSTALL_COMMANDS>("npm");

  const activeTabData = tabs.find((t) => t.key === activeTab)!;

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-5 scroll-mt-20" id="install">
      <div className="max-w-2xl mx-auto">
        {/* Section title */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-accent text-xl font-mono">&gt;</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Get Started
          </h2>
        </div>

        {/* Terminal window */}
        <div className="rounded-[14px] overflow-hidden border border-border-primary shadow-[var(--shadow-md)]">
          {/* Chrome bar with tabs */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b"
            style={{ background: "#0a0d14", borderColor: "#2A2D37" }}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5 mr-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
            </div>

            {/* Tabs in chrome */}
            <div className="flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1 rounded-md text-[12px] font-medium transition-all ${
                    activeTab === tab.key
                      ? "bg-accent-subtle text-accent-text"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                  style={activeTab !== tab.key ? { color: "#8B95A8" } : undefined}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal body */}
          <div
            className="p-5 sm:p-6 font-mono text-[13px] text-left"
            style={{ background: "#0F1117", color: "#E8EDF5" }}
          >
            {/* Comment line */}
            <div className="mb-3" style={{ color: "#5A6478" }}>
              {activeTabData.comment}
            </div>

            {/* Command line with copy button */}
            <div className="flex items-start justify-between gap-4">
              <code className="flex-1 leading-relaxed break-all" style={{ color: "#E8EDF5" }}>
                <span className="select-none" style={{ color: "#38BDF8", opacity: 0.7 }}>
                  ${" "}
                </span>
                {INSTALL_COMMANDS[activeTab]}
              </code>
              <CopyButton text={INSTALL_COMMANDS[activeTab]} className="shrink-0 mt-0.5" />
            </div>
          </div>
        </div>

        {/* What's next — step flow */}
        <div className="mt-8 pl-1">
          <p className="text-text-tertiary text-xs tracking-wide uppercase font-medium mb-4">
            What&apos;s next
          </p>
          <div className="flex flex-col gap-4">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <span className="text-[10px] text-accent font-mono mt-0.5 shrink-0 w-4 opacity-70">
                01
              </span>
              <div>
                <p className="text-text-secondary text-xs mb-1">Configure your LLM provider</p>
                <code className="font-mono text-[13px] text-text-primary">
                  <span className="text-text-tertiary select-none">$</span> dojops config
                </code>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <span className="text-[10px] text-accent font-mono mt-0.5 shrink-0 w-4 opacity-70">
                02
              </span>
              <div>
                <p className="text-text-secondary text-xs mb-1">Initialize in your project</p>
                <code className="font-mono text-[13px] text-text-primary">
                  <span className="text-text-tertiary select-none">$</span> dojops init
                </code>
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <span className="text-[10px] text-accent font-mono mt-0.5 shrink-0 w-4 opacity-70">
                03
              </span>
              <div>
                <p className="text-text-secondary text-xs mb-1">Describe what you need</p>
                <code className="font-mono text-[13px] text-text-primary">
                  <span className="text-text-tertiary select-none">$</span> dojops &quot;Create a
                  Terraform config for S3&quot;
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
