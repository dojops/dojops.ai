"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LINKS } from "@/lib/constants";
import { useTranslation } from "@/i18n";

export default function ContactPage() {
  return (
    <Suspense>
      <ContactContent />
    </Suspense>
  );
}

function ContactContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState(searchParams.get("subject") ?? "");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const hubUrl = process.env.NEXT_PUBLIC_HUB_URL || LINKS.hub;
      const res = await fetch(`${hubUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: company || undefined,
          subject: subject || "General question",
          message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Unable to connect. Please try again later.");
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary pt-24 pb-20 px-5">
        <div className="max-w-2xl mx-auto">
          {status === "success" ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-success-bg flex items-center justify-center mx-auto mb-6">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-success-fg"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-text-primary mb-3">
                {t.contact.successTitle}
              </h1>
              <p className="text-text-secondary mb-8">{t.contact.successMessage}</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-hover rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                {t.contact.backHome}
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3 tracking-tight">
                  {t.contact.title}
                </h1>
                <p className="text-text-secondary text-base sm:text-lg max-w-lg mx-auto">
                  {t.contact.subtitle}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-bg-card border border-border-primary rounded-2xl p-6 sm:p-8 shadow-[var(--shadow-md)] space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-text-secondary mb-1.5"
                    >
                      {t.contact.nameLabel} <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full rounded-xl border border-border-secondary bg-bg-primary px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-text-secondary mb-1.5"
                    >
                      {t.contact.emailLabel} <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full rounded-xl border border-border-secondary bg-bg-primary px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-sm font-medium text-text-secondary mb-1.5"
                    >
                      {t.contact.companyLabel}
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t.contact.companyPlaceholder}
                      className="w-full rounded-xl border border-border-secondary bg-bg-primary px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-medium text-text-secondary mb-1.5"
                    >
                      {t.contact.subjectLabel} <span className="text-accent">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-border-secondary bg-bg-primary px-4 py-3 text-sm text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors outline-none"
                    >
                      <option value="" disabled>
                        --
                      </option>
                      {t.contact.subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-text-secondary mb-1.5"
                  >
                    {t.contact.messageLabel} <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full rounded-xl border border-border-secondary bg-bg-primary px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none outline-none"
                  />
                </div>

                {status === "error" && errorMsg && (
                  <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto bg-accent text-white hover:bg-accent-hover rounded-xl px-8 py-3 text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {status === "loading" ? t.contact.submitting : t.contact.submit}
                </button>
              </form>

              <p className="text-center text-xs text-text-tertiary mt-6">
                {t.newsletter.reachUs}{" "}
                <a
                  href="mailto:contact@dojops.ai"
                  className="text-accent-text hover:text-accent transition-colors"
                >
                  contact@dojops.ai
                </a>
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
