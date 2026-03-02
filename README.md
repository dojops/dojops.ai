# dojops.ai

Marketing website and landing page for [DojOps](https://github.com/dojops/dojops) — the AI DevOps Automation Engine.

**Live:** [https://dojops.ai](https://dojops.ai)

## Tech Stack

- **Next.js 15** (App Router, static export)
- **Tailwind CSS v4** (`@theme inline` for design tokens)
- **TypeScript**
- **Sora** (headings/body) + **JetBrains Mono** (code/terminal)
- Deployed on **Vercel**

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind theme, brand tokens, animations, keyframes
│   ├── layout.tsx           # Root layout (fonts, metadata, ambient background)
│   └── page.tsx             # Single page assembling all sections
├── components/
│   ├── Navbar.tsx            # Sticky nav with glass blur, mobile drawer
│   ├── Hero.tsx              # Logo, headline, CTA buttons, terminal demo
│   ├── TerminalDemo.tsx      # CSS-animated terminal showing dojops plan
│   ├── InstallSection.tsx    # Tabbed install (npm / curl / Docker) with terminal UI
│   ├── HighlightStats.tsx    # Stats bar (12 tools, 16 agents, 9 scanners, etc.)
│   ├── HowItWorks.tsx        # 3-step flow: Describe → Review → Apply
│   ├── Features.tsx          # 6 feature cards with glow hover
│   ├── ToolsGrid.tsx         # 12 DevOps tools + 6 LLM providers
│   ├── Security.tsx          # 8 security layers grid
│   ├── Footer.tsx            # Final CTA + links
│   ├── FloatingIconsBg.tsx   # Atmospheric floating DevOps tool icons background
│   ├── ScrollReveal.tsx      # Intersection Observer scroll-triggered animations
│   ├── SectionHeading.tsx    # Reusable section title + subtitle
│   ├── GlowCard.tsx          # Reusable card with neon glow hover
│   └── CopyButton.tsx        # Copy-to-clipboard button
└── lib/
    └── constants.ts          # All content data, links, features, tools, terminal lines
```

## Page Sections

1. **Hero** — Animated 3D logo, headline, CTA buttons, terminal demo
2. **Get Started** — Tabbed install commands (npm/curl/Docker) + "What's next" steps
3. **Stats Bar** — Key numbers (12 tools, 16 agents, 9 scanners, 6 providers, 8 security layers, 19 endpoints)
4. **How It Works** — Three steps: Describe → Review → Apply
5. **Features** — 6 capability cards (agents, planning, validation, sandboxing, scanning, custom tools)
6. **Tools & Models** — 12 DevOps tools grid + 6 LLM providers
7. **Security** — 8 layers of defense grid
8. **Footer** — Final CTA + links

## Design

- **Theme:** Dark cyberpunk with neon cyan (`#00e5ff`) accent on deep black (`#050508`)
- **Background:** Floating DevOps tool icons at 3-4% opacity with slow CSS drift animations
- **Animations:** Scroll-triggered reveals (Intersection Observer), staggered entrance delays, terminal typewriter effect, badge shimmer
- **Accessibility:** `prefers-reduced-motion` support, `:focus-visible` styles, WCAG-compliant text contrast
- **Noise texture overlay** for depth

## Development

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Static export to out/
npm run lint      # ESLint
```

## Deployment

The site is configured for static export (`output: 'export'` in `next.config.ts`). Deploy the `out/` directory to any static host.

For Vercel:

```bash
vercel
```

## Related Repos

| Repo                                                      | Description                                       |
| --------------------------------------------------------- | ------------------------------------------------- |
| [dojops/dojops](https://github.com/dojops/dojops)         | Main monorepo — CLI, API, all @dojops/\* packages |
| [dojops/dojops-doc](https://github.com/dojops/dojops-doc) | Documentation site                                |
| [dojops/dojops-hub](https://github.com/dojops/dojops-hub) | Tool/agent marketplace                            |

## License

MIT
