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
  { label: "How It Works", href: "#how-it-works" },
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
