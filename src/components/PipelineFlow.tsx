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
  FileText,
  Database,
  Check,
} from "lucide-react";
import { PIPELINE_STAGES } from "@/lib/constants";
import { useTranslation } from "@/i18n";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

/* ═══════════════════════════════════════════════════════════════
   DATA — 11-stage pipeline: 4-3-4 S-curve layout
   Base coordinate space: 900 × 540 (scaled to fit container)
   ═══════════════════════════════════════════════════════════════ */

const BASE_W = 900;
const BASE_H = 540;

type Category = "input" | "ai" | "check" | "action";

const CATEGORY_COLORS: Record<Category, string> = {
  input: "#60a5fa",
  ai: "var(--accent)",
  check: "var(--warning-fg)",
  action: "var(--success-fg)",
};

interface NodeDef {
  readonly icon: ReactNode;
  readonly iconAnim: string;
  readonly category: Category;
  readonly x: number;
  readonly y: number;
  readonly sx: number;
  readonly sy: number;
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

const STAGE_INTERVAL = 600;

/* ═══════════════════════════════════════════════════════════════
   NODE CARD — style computation extracted to reduce complexity
   ═══════════════════════════════════════════════════════════════ */

type NodeState = "inactive" | "active" | "done";

interface NodeCardProps {
  readonly node: NodeDef;
  readonly stage: (typeof PIPELINE_STAGES)[number];
  readonly index: number;
  readonly state: NodeState;
}

interface NodeStyles {
  readonly cardBg: string;
  readonly topBorder: string;
  readonly sideBorder: string;
  readonly boxShadow: string;
  readonly badgeBg: string;
  readonly badgeBorder: string;
  readonly badgeColor: string;
  readonly iconBg: string;
  readonly iconBorder: string;
  readonly iconColor: string;
  readonly labelColor: string;
}

function computeActiveStyles(catColor: string): NodeStyles {
  return {
    cardBg: "var(--accent-subtle)",
    topBorder: `2px solid ${catColor}`,
    sideBorder: "1px solid var(--accent-border)",
    boxShadow: "var(--shadow-md)",
    badgeBg: catColor,
    badgeBorder: "1px solid var(--border-primary)",
    badgeColor: "var(--bg-card)",
    iconBg: "var(--accent-subtle)",
    iconBorder: "1px solid var(--accent-border)",
    iconColor: "var(--accent)",
    labelColor: "var(--accent-text)",
  };
}

function computeDoneStyles(catColor: string): NodeStyles {
  return {
    cardBg: "var(--success-bg)",
    topBorder: `2px solid ${catColor}`,
    sideBorder: "1px solid var(--border-primary)",
    boxShadow: "var(--shadow-sm)",
    badgeBg: "var(--success-bg)",
    badgeBorder: "1px solid var(--border-primary)",
    badgeColor: "var(--success-fg)",
    iconBg: "var(--success-bg)",
    iconBorder: "1px solid var(--border-secondary)",
    iconColor: "var(--success-fg)",
    labelColor: "var(--text-secondary)",
  };
}

const INACTIVE_STYLES: NodeStyles = {
  cardBg: "var(--bg-card)",
  topBorder: "2px solid var(--border-primary)",
  sideBorder: "1px solid var(--border-primary)",
  boxShadow: "var(--shadow-sm)",
  badgeBg: "var(--bg-secondary)",
  badgeBorder: "1px solid var(--border-primary)",
  badgeColor: "var(--text-tertiary)",
  iconBg: "var(--bg-secondary)",
  iconBorder: "1px solid var(--border-primary)",
  iconColor: "var(--text-tertiary)",
  labelColor: "var(--text-tertiary)",
};

function computeNodeStyles(state: NodeState, category: Category): NodeStyles {
  const catColor = CATEGORY_COLORS[category];
  if (state === "active") return computeActiveStyles(catColor);
  if (state === "done") return computeDoneStyles(catColor);
  return INACTIVE_STYLES;
}

function NodeCard({
  node,
  index,
  state,
  lite,
  translatedLabel,
}: Readonly<NodeCardProps & { lite: boolean; translatedLabel: string }>) {
  const { t } = useTranslation();
  const s = computeNodeStyles(state, node.category);
  const isActive = state === "active";
  const isDone = state === "done";

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
          background: s.cardBg,
          backdropFilter: lite ? "none" : "blur(20px)",
          WebkitBackdropFilter: lite ? "none" : "blur(20px)",
          borderTop: s.topBorder,
          borderLeft: s.sideBorder,
          borderRight: s.sideBorder,
          borderBottom: s.sideBorder,
          borderRadius: 14,
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          gap: 5,
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: s.boxShadow,
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
            background: s.badgeBg,
            border: s.badgeBorder,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: index >= 9 ? 7.5 : 9,
            fontWeight: 700,
            color: s.badgeColor,
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
              border: "1px solid var(--accent-border)",
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
            background: s.iconBg,
            border: s.iconBorder,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: s.iconColor,
            transition: "all 0.5s",
            animation: isActive ? `${node.iconAnim} 0.6s ease-in-out infinite` : "none",
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
            color: s.labelColor,
            transition: "color 0.5s",
            fontFamily: "var(--font-mono), monospace",
            lineHeight: 1,
          }}
        >
          {translatedLabel}
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
                background: "var(--accent)",
                animation: "pipeline-card-pulse 1s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: 6,
                color: "var(--accent-text)",
                fontFamily: "var(--font-mono), monospace",
                letterSpacing: "0.5px",
              }}
            >
              {t.pipelineFlow.active}
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

