export const LINKS = {
  github: "https://github.com/dojops/dojops",
  npm: "https://www.npmjs.com/package/@dojops/cli",
  docs: "https://doc.dojops.ai",
  hub: "https://hub.dojops.ai",
  pixcot: "https://pixcot.com",
} as const;

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "How It Works", href: "#pipeline" },
  { label: "Features", href: "#features" },
  { label: "Skills", href: "#tools" },
  { label: "Docs", href: LINKS.docs, external: true },
  { label: "GitHub", href: LINKS.github, external: true },
];

export const INSTALL_COMMANDS = {
  npm: "npm i -g @dojops/cli",
  brew: "brew tap dojops/tap && brew install dojops",
  curl: "curl -fsSL https://raw.githubusercontent.com/dojops/dojops/main/install.sh | sh",
  docker: "docker run --rm -it -v $PWD:/work -v ~/.dojops:/root/.dojops ghcr.io/dojops/dojops",
} as const;

export interface Feature {
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
}

export const FEATURES: Feature[] = [
  {
    title: "32 Specialist Agents",
    description:
      "You describe the goal, DojOps picks the right agent. Terraform, Kubernetes, CI/CD, security, and more. You can also create your own agents with a single README.",
    icon: "agents",
    featured: true,
  },
  {
    title: "Plan Before You Ship",
    description:
      "Big goals get broken into a task graph with risk levels. You review the full plan before any file is touched. If something fails, pick up where you left off.",
    icon: "plan",
  },
  {
    title: "Zero Hallucinated YAML",
    description:
      "LLM responses are locked to Zod schemas using provider-native JSON modes. Then validated again with terraform validate, hadolint, and kubectl --dry-run.",
    icon: "brain",
  },
  {
    title: "Every Write is Sandboxed",
    description:
      "File writes are atomic and restricted to infrastructure paths. One command rolls everything back. Every action is recorded in a tamper-proof audit log.",
    icon: "shield",
    featured: true,
  },
  {
    title: "10 Scanners. Automated.",
    description:
      "Trivy, Gitleaks, Checkov, Semgrep, Hadolint, ShellCheck, npm/pip audit, SBOM generation, and license scanning. All run before configs go live. Critical findings get auto-fixed.",
    icon: "scan",
  },
  {
    title: "Build & Share Skills",
    description:
      "53 built-in skills covering CI/CD, containers, cloud, monitoring, and security. Need something specific? Write a DOPS manifest, publish to the Hub, or grab community skills. All verified with SHA-256 checksums.",
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
  { name: "Compose", icon: "docker-compose.png" },
  { name: "Dockerfile", icon: "docker.svg" },
  { name: "Nginx", icon: "nginx.svg" },
  { name: "GitLab CI", icon: "gitLab.svg" },
  { name: "Prometheus", icon: "prometheus.svg" },
  { name: "Systemd", icon: "systemd.svg" },
  { name: "Jenkinsfile", icon: "jenkins.svg" },
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
  { name: "Mistral", icon: "mistral.svg" },
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
      "Tell DojOps what you need in plain English, or run arise to generate a full pipeline from scratch.",
    command: "dojops arise --yes",
  },
  {
    step: 2,
    title: "Review",
    description:
      "DojOps builds a task graph, classifies risk, and validates all output against Zod schemas. Nothing is written yet.",
  },
  {
    step: 3,
    title: "Apply",
    description:
      "Sandboxed file writes with approval gates. Automatic backups and a hash-chained audit trail.",
  },
];

export interface PipelineOverviewStep {
  label: string;
  description: string;
  icon: string; // lucide-react icon name
}

export const PIPELINE_OVERVIEW_STEPS: PipelineOverviewStep[] = [
  { label: "Prompt", description: "Describe your goal in plain English", icon: "MessageSquare" },
  { label: "Route", description: "Agent router picks the right specialist", icon: "GitBranch" },
  { label: "Plan", description: "LLM decomposes into a task graph", icon: "LayoutList" },
  { label: "Generate", description: "Structured output with Zod schemas", icon: "Code" },
  { label: "Scan", description: "10 security scanners validate output", icon: "ShieldCheck" },
  { label: "Apply", description: "Sandboxed writes with approval gate", icon: "Play" },
  { label: "Audit", description: "Hash-chained tamper-proof log entry", icon: "FileCheck" },
];

