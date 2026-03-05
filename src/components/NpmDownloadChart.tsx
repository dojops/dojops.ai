"use client";

import { useEffect, useRef, useState } from "react";

interface DayDownload {
  day: string;
  downloads: number;
}

interface DownloadData {
  downloads: DayDownload[];
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** Catmull-Rom to cubic bezier SVG path */
function catmullRomPath(points: { x: number; y: number }[], tension = 0.3): string {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M${points[0].x},${points[0].y}L${points[1].x},${points[1].y}`;
  }

  let d = `M${points[0].x},${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const cp1x = p1.x + ((p2.x - p0.x) * tension) / 3;
    const cp1y = p1.y + ((p2.y - p0.y) * tension) / 3;
    const cp2x = p2.x - ((p3.x - p1.x) * tension) / 3;
    const cp2y = p2.y - ((p3.y - p1.y) * tension) / 3;

    d += `C${cp1x},${cp1y},${cp2x},${cp2y},${p2.x},${p2.y}`;
  }

  return d;
}

const CHART_W = 480;
const CHART_H = 120;
const PAD_X = 0;
const PAD_TOP = 8;
const PAD_BOTTOM = 0;

export default function NpmDownloadChart() {
  const [data, setData] = useState<DayDownload[] | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.npmjs.org/downloads/range/last-month/@dojops/cli", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json: DownloadData) => {
        if (Array.isArray(json.downloads) && json.downloads.length > 0) {
          setData(json.downloads);
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  if (!data) {
    return (
      <div className="w-full max-w-3xl mx-auto mb-8">
        <div className="rounded-xl bg-surface/60 backdrop-blur-sm border border-glass-border p-5 sm:p-6">
          <div className="flex items-baseline gap-3 mb-4">
            <div className="h-8 w-20 rounded bg-surface-elevated/60 animate-pulse" />
            <div className="h-4 w-28 rounded bg-surface-elevated/40 animate-pulse" />
          </div>
          <div className="h-[120px] w-full rounded bg-surface-elevated/30 animate-pulse" />
        </div>
      </div>
    );
  }

  const total = data.reduce((s, d) => s + d.downloads, 0);
  const max = Math.max(...data.map((d) => d.downloads), 1);

  const plotW = CHART_W - PAD_X * 2;
  const plotH = CHART_H - PAD_TOP - PAD_BOTTOM;

  const points = data.map((d, i) => ({
    x: PAD_X + (i / (data.length - 1)) * plotW,
    y: PAD_TOP + plotH - (d.downloads / max) * plotH,
  }));

  const linePath = catmullRomPath(points);
  const areaPath =
    linePath + `L${points[points.length - 1].x},${CHART_H}L${points[0].x},${CHART_H}Z`;

  // Pick ~4 evenly-spaced date labels
  const labelIndices: number[] = [];
  const step = Math.floor(data.length / 4);
  for (let i = 0; i < data.length; i += step) {
    labelIndices.push(i);
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const idx = Math.round(xRatio * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, idx)));
  };

  const hoverPoint = hover === null ? null : points[hover];
  const hoverData = hover === null ? null : data[hover];

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="rounded-xl bg-surface/60 backdrop-blur-sm border border-glass-border p-5 sm:p-6 transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.08)]">
        {/* Header */}
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-2xl sm:text-3xl font-bold text-gradient-cyan">
            {formatCount(total)}
          </span>
          <span className="text-sm text-text-secondary">npm Downloads</span>
          <span className="text-xs text-text-secondary/50 ml-auto">Last 30 days</span>
        </div>

        {/* Chart */}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="w-full h-auto"
          preserveAspectRatio="none"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHover(null)}
        >
          <title>{`npm download trend chart showing ${formatCount(total)} downloads over the last 30 days`}</title>
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--neon-cyan)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--neon-cyan)" stopOpacity="0" />
            </linearGradient>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Area fill */}
          <path d={areaPath} fill="url(#areaFill)" />

          {/* Glow line */}
          <path
            d={linePath}
            fill="none"
            stroke="var(--neon-cyan)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lineGlow)"
            className="chart-draw-line"
            style={{
              strokeDasharray: 2000,
              strokeDashoffset: 0,
            }}
          />

          {/* Date labels */}
          {labelIndices.map((idx) => (
            <text
              key={idx}
              x={points[idx].x}
              y={CHART_H - 2}
              textAnchor="middle"
              fill="var(--text-secondary)"
              fillOpacity="0.5"
              fontSize="10"
              fontFamily="var(--font-mono), monospace"
            >
              {formatDate(data[idx].day)}
            </text>
          ))}

          {/* Hover crosshair + dot */}
          {hoverPoint && hoverData && (
            <>
              <line
                x1={hoverPoint.x}
                y1={PAD_TOP}
                x2={hoverPoint.x}
                y2={CHART_H - 14}
                stroke="var(--neon-cyan)"
                strokeOpacity="0.3"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <circle
                cx={hoverPoint.x}
                cy={hoverPoint.y}
                r="4"
                fill="var(--neon-cyan)"
                stroke="var(--bg-deep)"
                strokeWidth="2"
              />
            </>
          )}
        </svg>

        {/* Tooltip (below chart) */}
        {hoverData && (
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-text-secondary transition-opacity duration-150">
            <span className="font-mono text-neon-cyan font-semibold">
              {hoverData.downloads.toLocaleString()}
            </span>
            <span>on {formatDate(hoverData.day)}</span>
          </div>
        )}
        {!hoverData && <div className="h-[20px] mt-2" />}
      </div>
    </div>
  );
}
