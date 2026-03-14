import type { Translations } from "./translations";

export const fr: Translations = {
  nav: {
    howItWorks: "Fonctionnement",
    features: "Fonctions",
    skills: "Skills",
    docs: "Docs",
    github: "GitHub",
    getStarted: "Commencer",
    toggleMenu: "Ouvrir le menu",
    lightMode: "Mode clair",
    darkMode: "Mode sombre",
  },
  hero: {
    badge: "Moteur DevOps IA",
    headlinePart1: "Du prompt \u00e0 la ",
    headlinePart2: "production",
    subtitle:
      "G\u00e9n\u00e9rez des configs, v\u00e9rifiez-les, scannez les probl\u00e8mes, appliquez avec approbation. Tout est isol\u00e9.",
    getStarted: "Commencer",
    viewOnGithub: "Voir sur GitHub",
    downloaded: "t\u00e9l\u00e9chargements",
  },
  stats: [
    { value: "13", label: "Skills DevOps" },
    { value: "17", label: "Agents sp\u00e9cialis\u00e9s" },
    { value: "10", label: "Scanners de s\u00e9curit\u00e9" },
    { value: "6", label: "Fournisseurs LLM" },
    { value: "8", label: "Couches de s\u00e9curit\u00e9" },
    { value: "21", label: "Points d\u2019API" },
  ],
  features: {
    title: "Con\u00e7u pour la vraie infra",
    subtitle:
      "Chaque \u00e9tape est valid\u00e9e, isol\u00e9e et journalis\u00e9e avant de toucher votre d\u00e9p\u00f4t",
    items: [
      {
        title: "17 agents sp\u00e9cialis\u00e9s",
        description:
          "D\u00e9crivez votre objectif, DojOps choisit le bon agent. Terraform, Kubernetes, CI/CD, s\u00e9curit\u00e9, et plus. Cr\u00e9ez vos propres agents avec un simple README.",
      },
      {
        title: "Planifiez avant de livrer",
        description:
          "Les objectifs complexes sont d\u00e9compos\u00e9s en graphe de t\u00e2ches avec niveaux de risque. Relisez le plan complet avant toute modification. En cas d\u2019\u00e9chec, reprenez l\u00e0 o\u00f9 vous en \u00e9tiez.",
      },
      {
        title: "Z\u00e9ro YAML hallucin\u00e9",
        description:
          "Les r\u00e9ponses LLM sont verrouill\u00e9es sur des sch\u00e9mas Zod via les modes JSON natifs. Puis valid\u00e9es avec terraform validate, hadolint et kubectl --dry-run.",
      },
      {
        title: "Chaque \u00e9criture est isol\u00e9e",
        description:
          "\u00c9critures atomiques, restreintes aux chemins d\u2019infra. Une commande annule tout. Chaque action est enregistr\u00e9e dans un journal d\u2019audit inviolable.",
      },
      {
        title: "10 scanners. Automatis\u00e9s.",
        description:
          "Trivy, Gitleaks, Checkov, Semgrep, Hadolint, ShellCheck, npm/pip audit, SBOM et licences. Ex\u00e9cut\u00e9s avant toute mise en production. Les probl\u00e8mes critiques sont corrig\u00e9s automatiquement.",
      },
      {
        title: "Cr\u00e9ez et partagez des skills",
        description:
          "13 skills int\u00e9gr\u00e9s pour les cas courants. Besoin de quelque chose de sp\u00e9cifique ? \u00c9crivez un manifeste DOPS, publiez sur le Hub ou r\u00e9cup\u00e9rez des skills communautaires. Tous v\u00e9rifi\u00e9s par SHA-256.",
      },
    ],
  },
  pipeline: {
    title: "Sept \u00e9tapes. Z\u00e9ro YAML.",
    subtitle:
      "Du langage naturel \u00e0 des configs pr\u00eates pour la production en quelques secondes",
    steps: [
      { label: "Prompt", description: "D\u00e9crivez votre objectif en langage courant" },
      { label: "Routage", description: "Le routeur choisit le bon agent sp\u00e9cialiste" },
      { label: "Plan", description: "Le LLM d\u00e9compose en graphe de t\u00e2ches" },
      {
        label: "G\u00e9n\u00e9ration",
        description: "Sortie structur\u00e9e avec sch\u00e9mas Zod",
      },
      { label: "Scan", description: "10 scanners de s\u00e9curit\u00e9 valident la sortie" },
      {
        label: "Application",
        description: "\u00c9critures isol\u00e9es avec porte d\u2019approbation",
      },
      { label: "Audit", description: "Entr\u00e9e de journal cha\u00een\u00e9e et inviolable" },
    ],
    initializing: "Initialisation...",
    initializingFull: "Initialisation du pipeline...",
    complete: "Termin\u00e9",
    completeFull: "Les 11 étapes sont terminées",
  },
  pipelineFlow: {
    title: "Du Prompt à la Production",
    subtitle: "Onze étapes entre votre requête et une config déployée. Voici ce qui se passe.",
    active: "ACTIF",
    stages: [
      {
        label: "Objectif",
        description: "Décrivez votre objectif d'infrastructure en langage naturel",
      },
      {
        label: "Planificateur",
        description: "Le LLM décompose l'objectif en tâches avec classification des risques",
      },
      {
        label: "Graphe",
        description: "Graphe d'exécution topologique tenant compte des dépendances",
      },
      {
        label: "Exécuteur",
        description: "SafeExecutor applique le moteur de politiques et les limites de temps",
      },
      { label: "Génération", description: "Le LLM génère les configs avec sortie structurée Zod" },
      {
        label: "Vérification",
        description: "Validation par outils externes (terraform, hadolint, ansible)",
      },
      { label: "Critique", description: "CriticAgent vérifie les bonnes pratiques" },
      {
        label: "Réparation",
        description: "Correction automatique et re-génération via boucle de réparation",
      },
      { label: "Exécution", description: "Écritures atomiques isolées avec porte d'approbation" },
      { label: "Audit", description: "JSONL chaîné par hash avec détection de falsification" },
      { label: "Mémoire", description: "Persistance des résultats pour le contexte futur" },
    ],
  },
  terminal: {
    prompt: '$ dojops plan "Configurer CI/CD pour Node.js avec Docker"',
    routing: "  Routage vers l\u2019agent sp\u00e9cialiste...",
    routed: "  \u2713 Rout\u00e9 vers cicd-specialist",
    decomposing: "  D\u00e9composition de l\u2019objectif en t\u00e2ches...",
    tasksPlanned: "  \u2713 3 t\u00e2ches planifi\u00e9es (risque : BAS)",
    task1: "  #1  github-actions   Cr\u00e9er le workflow CI",
    task2: "  #2  dockerfile       Construire l\u2019image Docker",
    task3: "  #3  docker-compose   Orchestration de services",
    ready: "  Pr\u00eat. Lancez dojops apply pour ex\u00e9cuter.",
  },
  tools: {
    title: "Skills int\u00e9gr\u00e9s. Simplicit\u00e9 cl\u00e9 en main.",
    subtitle:
      "13 skills DevOps int\u00e9gr\u00e9s, 6 fournisseurs LLM. Fonctionne imm\u00e9diatement.",
    devopsModules: "Skills DevOps",
    llmProviders: "Fournisseurs LLM",
    noVendorLockIn:
      "Apportez votre propre mod\u00e8le. Aucun verrouillage fournisseur. Fonctionne enti\u00e8rement en local avec Ollama.",
  },
  security: {
    title: "8 couches de d\u00e9fense",
    subtitle:
      "Assez de couches de s\u00e9curit\u00e9 pour que votre \u00e9quipe conformit\u00e9 ne bronche pas face aux configs g\u00e9n\u00e9r\u00e9es par IA",
    items: [
      {
        title: "Sortie structur\u00e9e forc\u00e9e",
        description:
          "Modes JSON natifs des fournisseurs pour que la sortie LLM soit toujours valide et analysable. Pas de devinettes, pas de corrections.",
      },
      {
        title: "Validation de sch\u00e9ma",
        description:
          "Chaque r\u00e9ponse passe par Zod safeParse(). Nettoyage Markdown, parsing JSON, v\u00e9rification de types. Rien n\u2019est utilis\u00e9 sans validation.",
      },
      {
        title: "V\u00e9rification approfondie",
        description:
          "Validation par outils externes : terraform validate, hadolint, kubectl --dry-run, plus des lints int\u00e9gr\u00e9s pour GitHub Actions et GitLab CI.",
      },
      {
        title: "Moteur de politiques",
        description:
          "ExecutionPolicy contr\u00f4le les chemins autoris\u00e9s et refus\u00e9s, les variables d\u2019environnement, les timeouts et les limites de taille. Les \u00e9critures sont restreintes aux chemins d\u2019infra.",
      },
      {
        title: "Flux d\u2019approbation",
        description:
          "Vous voyez un aper\u00e7u des diff\u00e9rences avant chaque \u00e9criture. Approbation auto, refus auto, ou callbacks personnalis\u00e9s pour CI/CD. Les plans \u00e0 haut risque n\u00e9cessitent une confirmation explicite.",
      },
      {
        title: "Ex\u00e9cution isol\u00e9e",
        description:
          "Restrictions de chemins, limites de taille, \u00e9critures atomiques via temp + rename, sauvegardes .bak, journalisation par fichier. Verrouillage PID pour \u00e9viter les mutations concurrentes.",
      },
      {
        title: "Journal d\u2019audit immuable",
        description:
          "JSONL cha\u00een\u00e9 avec v\u00e9rification d\u2019int\u00e9grit\u00e9 SHA-256. Format compatible SIEM. V\u00e9rifiez l\u2019alt\u00e9ration avec une seule commande.",
      },
      {
        title: "Z\u00e9ro t\u00e9l\u00e9m\u00e9trie",
        description:
          "Rien ne quitte votre machine sauf les requ\u00eates vers votre fournisseur LLM choisi. Pas d\u2019analytics, pas de tracking. Fonctionne enti\u00e8rement en local avec Ollama.",
      },
    ],
  },
  install: {
    getStarted: "Commencer",
    tabComments: {
      npm: "# Installation globale via npm",
      brew: "# macOS / Linux via Homebrew",
      curl: "# Une seule ligne. Fonctionne partout.",
      docker: "# Montez le projet + la config pour ne rien perdre",
    },
    whatsNext: "\u00c9tape suivante",
    nextSteps: [
      { step: "01", label: "Configurez votre fournisseur LLM", cmd: "dojops config" },
      { step: "02", label: "Initialisez dans votre projet", cmd: "dojops init" },
      {
        step: "03",
        label: "D\u00e9crivez ce dont vous avez besoin",
        cmd: 'dojops "Cr\u00e9er une config Terraform pour S3"',
      },
    ],
    copyToClipboard: "Copier dans le presse-papiers",
  },
  cta: {
    badge: "OPEN SOURCE",
    heading1: "Pr\u00eat \u00e0 arr\u00eater d\u2019\u00e9crire",
    heading2: "du YAML \u00e0 la main ?",
    description:
      "Une installation, z\u00e9ro t\u00e9l\u00e9m\u00e9trie, fonctionne partout o\u00f9 vous avez Node.",
    getStarted: "Commencer",
    readDocs: "Lire la doc",
  },
  newsletter: {
    badge: "Restez informé",
    heading: "Suivez l\u2019actualité DojOps",
    description:
      "Nouveaux skills, intégrations et sorties. Directement dans votre boîte mail. Pas de spam, désinscription à tout moment.",
    placeholder: "vous@entreprise.com",
    subscribe: "S\u2019abonner",
    subscribing: "Inscription...",
    successMessage: "Bienvenue à bord ! Vérifiez votre boîte mail.",
    alreadySubscribed: "Vous êtes déjà abonné !",
    reachUs: "Ou contactez-nous à",
  },
  footer: {
    product: "Produit",
    resources: "Ressources",
    community: "Communaut\u00e9",
    getStarted: "Commencer",
    features: "Fonctions",
    howItWorks: "Fonctionnement",
    skills: "Skills",
    documentation: "Documentation",
    hub: "DojOps Hub",
    npmPackage: "Package npm",
    github: "GitHub",
    contributing: "Contribuer",
    issues: "Probl\u00e8mes",
    brandDescription:
      "G\u00e9n\u00e9rez, validez et appliquez des configs d\u2019infrastructure avec l\u2019IA. Open source, licence MIT.",
    copyright: "DojOps \u00b7 Licence MIT",
    createdBy: "Cr\u00e9\u00e9 par",
  },
};
