"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  Pencil,
  GitBranch,
  ClipboardList,
  Zap,
  ShieldCheck,
  Search,
  Lock,
  Play,
  FileText,
  Check,
  Sparkles,
} from "lucide-react";
import { PIPELINE_STAGES } from "@/lib/constants";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

type Category = "input" | "ai" | "check" | "action";

const CATEGORY_COLORS: Record<Category, string> = {
  input: "#60a5fa",
  ai: "#00e5ff",
  check: "#eab308",
  action: "#34d399",
};

interface NodeDef {
  icon: ReactNode;
  iconAnim: string;
  category: Category;
  x: number; // % of container
  y: number; // % of container
  sx: number; // SVG viewBox x
  sy: number; // SVG viewBox y
}

const NODES: NodeDef[] = [
  {
    icon: <Pencil size={18} strokeWidth={1.5} />,
    iconAnim: "icon-wiggle",
    category: "input",
    x: 11,
    y: 13,
    sx: 110,
    sy: 78,
  },
  {
    icon: <GitBranch size={18} strokeWidth={1.5} />,
    iconAnim: "icon-pulse-scale",
    category: "ai",
    x: 44,
    y: 13,
    sx: 440,
    sy: 78,
  },
  {
    icon: <ClipboardList size={18} strokeWidth={1.5} />,
    iconAnim: "icon-pulse-scale",
    category: "ai",
    x: 77,
    y: 13,
    sx: 770,
    sy: 78,
  },
  {
    icon: <Zap size={18} strokeWidth={1.5} />,
    iconAnim: "icon-flash",
    category: "ai",
    x: 77,
    y: 50,
    sx: 770,
    sy: 300,
  },
  {
    icon: <ShieldCheck size={18} strokeWidth={1.5} />,
    iconAnim: "icon-pulse-scale",
    category: "check",
    x: 44,
    y: 50,
    sx: 440,
    sy: 300,
  },
  {
    icon: <Search size={18} strokeWidth={1.5} />,
    iconAnim: "icon-wiggle",
    category: "check",
    x: 11,
    y: 50,
    sx: 110,
    sy: 300,
  },
  {
    icon: <Lock size={18} strokeWidth={1.5} />,
    iconAnim: "icon-pulse-scale",
    category: "action",
    x: 11,
    y: 87,
    sx: 110,
    sy: 522,
  },
  {
    icon: <Play size={18} strokeWidth={1.5} />,
    iconAnim: "icon-bounce",
    category: "action",
    x: 44,
    y: 87,
    sx: 440,
    sy: 522,
  },
  {
    icon: <FileText size={18} strokeWidth={1.5} />,
    iconAnim: "icon-pulse-scale",
    category: "action",
    x: 77,
    y: 87,
    sx: 770,
    sy: 522,
  },
];

// SVG path data for each pipe segment (viewBox 0 0 1000 600)
const SEGMENTS = [
  "M 110 78 L 440 78",
  "M 440 78 L 770 78",
  "M 770 78 C 885 78 885 300 770 300",
  "M 770 300 L 440 300",
  "M 440 300 L 110 300",
  "M 110 300 C 5 300 5 522 110 522",
  "M 110 522 L 440 522",
  "M 440 522 L 770 522",
];

// Direction arrows: position + rotation
const ARROWS: { x: number; y: number; r: number }[] = [
  { x: 275, y: 78, r: 0 },
  { x: 605, y: 78, r: 0 },
  { x: 850, y: 189, r: 90 },
  { x: 605, y: 300, r: 180 },
  { x: 275, y: 300, r: 180 },
  { x: 40, y: 411, r: 90 },
  { x: 275, y: 522, r: 0 },
  { x: 605, y: 522, r: 0 },
];

const STAGE_INTERVAL = 600;

/* ═══════════════════════════════════════════════════════════════
   NODE CARD
   ═══════════════════════════════════════════════════════════════ */

type NodeState = "inactive" | "active" | "done";

interface NodeCardProps {
  node: NodeDef;
  stage: (typeof PIPELINE_STAGES)[number];
  index: number;
  state: NodeState;
}

