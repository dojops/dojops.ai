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
    default: "DojOps AI DevOps Automation Engine",
    template: "%s | DojOps",
  },
  description:
    "Generate, validate, and execute infrastructure & CI/CD configurations using AI. 12+ DevOps skills, 17 specialist agents, 6 LLM providers, sandboxed execution, and hash-chained audit trails.",
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
    "DevOps automation",
    "infrastructure automation",
    "AI DevOps",
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
    title: "DojOps — AI DevOps Automation Engine",
    description:
      "Generate, validate, and execute infrastructure & CI/CD configurations using AI. 12+ skills, 17 agents, sandboxed execution.",
    url: "https://dojops.ai",
    siteName: "DojOps",
    locale: "en_US",
    images: [
      {
        url: "/icons/dojops-new-logo.png",
        width: 600,
        height: 600,
        alt: "DojOps — AI DevOps Automation Engine",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DojOps — AI DevOps Automation Engine",
    description:
      "Generate, validate, and execute infrastructure & CI/CD configurations using AI. 12+ skills, 17 agents, sandboxed execution.",
    images: ["/icons/dojops-new-logo.png"],
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
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://dojops.ai/#software",
      name: "DojOps",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux, macOS, Windows",
      description:
        "AI-powered DevOps automation engine that generates, validates, and executes infrastructure and CI/CD configurations with 12+ built-in skills, 17 specialist agents, and sandboxed execution.",
      url: "https://dojops.ai",
      downloadUrl: "https://www.npmjs.com/package/@dojops/cli",
      softwareVersion: "2.0.0",
      author: { "@id": "https://dojops.ai/#organization" },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "12+ built-in DevOps skills",
        "17 specialist AI agents",
        "6 LLM providers (OpenAI, Anthropic, Ollama, DeepSeek, Gemini, GitHub Copilot)",
        "Sandboxed execution with approval workflows",
        "Hash-chained audit trails",
        "10 security scanners",
        "Custom skill system",
        "REST API with web dashboard",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://dojops.ai/#website",
      url: "https://dojops.ai",
      name: "DojOps",
      publisher: { "@id": "https://dojops.ai/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://doc.dojops.ai" />
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
