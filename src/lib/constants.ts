export const LINKS = {
  github: "https://github.com/dojops/dojops",
  npm: "https://www.npmjs.com/package/@dojops/cli",
  docs: "https://docs.dojops.ai",
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
  { label: "Tools", href: "#tools" },
  { label: "Docs", href: LINKS.docs, external: true },
  { label: "GitHub", href: LINKS.github, external: true },
];

export const INSTALL_COMMANDS = {
  npm: "npm i -g @dojops/cli",
  curl: "curl -fsSL https://raw.githubusercontent.com/dojops/dojops/main/install.sh | sh",
  docker: 'docker run --rm -it ghcr.io/dojops/dojops "your prompt"',
} as const;

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export const FEATURES: Feature[] = [
  {
    title: "Intelligent Agent Routing",
    description:
      "16 specialist agents automatically route your request to the right domain expert \u2014 Terraform, Kubernetes, CI/CD, security, and more. Build your own custom agents with a single README file.",
    icon: "agents",
  },
  {
    title: "Plan, Review, Execute",
    description:
      "Decompose complex goals into dependency-aware task graphs. Review the plan, then execute with approval workflows. Resume on failure \u2014 no re-running completed tasks.",
    icon: "plan",
  },
  {
    title: "Schema-Validated Output",
    description:
      "Every LLM response is constrained to Zod schemas via provider-native JSON modes. No hallucinated YAML. No invalid configs. Verified before anything touches disk.",
    icon: "brain",
  },
  {
    title: "Sandboxed Execution",
    description:
      "File writes are atomic, restricted to DevOps paths, and gated by policy and approval. Every action is recorded in a hash-chained audit log you can verify with one command.",
    icon: "shield",
  },
  {
    title: "Security Scanning Built In",
    description:
      "9 scanners (Trivy, Gitleaks, Checkov, Semgrep, Hadolint, ShellCheck, npm/pip audit, SBOM) run before your configs go live. Auto-fix findings with LLM-powered remediation.",
    icon: "scan",
  },
  {
    title: "Extensible Tool System",
    description:
      "12 built-in tools cover the essentials. Need more? Create a custom tool with a declarative manifest and JSON Schema, drop it in your project, and it\u2019s instantly available to all commands.",
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
    title: "Describe what you need",
    description:
      "Tell DojOps what you want in plain English. It routes your request to the right specialist agent and selects the best tools.",
    command: 'dojops "Create a CI pipeline for Node.js with Docker deploy"',
  },
  {
    step: 2,
    title: "Review the plan",
    description:
      "DojOps decomposes your goal into a dependency-aware task graph. Every output is validated against Zod schemas before anything is written.",
  },
  {
    step: 3,
    title: "Apply with confidence",
    description:
      "Execute through sandboxed file operations with approval workflows. Atomic writes, .bak backups, and a hash-chained audit trail you can verify.",
  },
];

export const TERMINAL_LINES = [
  { type: "prompt" as const, text: '$ dojops "Create a GitHub Actions CI for a Node.js app"' },
  { type: "info" as const, text: "" },
  { type: "info" as const, text: "  Routing to cicd-specialist..." },
  { type: "info" as const, text: "  Generating workflow configuration..." },
  { type: "info" as const, text: "" },
  { type: "success" as const, text: "  \u2713 Created .github/workflows/ci.yml" },
  { type: "success" as const, text: "  \u2713 Schema validated" },
  { type: "success" as const, text: "  \u2713 Security scan passed" },
  { type: "success" as const, text: "  \u2713 Audit log recorded" },
  { type: "info" as const, text: "" },
  { type: "done" as const, text: "  Done in 2.8s" },
];

export interface SecurityFeature {
  title: string;
  description: string;
}

export const SECURITY_FEATURES: SecurityFeature[] = [
  {
    title: "Schema-enforced output",
    description: "Every LLM response is validated against Zod schemas via provider-native JSON modes. Invalid output never reaches disk.",
  },
  {
    title: "Sandboxed file writes",
    description: "Atomic writes restricted to DevOps paths. Policy engine controls allowed paths, file sizes, timeouts, and environment variables.",
  },
  {
    title: "Approval workflows",
    description: "Interactive diff preview before every write. Auto-approve, auto-deny, or callback handlers for CI/CD integration.",
  },
  {
    title: "Hash-chained audit trail",
    description: "Append-only JSONL with SHA-256 chain integrity. Verify tampering with a single command. SIEM-compatible format.",
  },
  {
    title: "9 security scanners",
    description: "Trivy, Gitleaks, Checkov, Semgrep, Hadolint, ShellCheck, npm-audit, pip-audit, and SBOM generation \u2014 all built in.",
  },
  {
    title: "No telemetry",
    description: "Zero data collection. Nothing leaves your machine except requests to your chosen LLM provider. Fully local with Ollama.",
  },
];
