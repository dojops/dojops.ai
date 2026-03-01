import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
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
  title: "DojOps — AI DevOps Automation Engine",
  description:
    "Generate, validate, and execute infrastructure & CI/CD configurations using AI. 12 DevOps tools, 16 specialist agents, structured output enforcement, and sandboxed execution.",
  keywords: [
    "DevOps",
    "AI",
    "automation",
    "infrastructure",
    "CI/CD",
    "Terraform",
    "Kubernetes",
    "GitHub Actions",
  ],
  authors: [{ name: "DojOps" }],
  openGraph: {
    title: "DojOps — AI DevOps Automation Engine",
    description:
      "Generate, validate, and execute infrastructure & CI/CD configurations using AI.",
    url: "https://dojops.ai",
    siteName: "DojOps",
    images: [
      {
        url: "/logo/official-dojops-logo.png",
        width: 600,
        height: 600,
        alt: "DojOps Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DojOps — AI DevOps Automation Engine",
    description:
      "Generate, validate, and execute infrastructure & CI/CD configurations using AI.",
  },
  icons: {
    icon: "/icons/official-dojops-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sora.variable} ${jetbrainsMono.variable} antialiased ambient-grid noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
