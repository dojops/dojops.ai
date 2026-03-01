"use client";

import { useState } from "react";
import { INSTALL_COMMANDS } from "@/lib/constants";
import CopyButton from "./CopyButton";

const tabs = [
  { key: "npm" as const, label: "npm", comment: "# Install globally via npm" },
  { key: "curl" as const, label: "curl", comment: "# One-liner. Works everywhere." },
  { key: "docker" as const, label: "Docker", comment: "# Mount project + config so nothing is lost" },
];

export default function InstallSection() {
  const [activeTab, setActiveTab] =
    useState<keyof typeof INSTALL_COMMANDS>("npm");

  const activeTabData = tabs.find((t) => t.key === activeTab)!;

  return (
    <section className="py-24 sm:py-32 px-5 scroll-mt-20" id="install">
      <div className="max-w-2xl mx-auto">
        {/* Section title */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-neon-cyan text-xl font-mono">&gt;</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Get Started
          </h2>
        </div>

        {/* Terminal window */}
        <div className="rounded-2xl overflow-hidden border border-glass-border bg-[#080b12] shadow-[0_0_80px_rgba(0,229,255,0.04)]">
          {/* Chrome bar with tabs */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0c1018] border-b border-glass-border">
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
                      ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
                      : "text-text-secondary/60 hover:text-text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-5 sm:p-6 font-mono text-[13px] text-left">
            {/* Comment line */}
            <div className="text-text-secondary/60 mb-3">
              {activeTabData.comment}
            </div>

            {/* Command line with copy button */}
            <div className="flex items-start justify-between gap-4">
              <code className="text-text-primary flex-1 leading-relaxed break-all">
                <span className="text-neon-cyan/60 select-none">$ </span>
                {INSTALL_COMMANDS[activeTab]}
              </code>
              <CopyButton
                text={INSTALL_COMMANDS[activeTab]}
                className="shrink-0 mt-0.5"
              />
            </div>
          </div>
        </div>

        {/* What's next — step flow */}
        <div className="mt-8 pl-1">
          <p className="text-text-secondary/70 text-xs tracking-wide uppercase font-medium mb-4">
            What&apos;s next
          </p>
          <div className="flex flex-col gap-4">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <span className="text-[10px] text-neon-cyan/70 font-mono mt-0.5 shrink-0 w-4">01</span>
              <div>
                <p className="text-text-secondary/70 text-xs mb-1">Configure your LLM provider</p>
                <code className="font-mono text-[13px] text-text-primary/80">
                  <span className="text-neon-cyan/60 select-none">$ </span>
                  dojops config
                </code>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <span className="text-[10px] text-neon-cyan/70 font-mono mt-0.5 shrink-0 w-4">02</span>
              <div>
                <p className="text-text-secondary/70 text-xs mb-1">Initialize in your project</p>
                <code className="font-mono text-[13px] text-text-primary/80">
                  <span className="text-neon-cyan/60 select-none">$ </span>
                  dojops init
                </code>
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <span className="text-[10px] text-neon-cyan/70 font-mono mt-0.5 shrink-0 w-4">03</span>
              <div>
                <p className="text-text-secondary/70 text-xs mb-1">Describe what you need</p>
                <code className="font-mono text-[13px] text-text-primary/80">
                  <span className="text-neon-cyan/60 select-none">$ </span>
                  dojops &quot;Create a Terraform config for S3&quot;
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
