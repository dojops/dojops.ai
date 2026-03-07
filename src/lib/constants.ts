export const LINKS = {
  github: "https://github.com/dojops/dojops",
  npm: "https://www.npmjs.com/package/@dojops/cli",
  docs: "https://doc.dojops.ai",
  hub: "https://hub.dojops.ai",
} as const;

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "How It Works", href: "#pipeline" },
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#tools" },
  { label: "Docs", href: LINKS.docs, external: true },
  { label: "GitHub", href: LINKS.github, external: true },
];

export const INSTALL_COMMANDS = {
  npm: "npm i -g @dojops/cli",
  curl: "curl -fsSL https://raw.githubusercontent.com/dojops/dojops/main/install.sh | sh",
  docker: "docker run --rm -it -v $PWD:/work -v ~/.dojops:/root/.dojops ghcr.io/dojops/dojops",
} as const;

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export const FEATURES: Feature[] = [
  {
    title: "16 Specialist Agents",
    description:
      "One prompt, sixteen experts. DojOps routes your request to the right specialist \u2014 Terraform, Kubernetes, CI/CD, security, and more. Create custom agents with a single README.",
    icon: "agents",
  },
  {
    title: "Plan Before You Ship",
    description:
      "Complex goals become structured task graphs with risk classification. Review the full plan before a single file is touched. If something fails, resume where you left off.",
    icon: "plan",
  },
  {
    title: "Zero Hallucinated YAML",
    description:
      "Every LLM response is locked to Zod schemas via provider-native JSON modes. Then validated again with terraform validate, hadolint, and kubectl --dry-run.",
    icon: "brain",
  },
  {
    title: "Every Write is Sandboxed",
    description:
      "File writes are atomic, restricted to infrastructure paths, and gated by policy. One command rolls everything back. Every action lands in a tamper-proof audit log.",
    icon: "shield",
  },
  {
    title: "9 Scanners. Automated.",
    description:
      "Trivy, Gitleaks, Checkov, Semgrep, Hadolint, ShellCheck, npm/pip audit, and SBOM generation \u2014 all run before configs go live. Auto-fix critical findings with AI-powered remediation.",
    icon: "scan",
  },
  {
    title: "Build & Share Modules",
    description:
      "12 built-in modules cover the essentials. Need more? Create custom modules with a declarative DOPS manifest, publish them to the DojOps Hub, and install community modules with SHA-256 integrity verification.",
    icon: "plugin",
  },
];

export interface Tool {
  name: string;
  icon: string;
}

export const DEVOPS_TOOLS: Tool[] = [
  { name: "GitHub Actions", icon: "github-actions.svg" },
  { name: "Terraform", icon: "terraform.svg" },
  { name: "Kubernetes", icon: "kubernetes.svg" },
  { name: "Helm", icon: "helm.svg" },
  { name: "Ansible", icon: "ansible.svg" },
  { name: "Docker Compose", icon: "docker-compose.png" },
  { name: "Dockerfile", icon: "docker.svg" },
  { name: "Nginx", icon: "nginx.svg" },
  { name: "Makefile", icon: "makefile.svg" },
  { name: "GitLab CI", icon: "gitLab.svg" },
  { name: "Prometheus", icon: "prometheus.svg" },
  { name: "Systemd", icon: "systemd.svg" },
];

export interface Provider {
  name: string;
  icon: string;
}

export const LLM_PROVIDERS: Provider[] = [
  { name: "OpenAI", icon: "openai.svg" },
  { name: "Anthropic", icon: "anthropic.svg" },
  { name: "Ollama", icon: "ollama.svg" },
  { name: "DeepSeek", icon: "deepseek.svg" },
  { name: "Google Gemini", icon: "gemini.svg" },
  { name: "GitHub Copilot", icon: "github-copilot.svg" },
];

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  command?: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: 1,
    title: "Describe",
    description:
      "Tell DojOps what you need in plain English. It selects the right specialist agent and the best tools for the job.",
    command: 'dojops "Create a CI pipeline for Node.js with Docker deploy"',
  },
  {
    step: 2,
    title: "Review",
    description:
      "DojOps builds a dependency-aware task graph, classifies risk, and validates every output against Zod schemas \u2014 before anything is written.",
  },
  {
    step: 3,
    title: "Apply",
    description:
      "Execute through sandboxed file operations with approval workflows. Atomic writes, automatic backups, and a hash-chained audit trail.",
  },
];

