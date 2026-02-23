# CLAUDE.md

## Projet

WoW Gearing Guide — app web statique aidant les joueurs WoW a optimiser leur montee en ilvl. Single-page, client-side only.

## Stack

- Astro v5 (static output, NO SSR)
- React pour les islands interactives (via @astrojs/react)
- Tailwind CSS v4 (via @tailwindcss/vite, PAS @astrojs/tailwind)
- shadcn/ui pour les composants React
- TypeScript strict
- Donnees en JSON + TypeScript (src/data/), pas de BDD

## Architecture

- Pages `.astro` = layout et contenu statique
- Composants interactifs = fichiers `.tsx` React dans src/components/
- Monter les islands React avec `client:only="react"` dans les pages Astro
- Composants shadcn dans src/components/ui/ (geres par CLI, ne pas editer manuellement)
- Alias : `@/*` → `./src/*`

## Commandes

- `npm run dev` — serveur de dev
- `npm run build` — build production
- `npm run preview` — preview du build
- `npx astro check` — verification TypeScript
- `npx shadcn@latest add <composant>` — ajouter un composant shadcn

## Conventions

- TypeScript strict, named exports
- Composants petits et focuses
- KISS : solutions simples, pas de sur-ingenierie
- Pas de SSR, pas d'endpoints serveur, pas de BDD

## Fichiers

- Pages : src/pages/*.astro
- Layout Astro : src/layouts/Layout.astro
- Composants React :
  - src/components/layout/ — AppHeader, CharacterSelector, SectionNav, ThemeToggle, LanguageSelector, …
  - src/components/sections/ — DashboardSection, RaidSection, DungeonTable, DelvesSection, CraftSection, PvpTable, RoadmapSection, …
  - src/components/dashboard/ — ActivityCardItem, RoadmapCard, SpecRecommendationCard, TracksCard
  - src/components/shared/ — CrestBadge, IlvlText
  - src/components/ui/ — composants shadcn (geres par CLI, ne pas editer manuellement)
- i18n : src/i18n/ (traductions en.json / fr.json, provider React, types)
- Hooks : src/hooks/ — useCharacterProfile, useWeeklyChecklist, useWowheadInit
- Donnees : src/data/ (activities.json, tracks.json, season.json, classes.ts, roadmap.ts, specItems.ts)
- Styles : src/styles/global.css
- Utilitaires : src/lib/utils.ts, src/lib/dashboard-utils.ts

## Tailwind v4

- Plugin Vite configure dans astro.config.mjs
- CSS utilise `@import "tailwindcss"` (pas les directives @tailwind)
- Variables de theme definies avec @theme inline dans global.css

## Analytics

- @vercel/analytics et @vercel/speed-insights integres dans src/layouts/Layout.astro
- Aucune config supplementaire requise (auto-injectes au build)

## Skills disponibles (.agents/skills/)

- `astro` — reference CLI et structure projet Astro
- `vercel-react-best-practices` — regles de perf React pour les composants interactifs
- `web-design-guidelines` — audit UI (Web Interface Guidelines Vercel)
- `seo-audit` — audit SEO technique et on-page
