"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  Target,
  GitBranch,
  Network,
  Cpu,
  Zap,
  ShieldCheck,
  Eye,
  RotateCcw,
  Play,
  Pause,
  SkipForward,
  RefreshCw,
  FileText,
  Database,
  Check,
} from "lucide-react";
import { PIPELINE_STAGES } from "@/lib/constants";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

/* ═══════════════════════════════════════════════════════════════
   DATA — 11-stage pipeline: 4-3-4 S-curve layout
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
  x: number;
  y: number;
  sx: number;
  sy: number;
}

const NODES: NodeDef[] = [
  // Row 1 (L→R): Goal, Planner, Graph, Executor
  {
    icon: <Target size={16} strokeWidth={1.5} />,
    iconAnim: "icon-wiggle",
    category: "input",
    x: 11,
    y: 13,
    sx: 110,
    sy: 78,
  },
  {
    icon: <GitBranch size={16} strokeWidth={1.5} />,
    iconAnim: "icon-pulse-scale",
    category: "ai",
    x: 33,
    y: 13,
    sx: 330,
    sy: 78,
  },
  {
    icon: <Network size={16} strokeWidth={1.5} />,
    iconAnim: "icon-pulse-scale",
    category: "ai",
    x: 55,
    y: 13,
    sx: 550,
    sy: 78,
  },
  {
    icon: <Cpu size={16} strokeWidth={1.5} />,
    iconAnim: "icon-flash",
    category: "check",
    x: 77,
    y: 13,
    sx: 770,
    sy: 78,
  },
  // Row 2 (R→L): Generate, Verify, Critic
  {
    icon: <Zap size={16} strokeWidth={1.5} />,
    iconAnim: "icon-flash",
    category: "ai",
    x: 77,
    y: 50,
    sx: 770,
    sy: 300,
  },
  {
    icon: <ShieldCheck size={16} strokeWidth={1.5} />,
    iconAnim: "icon-pulse-scale",
    category: "check",
    x: 44,
    y: 50,
    sx: 440,
    sy: 300,
  },
  {
    icon: <Eye size={16} strokeWidth={1.5} />,
    iconAnim: "icon-wiggle",
    category: "ai",
    x: 11,
    y: 50,
    sx: 110,
    sy: 300,
  },
  // Row 3 (L→R): Repair, Execute, Audit, Memory
  {
    icon: <RotateCcw size={16} strokeWidth={1.5} />,
    iconAnim: "icon-pulse-scale",
    category: "ai",
    x: 11,
    y: 87,
    sx: 110,
    sy: 522,
  },
  {
    icon: <Play size={16} strokeWidth={1.5} />,
    iconAnim: "icon-bounce",
    category: "action",
    x: 33,
    y: 87,
    sx: 330,
    sy: 522,
  },
  {
    icon: <FileText size={16} strokeWidth={1.5} />,
    iconAnim: "icon-pulse-scale",
    category: "action",
    x: 55,
    y: 87,
    sx: 550,
    sy: 522,
  },
  {
    icon: <Database size={16} strokeWidth={1.5} />,
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
  "M 110 78 L 330 78",
  "M 330 78 L 550 78",
  "M 550 78 L 770 78",
  "M 770 78 C 885 78 885 300 770 300",
  "M 770 300 L 440 300",
  "M 440 300 L 110 300",
  "M 110 300 C -5 300 -5 522 110 522",
  "M 110 522 L 330 522",
  "M 330 522 L 550 522",
  "M 550 522 L 770 522",
];

// Direction arrows: position + rotation
const ARROWS: { x: number; y: number; r: number }[] = [
  { x: 220, y: 78, r: 0 },
  { x: 440, y: 78, r: 0 },
  { x: 660, y: 78, r: 0 },
  { x: 850, y: 189, r: 90 },
  { x: 605, y: 300, r: 180 },
  { x: 275, y: 300, r: 180 },
  { x: 30, y: 411, r: 90 },
  { x: 220, y: 522, r: 0 },
  { x: 440, y: 522, r: 0 },
  { x: 660, y: 522, r: 0 },
];

// Repair loop visual path (Repair → back to Generate)
const REPAIR_LOOP_PATH = "M 130 510 C 60 420 60 260 140 290 Q 300 260 770 300";

interface LogMsg {
  label: string;
  text: string;
  detail?: string;
}

const LOG_MESSAGES: LogMsg[] = [
  { label: "Goal", text: "Parsing infrastructure prompt..." },
  { label: "Planner", text: "Decomposing goal into tasks", detail: "risk: LOW" },
  { label: "Graph", text: "3 tasks wired", detail: "topological order" },
  { label: "Executor", text: "Policy checks passed \u2014 executing" },
  { label: "Generate", text: "LLM output validated via Zod schema" },
  { label: "Verify", text: "terraform validate \u2713  hadolint \u2713" },
  { label: "Critic", text: "Output passes best-practice review" },
  { label: "Repair", text: "No issues \u2014 skipping repair loop" },
  { label: "Execute", text: "3 files written", detail: "sandboxed, atomic" },
  { label: "Audit", text: "Hash-chained entry logged" },
  { label: "Memory", text: "Execution persisted for future context" },
];

const STAGE_INTERVAL = 700;

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
          width: 82,
          padding: "10px 6px 8px",
          background: isActive
            ? "linear-gradient(160deg, rgba(0,229,255,0.1) 0%, rgba(0,229,255,0.02) 100%)"
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
          gap: 5,
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
            top: -8,
            right: -8,
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
            fontSize: index >= 9 ? 7.5 : 9,
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
            width: 30,
            height: 30,
            borderRadius: 8,
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
            fontSize: 8,
            fontWeight: 600,
            letterSpacing: "0.7px",
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              marginTop: -2,
            }}
          >
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
                fontSize: 6,
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
   SVG PIPES + PARTICLES + ARROWS + REPAIR LOOP
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
            {/* Layer 1: Outer halo */}
            <path
              d={path}
              fill="none"
              stroke={segActive ? "rgba(0,229,255,0.06)" : "rgba(0,229,255,0.015)"}
              strokeWidth={segActive ? 14 : 10}
              strokeLinecap="round"
              filter="url(#pipe-glow-soft)"
              style={{ transition: "stroke 0.6s, stroke-width 0.6s" }}
            />

            {/* Layer 2: Track line */}
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

      {/* Repair loop indicator — shows when Repair step (index 7) is active */}
      {activeIndex === 7 && (
        <g>
          <path
            d={REPAIR_LOOP_PATH}
            fill="none"
            stroke="#00e5ff"
            strokeWidth={1.2}
            strokeDasharray="5 4"
            strokeLinecap="round"
            filter="url(#pipe-glow-medium)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0;0.35;0.35;0"
              dur="1.5s"
              repeatCount="1"
              fill="freeze"
            />
          </path>
          {/* Small arrow at the end pointing to Generate */}
          <g transform="translate(750, 300) rotate(0)">
            <polygon points="-3,-3 4,0 -3,3" fill="#00e5ff">
              <animate
                attributeName="opacity"
                values="0;0.5;0.5;0"
                dur="1.5s"
                repeatCount="1"
                fill="freeze"
              />
            </polygon>
          </g>
        </g>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BACKGROUND — faint grid + floating particles
   ═══════════════════════════════════════════════════════════════ */

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const BG_PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  left: Math.round((8 + seededRandom(i * 3 + 1) * 84) * 100) / 100,
  top: Math.round((5 + seededRandom(i * 3 + 2) * 90) * 100) / 100,
  dur: Math.round((6 + seededRandom(i * 3 + 3) * 8) * 100) / 100,
  delay: Math.round(seededRandom(i * 3 + 4) * 10 * 100) / 100,
}));

function PipelineBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.025 }}>
        <defs>
          <pattern id="pipeline-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00e5ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pipeline-grid)" />
      </svg>

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
   CONTROLS — Auto / Step / Reset (inspired by ICM)
   ═══════════════════════════════════════════════════════════════ */

function PipelineControls({
  playing,
  onAuto,
  onStep,
  onReset,
}: {
  playing: boolean;
  onAuto: () => void;
  onStep: () => void;
  onReset: () => void;
}) {
  const btnStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "6px 14px",
    borderRadius: 8,
    border: "1px solid rgba(0,229,255,0.1)",
    background: "rgba(8,14,24,0.75)",
    backdropFilter: "blur(12px)",
    color: "#5a6a7a",
    fontSize: 11,
    fontWeight: 600,
    fontFamily: "var(--font-mono), monospace",
    letterSpacing: "0.3px",
    cursor: "pointer",
    transition: "all 0.2s",
  };

  const activeBtnStyle: React.CSSProperties = {
    ...btnStyle,
    background: "rgba(0,229,255,0.08)",
    borderColor: "rgba(0,229,255,0.25)",
    color: "#00e5ff",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
        marginTop: 14,
        marginBottom: 10,
      }}
    >
      <button onClick={onAuto} style={playing ? activeBtnStyle : btnStyle}>
        {playing ? <Pause size={12} strokeWidth={2.5} /> : <Play size={12} strokeWidth={2.5} />}
        {playing ? "Pause" : "Auto"}
      </button>
      <button onClick={onStep} style={btnStyle}>
        <SkipForward size={12} strokeWidth={2.5} />
        Step
      </button>
      <button onClick={onReset} style={btnStyle}>
        <RefreshCw size={12} strokeWidth={2.5} />
        Reset
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LOG PANEL — step-by-step action log (inspired by ICM)
   ═══════════════════════════════════════════════════════════════ */