function PipelineSVG({ activeIndex, lite }: Readonly<{ activeIndex: number; lite: boolean }>) {
  return (
    <svg
      viewBox="-10 0 1020 600"
      className="absolute inset-0 w-full h-full z-[1]"
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
    >
      {SEGMENTS.map((path, i) => {
        const segActive = i < activeIndex;
        const segCurrent = i === activeIndex - 1;

        return (
          <g key={path}>
            {/* Layer 2: Track line */}
            <path
              d={path}
              fill="none"
              stroke={segActive ? "var(--accent-border)" : "var(--border-secondary)"}
              strokeWidth={segActive ? 2 : 1.5}
              strokeLinecap="round"
              style={{ transition: "stroke 0.6s, stroke-width 0.6s" }}
            />

            {/* Layer 3: Active core line */}
            {segActive && (
              <path
                d={path}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1.5}
                strokeLinecap="round"
                style={{ opacity: segCurrent ? 1 : 0.6 }}
              />
            )}

            {/* Direction arrow */}
            <g
              transform={`translate(${ARROWS[i].x}, ${ARROWS[i].y}) rotate(${ARROWS[i].r})`}
              style={{
                opacity: segActive ? 0.6 : 0.15,
                transition: "opacity 0.6s",
              }}
            >
              <polygon
                points="-4,-4 5,0 -4,4"
                fill={segActive ? "var(--accent)" : "var(--text-tertiary)"}
              />
            </g>

            {/* Flow particles */}
            {segActive && !lite && (
              <>
                <circle r="3" fill="var(--accent)" opacity="0.8">
                  <animateMotion dur="2s" repeatCount="indefinite" path={path} />
                </circle>
                <circle r="2" fill="var(--accent)" opacity="0.5">
                  <animateMotion dur="2.5s" begin="0.8s" repeatCount="indefinite" path={path} />
                </circle>
                <circle r="1.5" fill="var(--accent)" opacity="0.3">
                  <animateMotion dur="3s" begin="0.4s" repeatCount="indefinite" path={path} />
                </circle>
              </>
            )}
            {segActive && lite && (
              <circle r="3" fill="var(--accent)" opacity="0.7">
                <animateMotion dur="2s" repeatCount="indefinite" path={path} />
              </circle>
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
            stroke="var(--accent)"
            strokeWidth={1.2}
            strokeDasharray="5 4"
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-opacity"
              values="0;0.35;0.35;0"
              dur="1.5s"
              repeatCount="1"
              fill="freeze"
            />
          </path>
          <g transform="translate(750, 300) rotate(0)">
            <polygon points="-3,-3 4,0 -3,3" fill="var(--accent)">
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
  id: `bp-${Math.round(seededRandom(i * 3 + 1) * 1e4)}-${Math.round(seededRandom(i * 3 + 2) * 1e4)}`,
  left: Math.round((8 + seededRandom(i * 3 + 1) * 84) * 100) / 100,
  top: Math.round((5 + seededRandom(i * 3 + 2) * 90) * 100) / 100,
  dur: Math.round((6 + seededRandom(i * 3 + 3) * 8) * 100) / 100,
  delay: Math.round(seededRandom(i * 3 + 4) * 10 * 100) / 100,
}));

function PipelineBackground({ lite }: Readonly<{ lite: boolean }>) {
  // On mobile: fewer particles (6 instead of 20), no grid
  const particles = lite ? BG_PARTICLES.slice(0, 6) : BG_PARTICLES;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {!lite && (
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          <defs>
            <pattern id="pipeline-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="var(--border-secondary)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pipeline-grid)" />
        </svg>
      )}

      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "var(--accent)",
            opacity: 0,
            animation: `bg-particle-drift ${p.dur}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STAGE DESCRIPTION — responsive status bar below pipeline
   ═══════════════════════════════════════════════════════════════ */

const MONO_FONT = "var(--font-mono), monospace";

function StageInfoContent({
  activeIndex,
  done,
  compact,
  color,
  stage,
}: Readonly<{
  activeIndex: number;
  done: boolean;
  compact: boolean;
  color: string;
  stage: (typeof PIPELINE_STAGES)[number] | null;
}>) {
  const { t } = useTranslation();
  const fontSize = compact ? 8 : 10;

  if (activeIndex < 0) {
    return (
      <span
        style={{
          fontSize,
          fontFamily: MONO_FONT,
          color: "var(--text-tertiary)",
          letterSpacing: "0.5px",
        }}
      >
        {compact ? t.pipeline.initializing : t.pipeline.initializingFull}
      </span>
    );
  }

  if (done) {
    return (
      <span
        style={{
          fontSize,
          fontFamily: MONO_FONT,
          color: "var(--success-fg)",
          letterSpacing: "0.5px",
        }}
      >
        {compact ? t.pipeline.complete : t.pipeline.completeFull}
      </span>
    );
  }

  return (
    <>
      <span
        style={{
          fontSize,
          fontWeight: 700,
          fontFamily: MONO_FONT,
          color,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {(activeIndex >= 0 && t.pipelineFlow.stages[activeIndex]?.label) || stage?.label}
      </span>
      {!compact && (
        <span
          style={{
            fontSize: 10,
            fontFamily: MONO_FONT,
            color: "var(--text-secondary)",
            letterSpacing: "0.3px",
          }}
        >
          {(activeIndex >= 0 && t.pipelineFlow.stages[activeIndex]?.description) ||
            stage?.description}
        </span>
      )}
    </>
  );
}

function ProgressDots({
  activeIndex,
  done,
  compact,
}: Readonly<{ activeIndex: number; done: boolean; compact: boolean }>) {
  const dotSize = compact ? 3 : 4;
  return (
    <div style={{ display: "flex", gap: compact ? 2 : 3 }}>
      {PIPELINE_STAGES.map((s, i) => {
        const filled = i <= activeIndex;
        const isCurrent = i === activeIndex && !done;
        let bg = "var(--border-secondary)";
        if (filled && done) bg = "var(--success-fg)";
        else if (filled) bg = "var(--accent)";
        return (
          <div
            key={s.id}
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              background: bg,
              opacity: (() => {
                if (isCurrent) return 1;
                if (filled) return 0.8;
                return 0.4;
              })(),
              transition: "all 0.3s",
            }}
          />
        );
      })}
    </div>
  );
}

function StageDescription({
  activeIndex,
  compact,
}: Readonly<{ activeIndex: number; compact: boolean }>) {
  const total = PIPELINE_STAGES.length;
  const done = activeIndex >= total - 1;
  const stage = activeIndex >= 0 ? PIPELINE_STAGES[activeIndex] : null;
  const node = activeIndex >= 0 ? NODES[activeIndex] : null;
  const color = node ? CATEGORY_COLORS[node.category] : "#4a6a7a";

  return (
    <div className="flex justify-center mt-4 sm:mt-6 px-2 z-20 relative">
      <div
        style={{
          display: "inline-flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: compact ? 6 : 12,
          padding: compact ? "6px 12px" : "8px 20px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
          borderRadius: compact ? 14 : 20,
          minHeight: compact ? 32 : 38,
          transition: "all 0.4s",
          maxWidth: "100%",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <ProgressDots activeIndex={activeIndex} done={done} compact={compact} />

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: compact ? 10 : 14,
            background: "var(--border-primary)",
          }}
        />

        {/* Stage info */}
        <div style={{ display: "flex", alignItems: "center", gap: compact ? 4 : 8 }}>
          <StageInfoContent
            activeIndex={activeIndex}
            done={done}
            compact={compact}
            color={color}
            stage={stage}
          />
        </div>
      </div>
    </div>
  );
}

function getNodeState(nodeIndex: number, activeIndex: number): NodeState {
  if (activeIndex < 0) return "inactive";
  if (nodeIndex === activeIndex) return "active";
  if (nodeIndex < activeIndex) return "done";
  return "inactive";
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE — simplified vertical timeline (replaces diagram < sm)
   ═══════════════════════════════════════════════════════════════ */

function MobilePipeline() {
  const { t } = useTranslation();
  return (
    <div className="sm:hidden max-w-sm mx-auto px-2">
      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute left-[13px] top-5 bottom-5 w-px bg-border-secondary" />
        <div className="space-y-1">
          {PIPELINE_STAGES.map((stage, i) => {
            const translated = t.pipelineFlow.stages[i];
            return (
              <div key={stage.id} className="flex items-start gap-3 py-2 relative">
                <div className="w-7 h-7 rounded-lg bg-accent-subtle border border-accent-border flex items-center justify-center shrink-0 z-10">
                  <span className="text-[10px] font-bold text-accent-text font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-semibold text-text-primary leading-tight">
                    {translated?.label ?? stage.label}
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                    {translated?.description ?? stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT — responsive via CSS scale transform
   ═══════════════════════════════════════════════════════════════ */

export default function PipelineFlow() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [started, setStarted] = useState(false);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive: measure container and compute scale factor
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      setScale(Math.min(1, w / BASE_W));
      setIsMobile(w < 600);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

  // Sequential activation loop (flattened to avoid deep nesting)
  useEffect(() => {
    if (!started) return;
    const total = PIPELINE_STAGES.length;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    let current = 0;

    function tick() {
      if (cancelled) return;
      if (current === total) {
        timer = setTimeout(reset, 3500);
        return;
      }
      setActiveIndex(current);
      current += 1;
      timer = setTimeout(tick, STAGE_INTERVAL);
    }

    function reset() {
      if (cancelled) return;
      setActiveIndex(-1);
      current = 0;
      timer = setTimeout(tick, 1200);
    }

    timer = setTimeout(tick, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [started]);

  const compact = scale < 0.65;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-5 relative overflow-hidden" data-pipeline>
      <ScrollReveal>
        <SectionHeading
          id="pipeline"
          title={t.pipelineFlow.title}
          subtitle={t.pipelineFlow.subtitle}
        />
      </ScrollReveal>

      {/* Mobile: simplified vertical timeline */}
      <MobilePipeline />

      {/* Desktop/Tablet: animated pipeline diagram */}
      <div
        ref={containerRef}
        className="hidden sm:block relative max-w-[900px] mx-auto overflow-hidden"
      >
        {/* Aspect-ratio spacer: maintains height as container scales */}
        <div style={{ paddingTop: `${(BASE_H / BASE_W) * 100}%` }} />

        {/* Fixed-size inner layer, CSS-scaled to fit container */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: BASE_W,
            height: BASE_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <PipelineBackground lite={isMobile} />
          <PipelineSVG activeIndex={activeIndex} lite={isMobile} />

          {NODES.map((node, i) => (
            <NodeCard
              key={PIPELINE_STAGES[i].id}
              node={node}
              stage={PIPELINE_STAGES[i]}
              index={i}
              state={getNodeState(i, activeIndex)}
              lite={isMobile}
              translatedLabel={t.pipelineFlow.stages[i]?.label ?? PIPELINE_STAGES[i].label}
            />
          ))}
        </div>
      </div>

      <div className="hidden sm:block">
        <StageDescription activeIndex={activeIndex} compact={compact} />
      </div>
    </section>
  );
}
