import type { Translations } from "./translations";

export const en: Translations = {
  nav: {
    howItWorks: "How It Works",
    features: "Features",
    skills: "Skills",
    docs: "Docs",
    github: "GitHub",
    getStarted: "Get Started",
    toggleMenu: "Toggle menu",
    lightMode: "Switch to light mode",
    darkMode: "Switch to dark mode",
  },
  hero: {
    badge: "AI DevOps Engine",
    headlinePart1: "From prompt to ",
    headlinePart2: "production",
    subtitle:
      "Generate configs, verify them, scan for issues, apply with approval. Everything sandboxed.",
    getStarted: "Get Started",
    viewOnGithub: "View on GitHub",
    downloaded: "downloaded",
  },
  stats: [
    { value: "12+", label: "DevOps Skills" },
    { value: "17", label: "Specialist Agents" },
    { value: "10", label: "Security Scanners" },
    { value: "6", label: "LLM Providers" },
    { value: "8", label: "Security Layers" },
    { value: "21", label: "API Endpoints" },
  ],
  features: {
    title: "Built for real infrastructure",
    subtitle: "Every step is validated, sandboxed, and logged before anything touches your repo",
    items: [
      {
        title: "17 Specialist Agents",
        description:
          "You describe the goal, DojOps picks the right agent. Terraform, Kubernetes, CI/CD, security, and more. You can also create your own agents with a single README.",
      },
      {
        title: "Plan Before You Ship",
        description:
          "Big goals get broken into a task graph with risk levels. You review the full plan before any file is touched. If something fails, pick up where you left off.",
      },
      {
        title: "Zero Hallucinated YAML",
        description:
          "LLM responses are locked to Zod schemas using provider-native JSON modes. Then validated again with terraform validate, hadolint, and kubectl --dry-run.",
      },
      {
        title: "Every Write is Sandboxed",
        description:
          "File writes are atomic and restricted to infrastructure paths. One command rolls everything back. Every action is recorded in a tamper-proof audit log.",
      },
      {
        title: "10 Scanners. Automated.",
        description:
          "Trivy, Gitleaks, Checkov, Semgrep, Hadolint, ShellCheck, npm/pip audit, SBOM generation, and license scanning. All run before configs go live. Critical findings get auto-fixed.",
      },
      {
        title: "Build & Share Skills",
        description:
          "Built-in skills for the common stuff. Need something specific? Write a DOPS manifest, publish to the Hub, or grab community skills. All verified with SHA-256 checksums.",
      },
    ],
  },
  pipeline: {
    title: "Seven steps. Zero YAML.",
    subtitle: "From natural language to production-ready configs in seconds",
    steps: [
      { label: "Prompt", description: "Describe your goal in plain English" },
      { label: "Route", description: "Agent router picks the right specialist" },
      { label: "Plan", description: "LLM decomposes into a task graph" },
      { label: "Generate", description: "Structured output with Zod schemas" },
      { label: "Scan", description: "10 security scanners validate output" },
      { label: "Apply", description: "Sandboxed writes with approval gate" },
      { label: "Audit", description: "Hash-chained tamper-proof log entry" },
    ],
    initializing: "Initializing...",
    initializingFull: "Initializing pipeline...",
    complete: "Complete",
    completeFull: "All 11 stages complete",
  },
  pipelineFlow: {
    title: "From Prompt to Production",
    subtitle: "Eleven stages between your request and a deployed config. Here's what happens.",
    active: "ACTIVE",
    stages: [
      { label: "Goal", description: "Describe your infrastructure goal in plain English" },
      { label: "Planner", description: "LLM decomposes goal into tasks with risk classification" },
      { label: "Graph", description: "Dependency-aware topological execution graph" },
      { label: "Executor", description: "SafeExecutor applies policy engine and timeout checks" },
      { label: "Generate", description: "LLM generates configs with structured Zod output" },
      { label: "Verify", description: "External tool validation (terraform, hadolint, ansible)" },
      { label: "Critic", description: "CriticAgent reviews against best practices" },
      { label: "Repair", description: "Auto-fix failures and re-generate via repair loop" },
      { label: "Execute", description: "Sandboxed atomic writes with approval gate" },
      { label: "Audit", description: "Hash-chained JSONL with tamper detection" },
      { label: "Memory", description: "Persist execution results for future context" },
    ],
  },
  terminal: {
    prompt: '$ dojops plan "Set up CI/CD for Node.js with Docker"',
    routing: "  Routing to specialist agent...",
    routed: "  \u2713 Routed to cicd-specialist",
    decomposing: "  Decomposing goal into tasks...",
    tasksPlanned: "  \u2713 3 tasks planned (risk: LOW)",
    task1: "  #1  github-actions   Create CI workflow",
    task2: "  #2  dockerfile       Build Docker image",
    task3: "  #3  docker-compose   Service orchestration",
    ready: "  Ready. Run dojops apply to execute.",
  },
  tools: {
    title: "Built-in skills. Plug-and-play simplicity.",
    subtitle: "12+ built-in DevOps skills, 6 LLM providers. Works out of the box.",
    devopsModules: "DevOps Skills",
    llmProviders: "LLM Providers",
    noVendorLockIn: "Bring your own model. No vendor lock-in. Run fully local with Ollama.",
  },
  security: {
    title: "8 layers of defense",
    subtitle:
      "Enough security layers that your compliance team won't flinch at AI-generated configs",
    items: [
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
    ],
  },
  install: {
    getStarted: "Get Started",
    tabComments: {
      npm: "# Install globally via npm",
      brew: "# macOS / Linux via Homebrew",
      curl: "# One-liner. Works everywhere.",
      docker: "# Mount project + config so nothing is lost",
    },
    whatsNext: "What's next",
    nextSteps: [
      { step: "01", label: "Configure your LLM provider", cmd: "dojops config" },
      { step: "02", label: "Initialize in your project", cmd: "dojops init" },
      {
        step: "03",
        label: "Describe what you need",
        cmd: 'dojops "Create a Terraform config for S3"',
      },
    ],
    copyToClipboard: "Copy to clipboard",
  },
  cta: {
    badge: "OPEN SOURCE",
    heading1: "Ready to stop writing",
    heading2: "YAML by hand?",
    description: "One install, no telemetry, runs anywhere you have Node.",
    getStarted: "Get Started",
    readDocs: "Read the Docs",
  },
  newsletter: {
    badge: "Stay in the loop",
    heading: "Get updates on DojOps",
    description:
      "New skills, provider integrations, and releases. Straight to your inbox. No spam, unsubscribe anytime.",
    placeholder: "you@company.com",
    subscribe: "Subscribe",
    subscribing: "Subscribing...",
    successMessage: "Check your inbox to verify your subscription.",
    reachUs: "Or reach us at",
  },
  footer: {
    product: "Product",
    resources: "Resources",
    community: "Community",
    getStarted: "Get Started",
    features: "Features",
    howItWorks: "How It Works",
    skills: "Skills",
    documentation: "Documentation",
    hub: "DojOps Hub",
    npmPackage: "npm Package",
    github: "GitHub",
    contributing: "Contributing",
    issues: "Issues",
    brandDescription:
      "Generate, validate, and apply infrastructure configs with AI. Open source, MIT licensed.",
    copyright: "DojOps \u00b7 MIT License",
    createdBy: "Created by",
  },
};
