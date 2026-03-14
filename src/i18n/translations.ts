// ── Translation type & locale dictionaries ──────────────────────────
// All user-visible strings live here. Components access them via useTranslation().

export type Locale = "en" | "fr" | "zh";

export const SUPPORTED_LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "zh", label: "中文" },
];

export interface FeatureT {
  title: string;
  description: string;
}

export interface PipelineStepT {
  label: string;
  description: string;
}

export interface SecurityFeatureT {
  title: string;
  description: string;
}

export interface HighlightStatT {
  value: string;
  label: string;
}

export interface NextStepT {
  step: string;
  label: string;
  cmd: string;
}

export interface FooterLinksT {
  product: string;
  resources: string;
  community: string;
  getStarted: string;
  features: string;
  howItWorks: string;
  skills: string;
  documentation: string;
  hub: string;
  npmPackage: string;
  github: string;
  contributing: string;
  issues: string;
}

export interface Translations {
  // Navigation
  nav: {
    howItWorks: string;
    features: string;
    skills: string;
    docs: string;
    github: string;
    getStarted: string;
    toggleMenu: string;
    lightMode: string;
    darkMode: string;
  };
  // Hero section
  hero: {
    badge: string;
    headlinePart1: string;
    headlinePart2: string;
    subtitle: string;
    getStarted: string;
    viewOnGithub: string;
    downloaded: string;
  };
  // Highlight stats
  stats: HighlightStatT[];
  // Features section
  features: {
    title: string;
    subtitle: string;
    items: FeatureT[];
  };
  // Pipeline / How It Works
  pipeline: {
    title: string;
    subtitle: string;
    steps: PipelineStepT[];
    initializing: string;
    initializingFull: string;
    complete: string;
    completeFull: string;
  };
  // Pipeline Flow (11-stage animated diagram)
  pipelineFlow: {
    title: string;
    subtitle: string;
    active: string;
    stages: PipelineStepT[];
  };
  // Terminal demo
  terminal: {
    prompt: string;
    routing: string;
    routed: string;
    decomposing: string;
    tasksPlanned: string;
    task1: string;
    task2: string;
    task3: string;
    ready: string;
  };
  // Tools grid
  tools: {
    title: string;
    subtitle: string;
    devopsModules: string;
    llmProviders: string;
    noVendorLockIn: string;
  };
  // Security
  security: {
    title: string;
    subtitle: string;
    items: SecurityFeatureT[];
  };
  // Install section
  install: {
    getStarted: string;
    tabComments: {
      npm: string;
      brew: string;
      curl: string;
      docker: string;
    };
    whatsNext: string;
    nextSteps: NextStepT[];
    copyToClipboard: string;
  };
  // CTA section
  cta: {
    badge: string;
    heading1: string;
    heading2: string;
    description: string;
    getStarted: string;
    readDocs: string;
  };
  // Newsletter section
  newsletter: {
    badge: string;
    heading: string;
    description: string;
    placeholder: string;
    subscribe: string;
    subscribing: string;
    successMessage: string;
    reachUs: string;
  };
  // Footer
  footer: FooterLinksT & {
    brandDescription: string;
    copyright: string;
    createdBy: string;
  };
}
