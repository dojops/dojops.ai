import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Request beta access, ask a question, or tell us what you're building with DojOps.",
  alternates: { canonical: "https://dojops.ai/contact" },
  openGraph: {
    title: "Contact us | DojOps",
    description:
      "Request beta access, ask a question, or tell us what you're building with DojOps.",
    url: "https://dojops.ai/contact",
    siteName: "DojOps",
  },
  twitter: {
    card: "summary",
    title: "Contact us | DojOps",
    description:
      "Request beta access, ask a question, or tell us what you're building with DojOps.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
