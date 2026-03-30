import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { I18nProvider } from "@/i18n";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dojops.ai"),
  title: {
    default: "DojOps AI Automation Engine",
    template: "%s | DojOps",
  },
  description:
    "Generate, validate, and execute infrastructure & CI/CD configurations using AI. 38 DevOps skills, 32 specialist agents, 7 LLM providers, sandboxed execution, and hash-chained audit trails.",
  keywords: [
    "DevOps",
    "AI",
    "automation",
    "infrastructure as code",
    "CI/CD",
    "Terraform",
    "Kubernetes",
    "GitHub Actions",
    "Docker",
    "LLM",
    "infrastructure automation",
    "AI automation",
    "GitOps",
    "DevSecOps",
  ],
  authors: [{ name: "DojOps", url: "https://dojops.ai" }],
  creator: "DojOps",
  publisher: "DojOps",
  category: "Technology",
  alternates: {
    canonical: "https://dojops.ai",
  },
  openGraph: {
    title: "DojOps — AI Automation Engine",
    description:
      "Generate, validate, and execute infrastructure & CI/CD configurations using AI. 38 skills, 32 agents, sandboxed execution.",
    url: "https://dojops.ai",
    siteName: "DojOps",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DojOps — AI Automation Engine",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DojOps — AI Automation Engine",
    description:
      "Generate, validate, and execute infrastructure & CI/CD configurations using AI. 38 skills, 32 agents, sandboxed execution.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icons/dojops-favicon.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/icons/dojops-new-logo.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://dojops.ai/#organization",
      name: "DojOps",
      url: "https://dojops.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://dojops.ai/icons/dojops-new-logo.png",
        width: 600,
        height: 600,
      },
      sameAs: ["https://github.com/dojops", "https://www.npmjs.com/package/@dojops/cli"],
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@dojops.ai",
        contactType: "customer support",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://dojops.ai/#software",
      name: "DojOps",
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "AI Automation",
      operatingSystem: "Linux, macOS, Windows",
      description:
        "AI automation engine that generates, validates, and executes infrastructure and CI/CD configurations with 38 built-in skills, 32 specialist agents, and sandboxed execution.",
      url: "https://dojops.ai",
      downloadUrl: "https://www.npmjs.com/package/@dojops/cli",
      installUrl: "https://dojops.ai/#install",
      softwareVersion: "1.2.0",
      author: { "@id": "https://dojops.ai/#organization" },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://dojops.ai/#install",
      },
      featureList: [
        "38 built-in DevOps skills",
        "32 specialist AI agents",
        "7 LLM providers (OpenAI, Anthropic, Ollama, DeepSeek, Mistral, Gemini, GitHub Copilot)",
        "Sandboxed execution with approval workflows",
        "Hash-chained audit trails",
        "10 security scanners",
        "Custom skill system with SHA-256 verification",
        "REST API with web dashboard (23 endpoints)",
      ],
      screenshot: "https://dojops.ai/icons/dojops-new-logo.png",
      softwareHelp: {
        "@type": "CreativeWork",
        url: "https://doc.dojops.ai",
      },
      releaseNotes: "https://github.com/dojops/dojops/blob/main/CHANGELOG.md",
    },
    {
      "@type": "WebSite",
      "@id": "https://dojops.ai/#website",
      url: "https://dojops.ai",
      name: "DojOps",
      publisher: { "@id": "https://dojops.ai/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://doc.dojops.ai?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://dojops.ai/#webpage",
      url: "https://dojops.ai",
      name: "DojOps — AI Automation Engine",
      description:
        "Generate, validate, and execute infrastructure & CI/CD configurations using AI. 38 DevOps skills, 32 specialist agents, 7 LLM providers, sandboxed execution, and hash-chained audit trails.",
      isPartOf: { "@id": "https://dojops.ai/#website" },
      about: { "@id": "https://dojops.ai/#software" },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://dojops.ai/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://dojops.ai",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* JSON-LD structured data — all values are static constants, no user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Inline theme detection to prevent flash of unstyled content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark");}else{document.documentElement.classList.add("dark");}}catch(e){document.documentElement.classList.add("dark");}})();`,
          }}
        />
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://doc.dojops.ai" />
        {/* Hreflang — single-page app with client-side i18n */}
        <link rel="alternate" hrefLang="en" href="https://dojops.ai" />
        <link rel="alternate" hrefLang="fr" href="https://dojops.ai" />
        <link rel="alternate" hrefLang="zh" href="https://dojops.ai" />
        <link rel="alternate" hrefLang="x-default" href="https://dojops.ai" />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased ambient-glow noise-overlay`}
      >
        <I18nProvider>{children}</I18nProvider>
        <AnalyticsConsent />
      </body>
    </html>
  );
}
