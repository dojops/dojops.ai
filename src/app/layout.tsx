import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
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
  title: "DojOps AI DevOps Automation Engine",
  description:
    "Generate, validate, and execute infrastructure & CI/CD configurations using AI. 13 DevOps modules, 17 specialist agents, structured output enforcement, and sandboxed execution.",
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
    title: "DojOps AI DevOps Automation Engine",
    description: "Generate, validate, and execute infrastructure & CI/CD configurations using AI.",
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
    title: "DojOps AI DevOps Automation Engine",
    description: "Generate, validate, and execute infrastructure & CI/CD configurations using AI.",
  },
  icons: {
    icon: "/icons/dojops-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"){document.documentElement.classList.add("dark");}else if(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.classList.add("dark");}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased ambient-glow noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
