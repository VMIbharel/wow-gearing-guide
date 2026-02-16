# CLAUDE.md

## Projet

WoW Gearing Guide — app web statique aidant les joueurs WoW a optimiser leur montee en ilvl. Single-page, client-side only.

## Stack

- Astro v5 (static output, NO SSR)
- React pour les islands interactives (via @astrojs/react)
- Tailwind CSS v4 (via @tailwindcss/vite, PAS @astrojs/tailwind)
- shadcn/ui pour les composants React
- TypeScript strict
- Donnees en JSON (src/data/gearing.json), pas de BDD

## Architecture

- Pages `.astro` = layout et contenu statique
- Composants interactifs = fichiers `.tsx` React dans src/components/
- Monter les islands React avec `client:load` dans les pages Astro
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
- Composants React : src/components/*.tsx
- Composants shadcn : src/components/ui/*.tsx
- Donnees : src/data/*.json
- Styles : src/styles/global.css
- Utilitaires : src/lib/utils.ts

## Tailwind v4

- Plugin Vite configure dans astro.config.mjs
- CSS utilise `@import "tailwindcss"` (pas les directives @tailwind)
- Variables de theme definies avec @theme inline dans global.css

## Skills disponibles (.agents/skills/)

- `astro` — reference CLI et structure projet Astro
- `vercel-react-best-practices` — regles de perf React pour les composants interactifs
- `web-design-guidelines` — audit UI (Web Interface Guidelines Vercel)
- `seo-audit` — audit SEO technique et on-page
