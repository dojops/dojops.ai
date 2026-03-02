# Contributing

Contributions to the DojOps website are welcome! This is the marketing landing page for [DojOps](https://github.com/dojops/dojops), built with Next.js and Tailwind CSS.

## Development Setup

```bash
git clone https://github.com/dojops/dojops.ai.git
cd dojops.ai
npm install
npm run dev   # Start dev server
```

## Available Commands

```bash
npm run dev           # Next.js dev server
npm run build         # Static export to /out/
npm run lint          # ESLint
npm run format        # Prettier write
npm run format:check  # Prettier check
```

## Project Structure

- `src/app/` — Next.js App Router (single-page static export)
- `src/components/` — React components (Navbar, Hero, Features, etc.)
- `src/lib/constants.ts` — All page content data (features, tools, stats, links)
- `src/app/globals.css` — Design system (CSS variables, animations)

## Design Guidelines

- Follow the cyberpunk dark theme with neon cyan accents
- Use existing CSS variables from `globals.css` for colors and effects
- Keep content data in `src/lib/constants.ts`, not hardcoded in components
- Respect `prefers-reduced-motion` for all animations

## Commit Convention

This repo uses [Conventional Commits](https://www.conventionalcommits.org/). Husky enforces this on every commit.

```
feat(ui): add terminal demo animation
fix: correct mobile nav breakpoint
style: update hero section spacing
```

## PR Checklist

- [ ] All linting passes (`npm run lint`)
- [ ] Formatting is correct (`npm run format:check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Site looks correct on mobile and desktop
- [ ] Animations respect `prefers-reduced-motion`