export const TERMINAL_LINES = [
  {
    id: "prompt",
    type: "prompt" as const,
    text: "$ dojops arise --yes",
  },
  { id: "blank-1", type: "info" as const, text: "" },
  { id: "scanning", type: "info" as const, text: "  Scanning repository..." },
  { id: "scanned", type: "success" as const, text: "  \u2713 Node.js detected, npm, no CI" },
  { id: "blank-2", type: "info" as const, text: "" },
  {
    id: "pipeline",
    type: "info" as const,
    text: "  Pipeline: build \u2192 test \u2192 containerize \u2192 deploy",
  },
  { id: "generating", type: "info" as const, text: "  Generating 4 files in parallel..." },
  { id: "blank-3", type: "info" as const, text: "" },
  { id: "task-1", type: "task" as const, text: "  \u2713 .github/workflows/ci.yml" },
  { id: "task-2", type: "task" as const, text: "  \u2713 Dockerfile" },
  { id: "task-3", type: "task" as const, text: "  \u2713 docker-compose.yml" },
  { id: "task-4", type: "task" as const, text: "  \u2713 manifests/deployment.yaml" },
  { id: "blank-4", type: "info" as const, text: "" },
  { id: "done", type: "done" as const, text: "  Pipeline generated: 4/4 tasks in 24s" },
];

export interface SecurityFeature {
  title: string;
  description: string;
}

export const SECURITY_FEATURES: SecurityFeature[] = [
  {
    title: "Structured output enforcement",
    description:
      "Provider-native JSON modes so LLM output is always valid and parseable. No guessing, no fixing.",
  },
  {
    title: "Schema validation",
    description:
      "Every response goes through Zod safeParse(). Markdown stripping, JSON parsing, type checks. Nothing gets used without passing.",
  },
  {
    title: "Deep verification",
    description:
      "External tool validation: terraform validate, hadolint, kubectl --dry-run, plus built-in structure lints for GitHub Actions and GitLab CI.",
  },
  {
    title: "Policy engine",
    description:
      "ExecutionPolicy controls which paths are allowed, which are denied, env vars, timeouts, and file size limits. Writes are restricted to infrastructure paths only.",
  },
  {
    title: "Approval workflows",
    description:
      "You see a diff preview before every write. Auto-approve, auto-deny, or wire up custom callbacks for CI/CD. High-risk plans need explicit confirmation.",
  },
  {
    title: "Sandboxed execution",
    description:
      "Path restrictions, size limits, atomic writes via temp + rename, .bak backups, per-file audit logging. PID-based locking prevents concurrent mutations.",
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
  description: string;
}

// Tuple format [id, label, description] breaks CPD structural repetition
const PIPELINE_STAGE_DEFS: [string, string, string][] = [
  ["goal", "Goal", "Describe your infrastructure goal in plain English"],
  ["planner", "Planner", "LLM decomposes goal into tasks with risk classification"],
  ["graph", "Graph", "Dependency-aware topological execution graph"],
  ["executor", "Executor", "SafeExecutor applies policy engine and timeout checks"],
  ["generate", "Generate", "LLM generates configs with structured Zod output"],
  ["verify", "Verify", "External tool validation (terraform, hadolint, ansible)"],
  ["critic", "Critic", "CriticAgent reviews against best practices"],
  ["repair", "Repair", "Auto-fix failures and re-generate via repair loop"],
  ["execute", "Execute", "Sandboxed atomic writes with approval gate"],
  ["audit", "Audit", "Hash-chained JSONL with tamper detection"],
  ["memory", "Memory", "Persist execution results for future context"],
];

export const PIPELINE_STAGES: PipelineStage[] = PIPELINE_STAGE_DEFS.map(
  ([id, label, description]) => ({ id, label, description }),
);

export interface HighlightStat {
  value: string;
  label: string;
}

export const HIGHLIGHT_STATS: HighlightStat[] = [
  { value: "53", label: "DevOps Skills" },
  { value: "32", label: "Specialist Agents" },
  { value: "10", label: "Security Scanners" },
  { value: "7", label: "LLM Providers" },
  { value: "8", label: "Security Layers" },
  { value: "21", label: "API Endpoints" },
];