export const TERMINAL_LINES = [
  {
    id: "prompt",
    type: "prompt" as const,
    text: '$ dojops plan "Set up CI/CD for Node.js with Docker"',
  },
  { id: "blank-1", type: "info" as const, text: "" },
  { id: "routing", type: "info" as const, text: "  Routing to specialist agent..." },
  { id: "routed", type: "success" as const, text: "  \u2713 Routed to cicd-specialist" },
  { id: "blank-2", type: "info" as const, text: "" },
  { id: "decomposing", type: "info" as const, text: "  Decomposing goal into tasks..." },
  { id: "tasks-planned", type: "success" as const, text: "  \u2713 3 tasks planned (risk: LOW)" },
  { id: "blank-3", type: "info" as const, text: "" },
  { id: "task-1", type: "task" as const, text: "  #1  github-actions   Create CI workflow" },
  { id: "task-2", type: "task" as const, text: "  #2  dockerfile       Build Docker image" },
  { id: "task-3", type: "task" as const, text: "  #3  docker-compose   Service orchestration" },
  { id: "blank-4", type: "info" as const, text: "" },
  { id: "done", type: "done" as const, text: "  Ready. Run dojops apply to execute." },
];

export interface SecurityFeature {
  title: string;
  description: string;
}

export const SECURITY_FEATURES: SecurityFeature[] = [
  {
    title: "Structured output enforcement",
    description:
      "Provider-native JSON modes ensure LLM output is always valid and parseable. No guessing, no fixing.",
  },
  {
    title: "Schema validation",
    description:
      "Every response validated against Zod schemas via safeParse(). Markdown stripping, JSON parsing, and type checks before any output is used.",
  },
  {
    title: "Deep verification",
    description:
      "External tool validation: terraform validate, hadolint, kubectl --dry-run, plus built-in structure lints for GitHub Actions and GitLab CI.",
  },
  {
    title: "Policy engine",
    description:
      "ExecutionPolicy controls allowed paths, denied paths, environment variables, timeouts, and file size limits. Write allowlist restricts output to infrastructure paths.",
  },
  {
    title: "Approval workflows",
    description:
      "Interactive diff preview before every write. Auto-approve, auto-deny, or custom callbacks for CI/CD. HIGH-risk plans require explicit confirmation.",
  },
  {
    title: "Sandboxed execution",
    description:
      "Path restriction, size limits, atomic writes via temp + rename, .bak backups, and per-file audit logging. PID-based locking prevents concurrent mutations.",
  },
  {
    title: "Immutable audit trail",
    description:
      "Hash-chained JSONL with SHA-256 integrity verification. SIEM-compatible format. Verify tampering with a single command.",
  },
  {
    title: "Zero telemetry",
    description:
      "Nothing leaves your machine except requests to your chosen LLM provider. No analytics, no tracking. Run fully local with Ollama.",
  },
];

export interface PipelineStage {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "prompt",
    label: "Prompt",
    icon: "M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z",
    description: "Describe your goal in plain English",
  },
  {
    id: "route",
    label: "Route",
    icon: "M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5",
    description: "Smart agent selection via keyword scoring",
  },
  {
    id: "plan",
    label: "Plan",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    description: "TaskGraph decomposition with dependency wiring",
  },
  {
    id: "generate",
    label: "Generate",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    description: "LLM generates configs with structured output",
  },
  {
    id: "validate",
    label: "Validate",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    description: "Zod schemas + external tool verification",
  },
  {
    id: "scan",
    label: "Scan",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    description: "10 security scanners run automatically",
  },
  {
    id: "approve",
    label: "Approve",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    description: "Interactive diff preview + approval gate",
  },
  {
    id: "execute",
    label: "Execute",
    icon: "M5 3l14 9-14 9V3z",
    description: "Sandboxed atomic writes with policy checks",
  },
  {
    id: "audit",
    label: "Audit",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    description: "Hash-chained JSONL with tamper detection",
  },
];

export interface HighlightStat {
  value: string;
  label: string;
}

export const HIGHLIGHT_STATS: HighlightStat[] = [
  { value: "12", label: "DevOps Modules" },
  { value: "16", label: "Specialist Agents" },
  { value: "9", label: "Security Scanners" },
  { value: "6", label: "LLM Providers" },
  { value: "8", label: "Security Layers" },
  { value: "19", label: "API Endpoints" },
];
