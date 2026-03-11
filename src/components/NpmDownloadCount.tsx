"use client";

import { useEffect, useState } from "react";

interface DownloadData {
  downloads: Array<{ downloads: number }>;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export default function NpmDownloadCount() {
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
    <div className="flex flex-col items-center gap-1 group cursor-default">
      <span className="text-2xl sm:text-3xl font-bold text-text-primary group-hover:scale-110 transition-transform duration-300">
        {total !== null ? formatCount(total) : "—"}
      </span>
      <span className="text-xs text-text-secondary/80 tracking-wide uppercase">npm Downloads</span>
    </div>
  );
}
