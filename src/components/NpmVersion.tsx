"use client";

import { useEffect, useState } from "react";

export default function NpmVersion() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://registry.npmjs.org/@dojops/cli/latest", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json: { version?: string }) => {
        if (json.version) setVersion(json.version);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  if (!version) return null;

  return <span className="mt-3 text-[11px] font-mono text-text-tertiary">v{version}</span>;
}
