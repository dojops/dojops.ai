import type { Translations } from "./translations";

export const zh: Translations = {
  nav: {
    howItWorks: "\u5de5\u4f5c\u539f\u7406",
    features: "\u529f\u80fd\u7279\u6027",
    skills: "\u6280\u80fd",
    docs: "\u6587\u6863",
    github: "GitHub",
    getStarted: "\u5f00\u59cb\u4f7f\u7528",
    toggleMenu: "\u5207\u6362\u83dc\u5355",
    lightMode: "\u5207\u6362\u5230\u6d45\u8272\u6a21\u5f0f",
    darkMode: "\u5207\u6362\u5230\u6df1\u8272\u6a21\u5f0f",
  },
  hero: {
    badge: "AI DevOps \u5f15\u64ce",
    headlinePart1: "\u4ece\u63d0\u793a\u8bcd\u5230",
    headlinePart2: "\u751f\u4ea7\u73af\u5883",
    subtitle:
      "\u751f\u6210\u914d\u7f6e\u3001\u9a8c\u8bc1\u914d\u7f6e\u3001\u626b\u63cf\u95ee\u9898\u3001\u5ba1\u6279\u540e\u5e94\u7528\u3002\u5168\u90e8\u5728\u6c99\u7bb1\u4e2d\u6267\u884c\u3002",
    getStarted: "\u5f00\u59cb\u4f7f\u7528",
    viewOnGithub: "\u5728 GitHub \u4e0a\u67e5\u770b",
    downloaded: "\u6b21\u4e0b\u8f7d",
  },
  stats: [
    { value: "53", label: "DevOps \u6280\u80fd" },
    { value: "17", label: "\u4e13\u4e1a\u667a\u80fd\u4f53" },
    { value: "10", label: "\u5b89\u5168\u626b\u63cf\u5668" },
    { value: "7", label: "LLM \u63d0\u4f9b\u5546" },
    { value: "8", label: "\u5b89\u5168\u5c42" },
    { value: "21", label: "API \u7aef\u70b9" },
  ],
  features: {
    title: "\u4e3a\u771f\u5b9e\u57fa\u7840\u8bbe\u65bd\u800c\u6784\u5efa",
    subtitle:
      "\u6bcf\u4e00\u6b65\u90fd\u7ecf\u8fc7\u9a8c\u8bc1\u3001\u6c99\u7bb1\u9694\u79bb\u548c\u65e5\u5fd7\u8bb0\u5f55\uff0c\u7136\u540e\u624d\u89e6\u53ca\u60a8\u7684\u4ed3\u5e93",
    items: [
      {
        title: "17 \u4e2a\u4e13\u4e1a\u667a\u80fd\u4f53",
        description:
          "\u63cf\u8ff0\u60a8\u7684\u76ee\u6807\uff0cDojOps \u9009\u62e9\u5408\u9002\u7684\u667a\u80fd\u4f53\u3002Terraform\u3001Kubernetes\u3001CI/CD\u3001\u5b89\u5168\u7b49\u3002\u60a8\u8fd8\u53ef\u4ee5\u7528\u4e00\u4e2a README \u521b\u5efa\u81ea\u5df1\u7684\u667a\u80fd\u4f53\u3002",
      },
      {
        title: "\u53d1\u5e03\u524d\u5148\u89c4\u5212",
        description:
          "\u590d\u6742\u76ee\u6807\u88ab\u5206\u89e3\u4e3a\u5e26\u98ce\u9669\u7ea7\u522b\u7684\u4efb\u52a1\u56fe\u3002\u5728\u4fee\u6539\u4efb\u4f55\u6587\u4ef6\u524d\u5ba1\u67e5\u5b8c\u6574\u8ba1\u5212\u3002\u5931\u8d25\u65f6\u53ef\u4ece\u4e2d\u65ad\u5904\u7ee7\u7eed\u3002",
      },
      {
        title: "\u96f6 YAML \u5e7b\u89c9",
        description:
          "LLM \u54cd\u5e94\u901a\u8fc7\u63d0\u4f9b\u5546\u539f\u751f JSON \u6a21\u5f0f\u9501\u5b9a\u5230 Zod \u6a21\u5f0f\u3002\u7136\u540e\u901a\u8fc7 terraform validate\u3001hadolint \u548c kubectl --dry-run \u518d\u6b21\u9a8c\u8bc1\u3002",
      },
      {
        title: "\u6bcf\u6b21\u5199\u5165\u90fd\u5728\u6c99\u7bb1\u4e2d",
        description:
          "\u6587\u4ef6\u5199\u5165\u662f\u539f\u5b50\u7684\uff0c\u4e14\u4ec5\u9650\u4e8e\u57fa\u7840\u8bbe\u65bd\u8def\u5f84\u3002\u4e00\u6761\u547d\u4ee4\u56de\u6eda\u6240\u6709\u64cd\u4f5c\u3002\u6bcf\u4e2a\u64cd\u4f5c\u90fd\u8bb0\u5f55\u5728\u9632\u7be1\u6539\u5ba1\u8ba1\u65e5\u5fd7\u4e2d\u3002",
      },
      {
        title: "10 \u4e2a\u626b\u63cf\u5668\u3002\u81ea\u52a8\u5316\u3002",
        description:
          "Trivy\u3001Gitleaks\u3001Checkov\u3001Semgrep\u3001Hadolint\u3001ShellCheck\u3001npm/pip audit\u3001SBOM \u751f\u6210\u548c\u8bb8\u53ef\u8bc1\u626b\u63cf\u3002\u5168\u90e8\u5728\u914d\u7f6e\u4e0a\u7ebf\u524d\u8fd0\u884c\u3002\u4e25\u91cd\u95ee\u9898\u81ea\u52a8\u4fee\u590d\u3002",
      },
      {
        title: "\u6784\u5efa\u4e0e\u5206\u4eab\u6280\u80fd",
        description:
          "53 \u4e2a\u5185\u7f6e\u6280\u80fd\u8986\u76d6 CI/CD\u3001\u5bb9\u5668\u3001\u4e91\u3001\u76d1\u63a7\u548c\u5b89\u5168\u3002\u9700\u8981\u7279\u5b9a\u529f\u80fd\uff1f\u7f16\u5199 DOPS \u6e05\u5355\uff0c\u53d1\u5e03\u5230 Hub\uff0c\u6216\u83b7\u53d6\u793e\u533a\u6280\u80fd\u3002\u5168\u90e8\u901a\u8fc7 SHA-256 \u6821\u9a8c\u3002",
      },
    ],
  },
  pipeline: {
    title: "\u4e03\u4e2a\u6b65\u9aa4\u3002\u96f6 YAML\u3002",
    subtitle:
      "\u4ece\u81ea\u7136\u8bed\u8a00\u5230\u751f\u4ea7\u5c31\u7eea\u7684\u914d\u7f6e\uff0c\u53ea\u9700\u51e0\u79d2",
    steps: [
      {
        label: "\u63d0\u793a",
        description: "\u7528\u81ea\u7136\u8bed\u8a00\u63cf\u8ff0\u60a8\u7684\u76ee\u6807",
      },
      {
        label: "\u8def\u7531",
        description:
          "\u667a\u80fd\u4f53\u8def\u7531\u5668\u9009\u62e9\u5408\u9002\u7684\u4e13\u5bb6",
      },
      { label: "\u89c4\u5212", description: "LLM \u5206\u89e3\u4e3a\u4efb\u52a1\u56fe" },
      {
        label: "\u751f\u6210",
        description: "\u4f7f\u7528 Zod \u6a21\u5f0f\u7684\u7ed3\u6784\u5316\u8f93\u51fa",
      },
      {
        label: "\u626b\u63cf",
        description: "10 \u4e2a\u5b89\u5168\u626b\u63cf\u5668\u9a8c\u8bc1\u8f93\u51fa",
      },
      { label: "\u5e94\u7528", description: "\u6c99\u7bb1\u5199\u5165\u4e0e\u5ba1\u6279\u95e8" },
      {
        label: "\u5ba1\u8ba1",
        description: "\u54c8\u5e0c\u94fe\u9632\u7be1\u6539\u65e5\u5fd7\u6761\u76ee",
      },
    ],
    initializing: "\u521d\u59cb\u5316\u4e2d...",
    initializingFull: "\u521d\u59cb\u5316\u6d41\u6c34\u7ebf...",
    complete: "\u5b8c\u6210",
    completeFull: "全部 11 个阶段已完成",
  },
  pipelineFlow: {
    title: "从提示到生产",
    subtitle: "从您的请求到部署配置之间的十一个阶段，以下是具体流程。",
    active: "运行中",
    stages: [
      { label: "目标", description: "用自然语言描述您的基础设施目标" },
      { label: "规划器", description: "LLM 将目标分解为任务并进行风险分类" },
      { label: "图谱", description: "依赖感知的拓扑执行图" },
      { label: "执行器", description: "SafeExecutor 应用策略引擎和超时检查" },
      { label: "生成", description: "LLM 使用 Zod 结构化输出生成配置" },
      { label: "验证", description: "外部工具验证（terraform, hadolint, ansible）" },
      { label: "评审", description: "CriticAgent 审查最佳实践" },
      { label: "修复", description: "自动修复失败并通过修复循环重新生成" },
      { label: "执行", description: "沙盒原子写入与审批门控" },
      { label: "审计", description: "哈希链式 JSONL 与篡改检测" },
      { label: "记忆", description: "持久化执行结果以供未来上下文使用" },
    ],
  },
  terminal: {
    prompt: "$ dojops arise --yes",
    routing: "  \u626b\u63cf\u4ed3\u5e93...",
    routed: "  \u2713 \u68c0\u6d4b\u5230 Node.js\u3001npm\u3001\u65e0 CI",
    decomposing: "  \u6d41\u6c34\u7ebf\uff1abuild \u2192 test \u2192 containerize \u2192 deploy",
    tasksPlanned: "  \u5e76\u884c\u751f\u6210\u6587\u4ef6...",
    task1: "  \u2713 .github/workflows/ci.yml",
    task2: "  \u2713 Dockerfile",
    task3: "  \u2713 docker-compose.yml",
    ready:
      "  \u6d41\u6c34\u7ebf\u5df2\u751f\u6210\uff1a3/3 \u4efb\u52a1\u5728 24s \u5185\u5b8c\u6210",
  },
  tools: {
    title: "\u5185\u7f6e\u6280\u80fd\uff0c\u5373\u63d2\u5373\u7528\u3002",
    subtitle:
      "53 \u4e2a\u5185\u7f6e DevOps \u6280\u80fd\uff0c7 \u4e2a LLM \u63d0\u4f9b\u5546\u3002\u5f00\u7bb1\u5373\u7528\u3002",
    devopsModules: "DevOps \u6280\u80fd",
    llmProviders: "LLM \u63d0\u4f9b\u5546",
    noVendorLockIn:
      "\u81ea\u5e26\u6a21\u578b\u3002\u65e0\u4f9b\u5e94\u5546\u9501\u5b9a\u3002\u4f7f\u7528 Ollama \u5b8c\u5168\u672c\u5730\u8fd0\u884c\u3002",
  },
  security: {
    title: "8 \u5c42\u9632\u5fa1",
    subtitle:
      "\u8db3\u591f\u591a\u7684\u5b89\u5168\u5c42\uff0c\u8ba9\u60a8\u7684\u5408\u89c4\u56e2\u961f\u5bf9 AI \u751f\u6210\u7684\u914d\u7f6e\u5b8c\u5168\u653e\u5fc3",
    items: [
      {
        title: "\u7ed3\u6784\u5316\u8f93\u51fa\u5f3a\u5236",
        description:
          "\u63d0\u4f9b\u5546\u539f\u751f JSON \u6a21\u5f0f\uff0c\u786e\u4fdd LLM \u8f93\u51fa\u59cb\u7ec8\u6709\u6548\u4e14\u53ef\u89e3\u6790\u3002\u65e0\u9700\u731c\u6d4b\uff0c\u65e0\u9700\u4fee\u590d\u3002",
      },
      {
        title: "\u6a21\u5f0f\u9a8c\u8bc1",
        description:
          "\u6bcf\u4e2a\u54cd\u5e94\u90fd\u7ecf\u8fc7 Zod safeParse()\u3002Markdown \u6e05\u7406\u3001JSON \u89e3\u6790\u3001\u7c7b\u578b\u68c0\u67e5\u3002\u672a\u901a\u8fc7\u9a8c\u8bc1\u7684\u4e00\u5f8b\u4e0d\u7528\u3002",
      },
      {
        title: "\u6df1\u5ea6\u9a8c\u8bc1",
        description:
          "\u5916\u90e8\u5de5\u5177\u9a8c\u8bc1\uff1aterraform validate\u3001hadolint\u3001kubectl --dry-run\uff0c\u52a0\u4e0a GitHub Actions \u548c GitLab CI \u7684\u5185\u7f6e\u7ed3\u6784 lint\u3002",
      },
      {
        title: "\u7b56\u7565\u5f15\u64ce",
        description:
          "ExecutionPolicy \u63a7\u5236\u5141\u8bb8\u548c\u62d2\u7edd\u7684\u8def\u5f84\u3001\u73af\u5883\u53d8\u91cf\u3001\u8d85\u65f6\u548c\u6587\u4ef6\u5927\u5c0f\u9650\u5236\u3002\u5199\u5165\u4ec5\u9650\u4e8e\u57fa\u7840\u8bbe\u65bd\u8def\u5f84\u3002",
      },
      {
        title: "\u5ba1\u6279\u5de5\u4f5c\u6d41",
        description:
          "\u6bcf\u6b21\u5199\u5165\u524d\u90fd\u53ef\u67e5\u770b\u5dee\u5f02\u9884\u89c8\u3002\u81ea\u52a8\u6279\u51c6\u3001\u81ea\u52a8\u62d2\u7edd\uff0c\u6216\u4e3a CI/CD \u914d\u7f6e\u81ea\u5b9a\u4e49\u56de\u8c03\u3002\u9ad8\u98ce\u9669\u8ba1\u5212\u9700\u8981\u660e\u786e\u786e\u8ba4\u3002",
      },
      {
        title: "\u6c99\u7bb1\u6267\u884c",
        description:
          "\u8def\u5f84\u9650\u5236\u3001\u5927\u5c0f\u9650\u5236\u3001\u901a\u8fc7 temp + rename \u539f\u5b50\u5199\u5165\u3001.bak \u5907\u4efd\u3001\u9010\u6587\u4ef6\u5ba1\u8ba1\u65e5\u5fd7\u3002PID \u9501\u9632\u6b62\u5e76\u53d1\u7a81\u53d8\u3002",
      },
      {
        title: "\u4e0d\u53ef\u53d8\u5ba1\u8ba1\u8f68\u8ff9",
        description:
          "\u54c8\u5e0c\u94fe JSONL\uff0cSHA-256 \u5b8c\u6574\u6027\u9a8c\u8bc1\u3002SIEM \u517c\u5bb9\u683c\u5f0f\u3002\u4e00\u6761\u547d\u4ee4\u68c0\u6d4b\u7be1\u6539\u3002",
      },
      {
        title: "\u96f6\u9065\u6d4b",
        description:
          "\u9664\u4e86\u53d1\u5f80\u60a8\u9009\u62e9\u7684 LLM \u63d0\u4f9b\u5546\u7684\u8bf7\u6c42\u5916\uff0c\u4ec0\u4e48\u90fd\u4e0d\u4f1a\u79bb\u5f00\u60a8\u7684\u673a\u5668\u3002\u65e0\u5206\u6790\uff0c\u65e0\u8ddf\u8e2a\u3002\u4f7f\u7528 Ollama \u5b8c\u5168\u672c\u5730\u8fd0\u884c\u3002",
      },
    ],
  },
  install: {
    getStarted: "\u5f00\u59cb\u4f7f\u7528",
    tabComments: {
      npm: "# \u901a\u8fc7 npm \u5168\u5c40\u5b89\u88c5",
      brew: "# macOS / Linux \u901a\u8fc7 Homebrew",
      curl: "# \u4e00\u884c\u547d\u4ee4\u3002\u5904\u5904\u53ef\u7528\u3002",
      docker: "# \u6302\u8f7d\u9879\u76ee + \u914d\u7f6e\uff0c\u4e0d\u4f1a\u4e22\u5931\u6570\u636e",
    },
    whatsNext: "\u4e0b\u4e00\u6b65",
    nextSteps: [
      {
        step: "01",
        label: "\u914d\u7f6e\u60a8\u7684 LLM \u63d0\u4f9b\u5546",
        cmd: "dojops config",
      },
      {
        step: "02",
        label: "\u5728\u60a8\u7684\u9879\u76ee\u4e2d\u521d\u59cb\u5316",
        cmd: "dojops init",
      },
      {
        step: "03",
        label: "\u63cf\u8ff0\u60a8\u7684\u9700\u6c42",
        cmd: 'dojops "\u4e3a S3 \u521b\u5efa Terraform \u914d\u7f6e"',
      },
    ],
    copyToClipboard: "\u590d\u5236\u5230\u526a\u8d34\u677f",
  },
  cta: {
    badge: "\u5f00\u6e90",
    heading1: "\u51c6\u5907\u505c\u6b62\u624b\u5199",
    heading2: "YAML \u4e86\u5417\uff1f",
    description:
      "\u4e00\u6b21\u5b89\u88c5\uff0c\u96f6\u9065\u6d4b\uff0c\u6709 Node \u7684\u5730\u65b9\u5c31\u80fd\u8fd0\u884c\u3002",
    getStarted: "\u5f00\u59cb\u4f7f\u7528",
    readDocs: "阅读文档",
  },
  newsletter: {
    badge: "保持关注",
    heading: "获取 DojOps 最新动态",
    description: "新技能、提供商集成和版本发布，直达您的收件箱。无垃圾邮件，随时退订。",
    placeholder: "you@company.com",
    subscribe: "订阅",
    subscribing: "订阅中...",
    successMessage: "请查收邮件以验证您的订阅。",
    reachUs: "或通过邮件联系我们",
  },
  footer: {
    product: "产品",
    resources: "\u8d44\u6e90",
    community: "\u793e\u533a",
    getStarted: "\u5f00\u59cb\u4f7f\u7528",
    features: "\u529f\u80fd\u7279\u6027",
    howItWorks: "\u5de5\u4f5c\u539f\u7406",
    skills: "\u6280\u80fd",
    documentation: "\u6587\u6863",
    hub: "DojOps Hub",
    npmPackage: "npm \u5305",
    pixcot: "Pixcot \u50cf\u7d20\u827a\u672f\u7f16\u8f91\u5668",
    github: "GitHub",
    contributing: "\u8d21\u732e\u6307\u5357",
    issues: "\u95ee\u9898\u53cd\u9988",
    brandDescription:
      "\u4f7f\u7528 AI \u751f\u6210\u3001\u9a8c\u8bc1\u548c\u5e94\u7528\u57fa\u7840\u8bbe\u65bd\u914d\u7f6e\u3002\u5f00\u6e90\uff0cMIT \u8bb8\u53ef\u8bc1\u3002",
    copyright: "DojOps \u00b7 MIT \u8bb8\u53ef\u8bc1",
    createdBy: "\u521b\u5efa\u8005",
  },
};
