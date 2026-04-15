"use client";

import Image from "next/image";
import { LINKS } from "@/lib/constants";
import { useTranslation } from "@/i18n";
import ScrollReveal from "./ScrollReveal";
import CopyButton from "./CopyButton";
import NpmVersion from "./NpmVersion";

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function NpmIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
    </svg>
  );
}

function DocsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="13" y2="11" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useTranslation();

  const FOOTER_LINKS = {
    [t.footer.product]: [
      { label: t.footer.getStarted, href: "#install" },
      { label: t.footer.features, href: "#features" },
      { label: t.footer.howItWorks, href: "#pipeline" },
      { label: t.footer.skills, href: "#tools" },
    ],
    [t.footer.resources]: [
      { label: t.footer.documentation, href: LINKS.docs, external: true },
      { label: t.footer.hub, href: LINKS.hub, external: true },
      { label: t.footer.npmPackage, href: LINKS.npm, external: true },
      { label: t.footer.pixcot, href: LINKS.pixcot, external: true },
    ],
    [t.footer.community]: [
      { label: t.footer.github, href: LINKS.github, external: true },
      {
        label: t.footer.contributing,
        href: `${LINKS.github}/blob/main/CONTRIBUTING.md`,
        external: true,
      },
      { label: t.footer.issues, href: `${LINKS.github}/issues`, external: true },
      { label: t.footer.contact, href: "/contact" },
    ],
  };

  return (
    <footer className="relative">
      {/* Animated gradient top border */}
      <div className="footer-gradient-border" />

      {/* ── CTA Section ── */}
      <div className="bg-bg-secondary relative overflow-hidden">
        {/* Dot grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.03 }}
        >
          <defs>
            <pattern id="footer-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="var(--text-tertiary)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-dots)" />
        </svg>

        {/* Radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 20%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 60%)",
          }}
        />

        <ScrollReveal>
          <div className="relative z-10 py-20 sm:py-24 px-5 text-center max-w-2xl mx-auto">
            {/* Terminal-style prompt badge */}
            <div className="mb-6 inline-flex items-center gap-2">
              <span
                className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold tracking-wide px-3.5 py-1.5 rounded-lg"
                style={{
                  color: "var(--accent-text)",
                  background: "var(--accent-subtle)",
                  border: "1px solid var(--accent-border)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 6px var(--accent)",
                  }}
                />
                {t.cta.badge}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 tracking-tight leading-tight">
              {t.cta.heading1}
              <br />
              <span style={{ color: "#3b82f6" }}>{t.cta.heading2}</span>
            </h2>

            <p className="text-text-secondary text-sm sm:text-base mb-10 max-w-md mx-auto leading-relaxed">
              {t.cta.description}
            </p>

            {/* Quick install command */}
            <div
              className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl mb-8 max-w-full"
              style={{
                background: "#0c0e14",
                border: "1px solid #2a2d37",
              }}
            >
              <code className="text-[13px] font-mono truncate" style={{ color: "#e8edf5" }}>
                <span style={{ color: "#38bdf8" }} className="select-none">
                  {"$ "}
                </span>
                npm i -g @dojops/cli
              </code>
              <CopyButton text="npm i -g @dojops/cli" className="shrink-0" />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#install"
                className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-300 overflow-hidden"
              >
                <span
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "#3b82f6",
                  }}
                />
                <span
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow:
                      "0 0 24px color-mix(in srgb, #3b82f6 30%, transparent), 0 0 48px color-mix(in srgb, #06b6d4 12%, transparent)",
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  {t.cta.getStarted}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a
                href={LINKS.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border text-sm hover:text-text-primary transition-all duration-300"
                style={{
                  borderColor: "var(--border-primary)",
                  color: "var(--text-secondary)",
                }}
              >
                {t.cta.readDocs}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Links Grid ── */}
      <div
        className="border-t px-5 py-14 sm:py-16"
        style={{
          borderColor: "var(--border-primary)",
          background: "var(--bg-primary)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8">
            {/* Brand column */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <Image src="/icons/dojops-new-logo-sm.png" alt="DojOps" width={24} height={24} />
                <span className="font-bold text-text-primary tracking-tight text-[15px]">
                  DojOps
                </span>
              </div>
              <p className="text-xs text-text-tertiary leading-relaxed mb-5 max-w-[200px]">
                {t.footer.brandDescription}
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3">
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
                <a
                  href={LINKS.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="npm"
                >
                  <NpmIcon />
                </a>
                <a
                  href={LINKS.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label="Documentation"
                >
                  <DocsIcon />
                </a>
              </div>
              <NpmVersion />
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h3
                  className="text-[10px] font-mono font-semibold tracking-[0.15em] uppercase mb-4"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {heading}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...("external" in link && link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-200 inline-flex items-center gap-1.5"
                      >
                        {link.label}
                        {"external" in link && link.external && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="opacity-40"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div
        className="border-t px-5 py-5"
        style={{
          borderColor: "var(--border-primary)",
          background: "var(--bg-primary)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-text-tertiary">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </span>
          <span className="text-[11px] text-text-tertiary">
            {t.footer.createdBy}{" "}
            <a
              href="https://github.com/MHChlagou"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Mohamed Hedi CHLAGOU
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
