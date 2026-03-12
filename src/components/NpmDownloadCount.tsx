"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/i18n";

interface DownloadData {
  downloads: Array<{ downloads: number }>;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export default function NpmDownloadCount() {
  const { t } = useTranslation();
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.npmjs.org/downloads/range/last-month/@dojops/cli", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json: DownloadData) => {
        if (Array.isArray(json.downloads) && json.downloads.length > 0) {
          setTotal(json.downloads.reduce((s, d) => s + d.downloads, 0));
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <span className="text-xs text-text-secondary">
      <span className="font-semibold text-text-primary">
        {total !== null ? formatCount(total) : "—"}
      </span>{" "}
      {t.hero.downloaded}
    </span>
  );
}