function NodeCard({ node, stage, index, state }: NodeCardProps) {
  const catColor = CATEGORY_COLORS[node.category];
  const isActive = state === "active";
  const isDone = state === "done";
  const isLit = isActive || isDone;

  return (
    <div
      className="absolute z-10"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: `translate(-50%, -50%) scale(${isActive ? 1.08 : 1})`,
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        style={{
          width: 88,
          padding: "12px 8px 10px",
          background: isActive
            ? `linear-gradient(160deg, rgba(0,229,255,0.1) 0%, rgba(0,229,255,0.02) 100%)`
            : isDone
              ? "rgba(0,229,255,0.03)"
              : "rgba(8,14,24,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: `2px solid ${isLit ? catColor : "rgba(255,255,255,0.03)"}`,
          borderLeft: `1px solid ${isActive ? "rgba(0,229,255,0.3)" : isDone ? "rgba(0,229,255,0.12)" : "rgba(255,255,255,0.04)"}`,
          borderRight: `1px solid ${isActive ? "rgba(0,229,255,0.3)" : isDone ? "rgba(0,229,255,0.12)" : "rgba(255,255,255,0.04)"}`,
          borderBottom: `1px solid ${isActive ? "rgba(0,229,255,0.3)" : isDone ? "rgba(0,229,255,0.12)" : "rgba(255,255,255,0.04)"}`,
          borderRadius: 14,
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          gap: 6,
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: isActive
            ? "0 0 40px rgba(0,229,255,0.15), 0 0 80px rgba(0,229,255,0.05), inset 0 1px 0 rgba(255,255,255,0.04)"
            : isDone
              ? "0 0 15px rgba(0,229,255,0.06), 0 4px 20px rgba(0,0,0,0.3)"
              : "0 2px 12px rgba(0,0,0,0.3)",
          position: "relative" as const,
        }}
      >
        {/* Step number badge */}
        <div
          style={{
            position: "absolute",
            top: -9,
            right: -9,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: isActive
              ? catColor
              : isDone
                ? "rgba(52,211,153,0.3)"
                : "rgba(15,25,40,0.9)",
            border: `1px solid ${isLit ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            fontWeight: 700,
            color: isActive ? "#050508" : isDone ? "#34d399" : "#2a3a50",
            fontFamily: "var(--font-mono), monospace",
            transition: "all 0.4s",
          }}
        >
          {isDone ? <Check size={10} strokeWidth={3} /> : index + 1}
        </div>

        {/* Active pulse ring */}
        {isActive && (
          <div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: 18,
              border: "1px solid rgba(0,229,255,0.25)",
              animation: "pipeline-card-pulse 2s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Icon container with micro-animation */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: isActive
              ? "rgba(0,229,255,0.1)"
              : isDone
                ? "rgba(52,211,153,0.06)"
                : "rgba(255,255,255,0.02)",
            border: `1px solid ${isActive ? "rgba(0,229,255,0.2)" : isDone ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.03)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isActive ? "#00e5ff" : isDone ? "rgba(0,229,255,0.55)" : "#1e2d40",
            transition: "all 0.5s",
            animation: isActive ? `${node.iconAnim} 0.6s ease-in-out infinite` : "none",
            filter: isActive ? "drop-shadow(0 0 6px rgba(0,229,255,0.4))" : "none",
          }}
        >
          {node.icon}
        </div>

        {/* Label */}
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            color: isActive ? "#c0f0ff" : isDone ? "rgba(0,229,255,0.55)" : "#1e2d40",
            transition: "color 0.5s",
            fontFamily: "var(--font-mono), monospace",
            lineHeight: 1,
          }}
        >
          {stage.label}
        </span>

        {/* Active indicator */}
        {isActive && (
          <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: -2 }}>
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#00e5ff",
                boxShadow: "0 0 6px #00e5ff",
                animation: "pipeline-card-pulse 1s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: 7,
                color: "#00e5ff",
                fontFamily: "var(--font-mono), monospace",
                letterSpacing: "0.5px",
              }}
            >
              ACTIVE
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SVG PIPES + PARTICLES + ARROWS
   ═══════════════════════════════════════════════════════════════ */

