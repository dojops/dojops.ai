"use client";

import { useState } from "react";
import { INSTALL_COMMANDS, LINKS } from "@/lib/constants";
import SectionHeading from "./SectionHeading";
import CopyButton from "./CopyButton";

const tabs = [
  { key: "npm" as const, label: "npm" },
  { key: "curl" as const, label: "curl" },
  { key: "docker" as const, label: "Docker" },
];

export default function InstallSection() {
  const [activeTab, setActiveTab] =
    useState<keyof typeof INSTALL_COMMANDS>("npm");

  return (
    <section className="py-24 px-4" id="install">
      <SectionHeading
        title="Get Started in Seconds"
        subtitle="Pick your preferred method and start generating configs"
      />
      <div className="max-w-2xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-glass-border mb-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-sm font-medium transition-all relative ${
                activeTab === tab.key
                  ? "text-neon-cyan"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-neon-cyan" />
              )}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div className="bg-surface/80 border border-glass-border border-t-0 rounded-b-xl p-6 font-mono text-sm">
          <div className="flex items-center justify-between gap-4">
            <code className="text-text-primary overflow-x-auto whitespace-nowrap flex-1">
              <span className="text-neon-cyan select-none">$ </span>
              {INSTALL_COMMANDS[activeTab]}
            </code>
            <CopyButton
              text={INSTALL_COMMANDS[activeTab]}
              className="shrink-0"
            />
          </div>
        </div>

        {/* Next steps */}
        <div className="text-center mt-8 space-y-3">
          <p className="text-text-secondary text-sm">
            Then configure your provider and go:
          </p>
          <div className="inline-flex flex-col gap-1 font-mono text-xs text-text-secondary">
            <code>
              <span className="text-neon-cyan select-none">$ </span>
              dojops config
            </code>
            <code>
              <span className="text-neon-cyan select-none">$ </span>
              dojops &quot;Create a Terraform config for S3&quot;
            </code>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <a
            href={LINKS.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-neon-cyan transition-colors"
          >
            Read the docs &rarr;
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-neon-cyan transition-colors"
          >
            View on GitHub &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