function PipelineLog({ activeIndex }: { activeIndex: number }) {
  const logRef = useRef<HTMLDivElement>(null);
  const entries = activeIndex >= 0 ? LOG_MESSAGES.slice(0, activeIndex + 1) : [];

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [activeIndex]);

  return (
    <div
      ref={logRef}
      style={{
        maxHeight: 120,
        overflowY: "auto",
        background: "rgba(5,5,8,0.8)",
        border: "1px solid rgba(0,229,255,0.06)",
        borderRadius: 10,
        padding: "10px 14px",
        fontFamily: "var(--font-mono), monospace",
        fontSize: 11,
        lineHeight: 1.8,
      }}
    >
      {entries.length === 0 ? (
        <div style={{ color: "#2a3a4a" }}>
          Pipeline ready. Click <strong style={{ color: "#4a5a6a" }}>Auto</strong> to watch or{" "}
          <strong style={{ color: "#4a5a6a" }}>Step</strong> to advance.
        </div>
      ) : (
        entries.map((entry, i) => {
          const node = NODES[i];
          const color = CATEGORY_COLORS[node.category];
          return (
            <div
              key={`log-${i}`}
              style={{
                padding: "1px 0",
                borderTop: i > 0 ? "1px solid rgba(0,229,255,0.03)" : "none",
                animation: i === entries.length - 1 ? "fadeIn 0.3s ease-out" : "none",
              }}
            >
              <span style={{ color: "#2a3a4a" }}>{"\u2192"} </span>
              <span
                style={{
                  color,
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "0.3px",
                }}
              >
                {entry.label}
              </span>
              <span style={{ color: "#7b8ba3", marginLeft: 6 }}>{entry.text}</span>
              {entry.detail && <span style={{ color: "#3a4a5a" }}> ({entry.detail})</span>}
            </div>
          );
        })
      )}
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
    <div className="flex justify-center mt-4 z-20">
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
                width: 4,
                height: 4,
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
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const stepRef = useRef(0);

  const total = PIPELINE_STAGES.length;

  // Detect when section scrolls into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  // Auto-start on scroll into view
  useEffect(() => {
    if (visible && !playing) {
      setPlaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Auto-play loop
  useEffect(() => {
    if (!playing) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick(i: number) {
      if (cancelled) return;
      if (i >= total) {
        timer = setTimeout(() => {
          if (cancelled) return;
          setActiveIndex(-1);
          stepRef.current = 0;
          timer = setTimeout(() => tick(0), 1200);
        }, 3500);
        return;
      }
      setActiveIndex(i);
      stepRef.current = i + 1;
      timer = setTimeout(() => tick(i + 1), STAGE_INTERVAL);
    }

    const start = stepRef.current;
    timer = setTimeout(() => tick(start), start === 0 ? 400 : STAGE_INTERVAL);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const handleAuto = () => {
    if (playing) {
      setPlaying(false);
    } else {
      if (activeIndex >= total - 1) {
        setActiveIndex(-1);
        stepRef.current = 0;
      }
      setPlaying(true);
    }
  };

  const handleStep = () => {
    setPlaying(false);
    const next = activeIndex + 1;
    if (next >= total) {
      setActiveIndex(-1);
      stepRef.current = 0;
    } else {
      setActiveIndex(next);
      stepRef.current = next + 1;
    }
  };

  const handleReset = () => {
    setPlaying(false);
    setActiveIndex(-1);
    stepRef.current = 0;
  };

  return (
    <section className="py-16 sm:py-24 px-5 relative overflow-hidden" data-pipeline>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-neon-cyan/[0.015] rounded-full blur-[120px]" />
      </div>

      <ScrollReveal>
        <SectionHeading
          id="pipeline"
          title="How DojOps Works"
          subtitle="From prompt to production in eleven automated stages"
        />
      </ScrollReveal>

      {/* Pipeline container */}
      <div className="max-w-[900px] mx-auto">
        <div ref={containerRef} className="relative" style={{ aspectRatio: "5 / 3" }}>
          <PipelineBackground />
          <PipelineSVG activeIndex={activeIndex} />

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

        <PipelineControls
          playing={playing}
          onAuto={handleAuto}
          onStep={handleStep}
          onReset={handleReset}
        />

        <PipelineLog activeIndex={activeIndex} />
      </div>

      <PipelineStatus activeIndex={activeIndex} />
    </section>
  );
}