function PipelineSVG({ activeIndex }: { activeIndex: number }) {
  return (
    <svg
      viewBox="-10 0 1020 600"
      className="absolute inset-0 w-full h-full z-[1]"
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Glow filters */}
        <filter id="pipe-glow-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pipe-glow-medium" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="particle-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {SEGMENTS.map((path, i) => {
        const segActive = i < activeIndex;
        const segCurrent = i === activeIndex - 1;

        return (
          <g key={`seg-${i}`}>
            {/* Layer 1: Outer halo (always visible, very dim) */}
            <path
              d={path}
              fill="none"
              stroke={segActive ? "rgba(0,229,255,0.06)" : "rgba(0,229,255,0.015)"}
              strokeWidth={segActive ? 14 : 10}
              strokeLinecap="round"
              filter="url(#pipe-glow-soft)"
              style={{ transition: "stroke 0.6s, stroke-width 0.6s" }}
            />

            {/* Layer 2: Track line (always visible) */}
            <path
              d={path}
              fill="none"
              stroke={segActive ? "rgba(0,229,255,0.2)" : "rgba(255,255,255,0.04)"}
              strokeWidth={segActive ? 3 : 1.5}
              strokeLinecap="round"
              style={{ transition: "stroke 0.6s, stroke-width 0.6s" }}
            />

            {/* Layer 3: Core glow (active only) */}
            {segActive && (
              <path
                d={path}
                fill="none"
                stroke="#00e5ff"
                strokeWidth={1.5}
                strokeLinecap="round"
                filter="url(#pipe-glow-medium)"
                style={{ opacity: segCurrent ? 1 : 0.6 }}
              />
            )}

            {/* Direction arrow */}
            <g
              transform={`translate(${ARROWS[i].x}, ${ARROWS[i].y}) rotate(${ARROWS[i].r})`}
              style={{
                opacity: segActive ? 0.5 : 0.08,
                transition: "opacity 0.6s",
              }}
            >
              <polygon points="-4,-4 5,0 -4,4" fill={segActive ? "#00e5ff" : "#2a3a50"} />
            </g>

            {/* Flow particles (only when segment is active) */}
            {segActive && (
              <>
                <circle r="4" fill="white" filter="url(#particle-glow)" opacity="0.9">
                  <animateMotion dur="2s" repeatCount="indefinite" path={path} />
                </circle>
                <circle r="3" fill="#00e5ff" filter="url(#particle-glow)" opacity="0.6">
                  <animateMotion dur="2.5s" begin="0.8s" repeatCount="indefinite" path={path} />
                </circle>
                <circle r="2" fill="#00e5ff" opacity="0.35">
                  <animateMotion dur="3s" begin="0.4s" repeatCount="indefinite" path={path} />
                </circle>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AI CORE — central decorative element
   ═══════════════════════════════════════════════════════════════ */

function AICore({ active }: { active: boolean }) {
  return (
    <div
      className="absolute z-[2]"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 140,
        height: 140,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)",
        border: `1px solid ${active ? "rgba(0,229,255,0.08)" : "rgba(0,229,255,0.02)"}`,
        animation: active ? "ai-core-breathe 4s ease-in-out infinite" : "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        transition: "all 1s",
        pointerEvents: "none",
      }}
    >
      <Sparkles
        size={20}
        strokeWidth={1.2}
        style={{
          color: active ? "rgba(0,229,255,0.4)" : "rgba(0,229,255,0.08)",
          transition: "color 1s",
          filter: active ? "drop-shadow(0 0 8px rgba(0,229,255,0.3))" : "none",
        }}
      />
      <span
        style={{
          fontSize: 7,
          fontWeight: 700,
          letterSpacing: "2px",
          color: active ? "rgba(0,229,255,0.3)" : "rgba(0,229,255,0.06)",
          fontFamily: "var(--font-mono), monospace",
          transition: "color 1s",
        }}
      >
        AI CORE
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BACKGROUND — faint grid + floating particles
   ═══════════════════════════════════════════════════════════════ */

// Deterministic pseudo-random from seed to avoid hydration mismatch
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

// Pre-computed particle positions (deterministic, safe for SSR)
const BG_PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  left: Math.round((8 + seededRandom(i * 3 + 1) * 84) * 100) / 100,
  top: Math.round((5 + seededRandom(i * 3 + 2) * 90) * 100) / 100,
  dur: Math.round((6 + seededRandom(i * 3 + 3) * 8) * 100) / 100,
  delay: Math.round(seededRandom(i * 3 + 4) * 10 * 100) / 100,
}));

function PipelineBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Faint grid */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.025 }}>
        <defs>
          <pattern id="pipeline-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00e5ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pipeline-grid)" />
      </svg>

      {/* Floating particles */}
      {BG_PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "#00e5ff",
            opacity: 0,
            animation: `bg-particle-drift ${p.dur}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Central radial glow */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          background: "radial-gradient(ellipse, rgba(0,229,255,0.02) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STATUS BAR
   ═══════════════════════════════════════════════════════════════ */

function PipelineStatus({ activeIndex }: { activeIndex: number }) {
  const total = PIPELINE_STAGES.length;
  const done = activeIndex >= total - 1;

  return (
    <div className="flex justify-center mt-6 z-20">
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "6px 14px",
          background: "rgba(8,14,24,0.75)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0,229,255,0.06)",
          borderRadius: 16,
        }}
      >
        <div style={{ display: "flex", gap: 3 }}>
          {PIPELINE_STAGES.map((_, i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background:
                  i <= activeIndex ? (done ? "#34d399" : "#00e5ff") : "rgba(255,255,255,0.06)",
                boxShadow: i === activeIndex && !done ? "0 0 6px #00e5ff" : "none",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontSize: 9,
            fontFamily: "var(--font-mono), monospace",
            color: "#4a6a7a",
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
          }}
        >
          {activeIndex < 0
            ? "Initializing..."
            : done
              ? "All stages complete"
              : PIPELINE_STAGES[activeIndex].label}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function getNodeState(nodeIndex: number, activeIndex: number): NodeState {
  if (activeIndex < 0) return "inactive";
  if (nodeIndex === activeIndex) return "active";
  if (nodeIndex < activeIndex) return "done";
  return "inactive";
}

export default function PipelineFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [started, setStarted] = useState(false);

  // Start animation when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  // Sequential activation loop
  useEffect(() => {
    if (!started) return;
    const total = PIPELINE_STAGES.length;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    function step(i: number) {
      if (cancelled) return;
      if (i >= total) {
        timer = setTimeout(() => {
          if (cancelled) return;
          setActiveIndex(-1);
          timer = setTimeout(() => step(0), 1200);
        }, 3500);
        return;
      }
      setActiveIndex(i);
      timer = setTimeout(() => step(i + 1), STAGE_INTERVAL);
    }

    timer = setTimeout(() => step(0), 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [started]);

  return (
    <section className="py-16 sm:py-24 px-5 relative overflow-hidden" data-pipeline>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-neon-cyan/[0.015] rounded-full blur-[120px]" />
      </div>

      <ScrollReveal>
        <SectionHeading
          id="pipeline"
          title="How DojOps Works"
          subtitle="From prompt to production in nine automated stages"
        />
      </ScrollReveal>

      {/* Pipeline container */}
      <div
        ref={containerRef}
        className="relative max-w-[900px] mx-auto"
        style={{ aspectRatio: "5 / 3" }}
      >
        <PipelineBackground />
        <PipelineSVG activeIndex={activeIndex} />
        <AICore active={activeIndex >= 0} />

        {NODES.map((node, i) => (
          <NodeCard
            key={PIPELINE_STAGES[i].id}
            node={node}
            stage={PIPELINE_STAGES[i]}
            index={i}
            state={getNodeState(i, activeIndex)}
          />
        ))}
      </div>

      <PipelineStatus activeIndex={activeIndex} />
    </section>
  );
}
